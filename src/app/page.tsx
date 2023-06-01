'use client';
import Image from 'next/image'
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState<File | string>('fileurl');


  // Handle when file is uploaded using form
  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("/api/toyaml", formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    }).then(data => {
      new File([data.data], "sa.yml");
    });
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-3 md:w-1/2 w-[360px] rounded-md">
        <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">HI</span>
        <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer   border-gray-400 border-dotted">
          <input type="file" onChange={handleFile} className="h-full w-full opacity-0 z-10 absolute" />
          <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
            <div className="flex flex-col">
              <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
              <span className="text-[12px]">{`Drag and Drop a file`}</span>
            </div>
          </div>
        </div>

      </div>
      <div className="mb-32 grid text-center lg:grid-cols-3 lg:text-left">
        <button
          type="submit"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Descargar YAML{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              &darr;
            </span>
          </h2>
        </button>
        <button
          type="submit"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Descargar Redocly{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              &darr;
            </span>
          </h2>
        </button>
        <button
          type="submit"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Descargar Proyecto Base{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              &darr;
            </span>
          </h2>
        </button>
      </div>

    </main>
  )
}
