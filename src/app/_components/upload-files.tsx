"use client"

import { storage } from "@/config/firebase.config"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { CheckIcon, FileUpIcon, FolderPlusIcon, ImageIcon } from "lucide-react"
import { useEffect, useRef, useState, type FC } from "react"
import { v4 as uuid } from "uuid"

interface FileUploadProgress {
  fileName: string
  progress: number
}

function removeUUID(str: string) {
  const stringWithoutUUID = str.replace(
    /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}-/,
    ""
  )

  return stringWithoutUUID
}

const UploadFiles: FC = () => {
  const [files, setFiles] = useState<FileList | null>(null)
  const [fileUploadProgresses, setFileUploadProgresses] = useState<
    FileUploadProgress[]
  >([])
  const modalRef = useRef<HTMLDialogElement>(null)
  const formFileRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (files && files.length > 0) {
      for (const file of files) {
        const fileKey = uuid()
        const fileName = `${fileKey}-${file.name}`

        const storageRef = ref(storage, `files/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )

            setFileUploadProgresses((olds) => {
              const foundProgress = olds.find(
                (old) => old.fileName === fileName
              )

              if (!foundProgress) {
                return [
                  ...olds,
                  {
                    fileName,
                    progress
                  }
                ]
              }

              const aux = olds.map((old) => {
                if (old.fileName === fileName) {
                  return {
                    fileName: old.fileName,
                    progress
                  }
                }
                return old
              })

              return aux
            })
          },
          (error) => {
            console.log("Error: ", error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadUrl) => {
                console.log(downloadUrl)
              })
              .catch((err) => {
                console.log("Error: ", err)
              })
          }
        )
      }
    }
  }, [files])

  const handleClose = () => {
    setTimeout(() => {
      setFiles(null)
      setFileUploadProgresses([])
      formFileRef.current?.reset()
    }, 500)
  }

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => modalRef.current?.showModal()}
        className="btn btn-primary btn-sm"
      >
        <FileUpIcon />
        File upload
      </button>

      <dialog ref={modalRef} id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={handleClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          <div className="space-y-8">
            <h3 className="font-bold text-lg">File upload</h3>

            {fileUploadProgresses.length > 0 && (
              <div className="flex flex-col space-y-4 max-h-64 overflow-y-auto">
                {fileUploadProgresses.map((file) => {
                  return (
                    <div
                      className="flex flex-col space-y-2"
                      key={file.fileName}
                    >
                      <div className="flex justify-between items-center space-x-4">
                        <div className="flex space-x-4 items-center">
                          <ImageIcon className="min-w-8 min-h-8 w-8 h-8" />
                          <p>{removeUUID(file.fileName)}</p>
                        </div>

                        {fileUploadProgresses.find(
                          (fileUploadProgress) =>
                            fileUploadProgress.fileName === file.fileName
                        )?.progress === 100 && (
                          <div className="border border-green-500 rounded-full p-1 min-w-8 min-h-8 h-8 w-8 flex items-center justify-center">
                            <CheckIcon size={16} className="text-green-500" />
                          </div>
                        )}
                      </div>

                      {fileUploadProgresses.find(
                        (fileUploadProgress) =>
                          fileUploadProgress.fileName === file.fileName
                      )?.progress !== 100 && (
                        <progress
                          className="progress progress-primary w-full"
                          value={
                            fileUploadProgresses.find(
                              (fileUploadProgress) =>
                                fileUploadProgress.fileName === file.fileName
                            )?.progress
                          }
                          max="100"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <form
              ref={formFileRef}
              className="flex items-center justify-center w-full"
            >
              <input
                multiple
                onChange={(e) => setFiles(e.target.files)}
                id="dropzone-file"
                type="file"
                className="file-input file-input-bordered file-input-primary w-full"
              />
            </form>
          </div>
        </div>
      </dialog>

      <button className="btn btn-primary btn-sm">
        <FolderPlusIcon />
        Create a folder
      </button>
    </div>
  )
}

export { UploadFiles }
