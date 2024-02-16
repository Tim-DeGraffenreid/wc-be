import QRCode from 'qrcode'

export const generateQRCode = async (data: {
  studentId: string
  class: string
  date: string
}) => {
  QRCode.toDataURL(JSON.stringify(data), (err, url) => {
    if (err) throw err
    console.log(url)
    return url
  })
}
