import axios from "axios";
import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/search", async (req, res, next) => {
  console.log("-------------- search-------------");
  console.log("req.body", req.body);
  console.log("req.query", req.query);
  console.log("req.params", req.params);
  const pageNo = req.query.pageNo;
  const keyword = encodeURIComponent(req.query.search as string);
  const arrange = `&arrange=${encodeURIComponent(req.query.arrange as string)}`;
  const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?ServiceKey=${process.env.SERVICEKEY_E}&numOfRows=12&pageNo=${pageNo}${arrange}&MobileOS=ETC&MobileApp=Test
  &keyword=${keyword}`;
  try {
    const response = await axios.get(url);

    const data = response.data.response.body;
    data.search = decodeURIComponent(keyword);
    return res.json(data);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/:contenttypeid/:contentid", async (req, res, next) => {
  console.log("-------------- detail-------------");
  console.log("req.body", req.body);
  console.log("req.query", req.query);
  console.log("req.params", req.params);
  const contentId = encodeURIComponent(req.params.contentid as string);
  const contentTypeId = encodeURIComponent(req.params.contenttypeid as string);
  const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=${process.env.SERVICEKEY_E}&contentId=${contentId}&contentTypeId=${contentTypeId}&MobileOS=ETC&MobileApp=Test&defaultYN=Y&firstImageYN=Y&overviewYN=Y&addrinfoYN=Y&mapinfoYN=Y`;
  const intro = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro?ServiceKey=${process.env.SERVICEKEY_E}&contentId=${contentId}&contentTypeId=${contentTypeId}&MobileOS=ETC&MobileApp=Test&defaultYN=Y&firstImageYN=Y&overviewYN=Y&addrinfoYN=Y&mapinfoYN=Y`;
  const info = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailInfo?ServiceKey=${process.env.SERVICEKEY_E}&contentId=${contentId}&contentTypeId=${contentTypeId}&MobileOS=ETC&MobileApp=Test`;
  try {
    const response = await axios.get(url);
    const responseIntro = await axios.get(intro);
    const responseInfo = await axios.get(info);
    // console.log("detail repsonse.data", response.data.response.body);
    const data = response.data.response.body;
    data.items.item.intro = responseIntro.data.response.body.items.item;
    data.items.item.info = responseInfo.data.response.body.items.item;
    // console.log("detail repsonse data", data.items.item);
    return res.json(data);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

// router.get("/:contentid/solo", async (req, res, next) => {
//   console.log("-------------- detail-------------");
//   console.log("req.body", req.body);
//   console.log("req.query", req.query);
//   console.log("req.params", req.params);
//   const contentId = encodeURIComponent(req.params.contentid as string);
//   // const contentTypeId = encodeURIComponent(req.params.contenttypeid as string);
//   const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=${process.env.SERVICEKEY_E}&contentId=${contentId}&MobileOS=ETC&MobileApp=Test&defaultYN=Y&firstImageYN=Y&overviewYN=Y&addrinfoYN=Y&mapinfoYN=Y`;
//   // const intro = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro?ServiceKey=${process.env.SERVICEKEY_E}&contentId=${contentId}&MobileOS=ETC&MobileApp=Test&defaultYN=Y&firstImageYN=Y&overviewYN=Y&addrinfoYN=Y&mapinfoYN=Y`;
//   // const info = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailInfo?ServiceKey=${process.env.SERVICEKEY_E}&contentId=${contentId}&MobileOS=ETC&MobileApp=Test`;
//   try {
//     const response = await axios.get(url);
//     // const responseIntro = await axios.get(intro);
//     // const responseInfo = await axios.get(info);
//     // console.log("detail repsonse.data", response.data.response.body);
//     const data = response.data.response.body;
//     // data.items.item.intro = responseIntro.data.response.body.items.item;
//     // data.items.item.info = responseInfo.data.response.body.items.item;
//     console.log("detail repsonse data", data.items.item);
//     return res.json(data);
//   } catch (e) {
//     console.error(e);
//     return next(e);
//   }
// });

router.get("/region", async (req, res, next) => {
  console.log("--------------region-------------");
  console.log("req.body", req.body);
  console.log("req.query", req.query);
  console.log("req.params", req.params);

  const arrange = req.query.arrange
    ? `&arrange=${encodeURIComponent(req.query.arrange as string)}`
    : "&arrange=P";
  const areaCode = req.query.areaCode ? `&areaCode=${req.query.areaCode}` : "";
  console.log("areaCode: ", areaCode);
  const contentTypeId = req.query.contentTypeId
    ? `&contentTypeId=${req.query.contentTypeId}`
    : "";
  const pageNo = req.query.pageNo;
  const numOfRows = req.query.numOfRows
    ? `&numOfRows=${req.query.numOfRows}`
    : "&numOfRows=12";
  const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${process.env.SERVICEKEY_E}${arrange}${areaCode}${contentTypeId}&MobileOS=ETC&MobileApp=Test${numOfRows}&pageNo=${pageNo}`;
  try {
    const response = await axios.get(url);
    const data = response.data.response.body;
    // console.log("all data:", data);
    return res.json(data);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/all", async (req, res, next) => {
  const area = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${process.env.SERVICEKEY_E}&MobileOS=ETC&MobileApp=Test&numOfRows=6&arrange=P&contentTypeId=12`;
  const event = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival?ServiceKey=${process.env.SERVICEKEY_E}&MobileOS=ETC&MobileApp=Test&numOfRows=6&arrange=P`;
  const sleep = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchStay?ServiceKey=${process.env.SERVICEKEY_E}&MobileOS=ETC&MobileApp=Test&numOfRows=6&arrange=P`;
  try {
    const regionData = await axios.get(area);
    const eventData = await axios.get(event);
    const sleepData = await axios.get(sleep);

    const data = regionData.data.response.body;
    data.items.festival = eventData.data.response.body.items.item;
    data.items.sleep = sleepData.data.response.body.items.item;

    // console.log("all data: ", data);
    return res.json(data);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

export default router;
