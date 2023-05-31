import axios from "axios"


const UPLOAD_ENDPOINT = "http://192.168.31.172:7090/soap/toREST"

export function processFile(file: File){
    const formData = new FormData();
    formData.append("file", file);
    axios.post(UPLOAD_ENDPOINT, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    }).then(data => {
      console.log(data.data);
    });
}