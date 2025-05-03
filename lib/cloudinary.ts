import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface UploadImageParams {
  buffer: Buffer
  filename: string
  folder?: string
}

export async function uploadImage({ buffer, filename, folder = "portfolio" }: UploadImageParams) {
  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      folder,
      resource_type: "auto",
    }

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    ).end(buffer)
  })
}

export default cloudinary
