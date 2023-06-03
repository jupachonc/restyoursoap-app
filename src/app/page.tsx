'use client';
import Image from 'next/image'
import { useState, useReducer } from 'react';
import axios from "axios";
import styles from "../styles/DropZone.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fileDownload from 'js-file-download';
import { useRouter } from 'next/navigation';
import yaml from 'js-yaml'


export default function Home() {
  const [file, setFile] = useState<File | string>('fileurl');

  const router = useRouter();

  function validateAndSetFile(file: File) {
    try {
      let typeFile = file.name.split(".").pop()?.toLowerCase();
      if (typeFile === "wsdl" || typeFile === "xml") {
        setFile(file);
      } else {
        toast.error("Tipo de archivo no admitido", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }


    } catch (error) {
      toast.error("Hubo un error subiendo el archivo, inténtalo de nuevo", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

    }


  }
  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    validateAndSetFile(e.dataTransfer.files[0]);
  };

  // handle file selection via input element
  const handleFileSelect = (e: any) => {
    validateAndSetFile(e.target.files[0]);
  };

  // reducer function to handle state changes
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing fileList to empty array
  const [_, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  /*
  
      FUNCTIONS TO HANDLE BUTTONS
  
  */

  /* API Calls */
  async function getYAML() {
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("/api/toyaml", formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    }).then(response => {
      let headerLine = response.headers['content-disposition'];
      let startFileNameIndex = headerLine.indexOf('"') + 1
      let endFileNameIndex = headerLine.lastIndexOf('"');
      let filename = headerLine.substring(startFileNameIndex, endFileNameIndex);
      fileDownload(response.data, filename)
    });
  }

  async function getYAMLData() {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post("/api/toyaml", formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    })
  }


  /* Handlers */

  async function handleYAML() {
    if (!validateFile()) return
    await toast.promise(
      getYAML(),
      {
        pending: 'Se está procesando el archivo',
        success: 'Archivo procesado 👌',
        error: 'Hubo un error procesando el archivo 🤯',
      },
      {
        theme: "colored",
      }
    )

  }

  async function handleRedoc() {
    if (!validateFile()) return
    const response = await toast.promise(
      getYAMLData(),
      {
        pending: 'Se está procesando el archivo',
        success: 'Archivo procesado 👌',
        error: 'Hubo un error procesando el archivo 🤯',
      },
      {
        theme: "colored",
      }
    )

    let openapi = yaml.load(response.data)
    sessionStorage.setItem("redoc", JSON.stringify(openapi))
    router.push("/redoc")
  }


  function validateFile() {
    if (file === "fileurl") {
      toast.warn('No se ha seleccionado ningún archivo', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    } else {
      return true;
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <div className="mb-8 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert px-6"
          src="/RUS.svg"
          alt="REST your SOAP Logo"
          width={500}
          height={20}
          priority
        />
      </div>
      <div
        className={styles.dropzone}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert p-1"

          src="/upload.svg" alt="upload" height={500} width={50} />

        <input
          id="fileSelect"
          type="file"
          className={styles.files}
          accept=".wsdl, .xml"
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor="fileSelect">Selecciona un WSDL</label>

        <h3 className="p-4">
          o arrastra y suelta el WSDL aquí
        </h3>
        {typeof file !== "string" &&
          <div key={file.name} className={styles.fileName}>
            {file.name}
          </div>
        }
      </div>


      <div className="mb-32 mt-8 grid text-center lg:grid-cols-3 lg:text-left">
        <button
          onClick={handleYAML}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Descargar YAML{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              &darr;
            </span>
          </h2>
          <p className={`ms-5 max-w-[30ch] text-sm opacity-50`}>
            Archivo de definición OpenAPI en formato YAML
          </p>
        </button>
        <button
          onClick={handleRedoc}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Ver Documentación{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`ms-5 max-w-[30ch] text-sm opacity-50`}>
            Documentación del API en el formato de Redoc
          </p>
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
          <p className={`ms-5 max-w-[30ch] text-sm opacity-50`}>
            Proyecto base NodeJS con un servidor express, endpoints y métodos para incluir la lógica del servicio
          </p>
        </button>
      </div>
      <div>
        <ToastContainer />
      </div>

    </main>
  )
}
