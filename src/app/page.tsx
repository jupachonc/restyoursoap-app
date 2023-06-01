'use client';
import Image from 'next/image'
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState<File | string>('fileurl');


  // Handle when file is uploaded using form
  function handleFormChanged(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(file)
    const formData = new FormData();
    formData.append("file", file);
    axios.post("/api/restyoursoap", formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    }).then(data => {
      console.log(data.data);
    });    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div>
        <form action="form" onSubmit={handleSubmit}>
          <input type="file"
            id='upload'
            onChange={handleFormChanged}
            accept='.xml,.wsdl'
          />
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
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
          </div>

        </form>
      </div>
    </main>
  )
}
