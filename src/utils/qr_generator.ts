import QRCode from 'qrcode'

export const generateQRCode = async (data: {
  studentId: string
  classId: string
  date: string
  studentName: string
  className: string
}) => {
  QRCode.toDataURL(JSON.stringify(data), (err: any, url: any) => {
    if (err) throw err
    console.log(url)
    return url
  })
}
