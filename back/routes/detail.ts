import axios from "axios";
import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/search", async (req, res, next) => {
  const pageNo = req.query.pageNo;
  const keyword = encodeURIComponent(req.query.search as string);
  const arrange = `&arrange=${encodeURIComponent(req.query.arrange as string)}`;
  const url = `https://apis.data.go.kr/B551011/KorService/searchKeyword?ServiceKey=${process.env.SERVICEKEY_E}&numOfRows=12&pageNo=${pageNo}${arrange}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&keyword=${keyword}`;
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
  const contentId = encodeURIComponent(req.params.contentid as string);
  const contentTypeId = encodeURIComponent(req.params.contenttypeid as string);
  const url = `https://apis.data.go.kr/B551011/KorService/detailCommon?ServiceKey=${process.env.SERVICEKEY_E}&contentId=${contentId}&contentTypeId=${contentTypeId}&MobileOS=ETC&MobileApp=AppTest&_type=json&defaultYN=Y&firstImageYN=Y&overviewYN=Y&addrinfoYN=Y&mapinfoYN=Y`;
  const intro = `https://apis.data.go.kr/B551011/KorService/detailIntro?ServiceKey=${process.env.SERVICEKEY_E}&contentId=${contentId}&contentTypeId=${contentTypeId}&MobileOS=ETC&MobileApp=AppTest&_type=json`;
  const info = `https://apis.data.go.kr/B551011/KorService/detailInfo?ServiceKey=${process.env.SERVICEKEY_E}&contentId=${contentId}&contentTypeId=${contentTypeId}&MobileOS=ETC&MobileApp=AppTest&_type=json`;
  try {
    const response = await axios.get(url);
    const responseIntro = await axios.get(intro);
    const responseInfo = await axios.get(info);
    const data = response.data.response.body;
    data.items.item.intro = responseIntro.data.response.body.items.item;
    data.items.item.info = responseInfo.data.response.body.items.item;
    return res.json(data);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/region", async (req, res, next) => {
  const arrange = req.query.arrange
    ? `&arrange=${encodeURIComponent(req.query.arrange as string)}`
    : "&arrange=P";
  const areaCode = req.query.areaCode ? `&areaCode=${req.query.areaCode}` : "";
  const contentTypeId = req.query.contentTypeId
    ? `&contentTypeId=${req.query.contentTypeId}`
    : "";
  const pageNo = req.query.pageNo;
  const numOfRows = req.query.numOfRows
    ? `&numOfRows=${req.query.numOfRows}`
    : "&numOfRows=12";
  const url = `https://apis.data.go.kr/B551011/KorService/areaBasedList?ServiceKey=${process.env.SERVICEKEY_E}${arrange}${areaCode}${contentTypeId}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y${numOfRows}&pageNo=${pageNo}`;
  try {
    const response = await axios.get(url);
    const data = response.data.response.body;
    return res.json(data);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/all", async (req, res, next) => {
  const area = `https://apis.data.go.kr/B551011/KorService/areaBasedList?serviceKey=${process.env.SERVICEKEY_E}&numOfRows=6&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=P&contentTypeId=12`;
  const event = `https://apis.data.go.kr/B551011/KorService/searchFestival?serviceKey=${process.env.SERVICEKEY_E}&numOfRows=6&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=P&eventStartDate=20220101`;
  const sleep = `https://apis.data.go.kr/B551011/KorService/searchStay?serviceKey=${process.env.SERVICEKEY_E}&numOfRows=6&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=P`;
  try {
    const regionData = await axios.get(area);
    const eventData = await axios.get(event);
    const sleepData = await axios.get(sleep);

    const data = regionData.data.response.body;
    data.items.festival = eventData.data.response.body.items.item;
    data.items.sleep = sleepData.data.response.body.items.item;

    return res.json(data);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

export default router;
