import axios from "axios";
import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/search", async (req, res, next) => {
  console.log("req.body", req.body);
  console.log("req.query", req.query);
  console.log("req.params", req.params);

  // const pageNo = encodeURIComponent(req.query.pageNo as number);
  const pageNo = req.query.pageNo;
  const keyword = encodeURIComponent(req.query.search as string);
  const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?ServiceKey=hTqJVMiksPsgZ0%2FF%2BGMlPWb2OVlhPCbNUjFi1C2pedd%2BfKydsA09UAasCFHowpjzsEuO2ue8%2FycGsCq3l4FpIQ%3D%3D&numOfRows=10&pageNo=${pageNo}&arrange=O&MobileOS=ETC&MobileApp=Test
  &keyword=${keyword}`;
  try {
    const response = await axios.get(url);
    // console.log("search detail(xml): ", response.data.response.body);

    const data = response.data.response.body;
    data.search = decodeURIComponent(keyword);
    console.log("search detail(xml): ", data);
    return res.json(data);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

export default router;
