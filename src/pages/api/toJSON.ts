import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next";


const ENDPOINT = `${process.env.BACK_SERVER}/toJSON`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await axios.post(ENDPOINT, req.body, { headers: req.headers })
    .then(data => {
      console.log(data.data)
      return res
        .status(200)
        .setHeader("Content-Type", data.headers['content-type'])
        .setHeader("Content-Length", data.headers['content-length'])
        .setHeader("Content-Disposition", data.headers['content-disposition'])
        .json(JSON.stringify(data.data, null, 2))
    })
    .catch(function (error) {
      console.log(error)
      if (error.response) {
        res.status(error.response.status).json(error.response.data)
      } else if (error.request) {
        res.status(error.request.status).end()
      } else {
        res.status(520).end()
      }
    });
}