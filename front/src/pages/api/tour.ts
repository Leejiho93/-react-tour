import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// type Data = {};
// export async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${process.env.NEXT_PUBLIC_SERVICEKEY_E}&MobileOS=ETC&MobileApp=Test&numOfRows=1000000`;
//   try {
//     const response = await axios.get(url);
//     console.log('response.data', response.data.response.body);
//     res.json(response.data);
//   } catch (e) {
//     console.error(e);
//   }
// }
