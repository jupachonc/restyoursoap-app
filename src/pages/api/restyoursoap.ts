import axios, { AxiosHeaderValue } from "axios"
import { NextApiRequest, NextApiResponse } from "next";


const UPLOAD_ENDPOINT = "http://192.168.31.172:7090/soap/toREST"

export default async function handler(req: NextApiRequest, res:NextApiResponse) {

  await axios.post(UPLOAD_ENDPOINT, req.body, {headers: req.headers})
  .then(data => {
    return res
      .status(200)
      .setHeader("Content-Type", data.headers['content-type'])
      .setHeader("Content-Length", data.headers['content-length'])
      .setHeader("Content-Disposition", data.headers['content-disposition'])
      .end(data.data)
    })
  .catch(function (error) {
    //console.log(error)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status).json( error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log("error.request");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  });
}