import { v2 as cloudinary } from 'cloudinary'

const config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}

export const uploadImage = async (file: Buffer) => {
  console.log(file)
  cloudinary.config(config)
  const result = await cloudinary.uploader.upload(file.toString(), {
    folder: 'we-codekc',
  })
  console.log(`result: ${result}`)

  return { secure_url: result.secure_url, public_id: result.public_id }
}

export const deleteImage = async (public_id: string) => {
  cloudinary.config(config)
  await cloudinary.uploader.destroy(public_id)
  return 'Image deleted'
}
