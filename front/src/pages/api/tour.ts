import type { NextApiRequest, NextApiResponse } from 'next';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// export async function getRegionTour(type) {
//   const { region, kind } = type;
//   const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/${kind}?${process.env.SERVICKEY_E}&pageNo=1&numOfRows=1000&keyword=${region}`;
//   const response = await axios.get(url);
//   console.log(response.data);
//   //   response.toJOSN();
//   // JSON.parse(response)

//   return response.data;
// }

export async function getSearchTour(search: string) {
  const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?${process.env.SERVICKEY_E}&pageNo=1&numOfRows=10&keyword=${search}`;
  const response = await axios.get(url);
  console.log('response.data', response.data);
  //   return response.data.toJSON();
}
