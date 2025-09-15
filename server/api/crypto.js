import CryptoJS from 'crypto-js'

export function encryptData(data) {
  const config = useRuntimeConfig()
  const secretKey = config.CRYPTO_SECRET_KEY

  const jsonString = typeof data === 'string' ? data : JSON.stringify(data)
  const ciphertext = CryptoJS.AES.encrypt(jsonString, secretKey).toString()

  return ciphertext
}

export function decryptData(ciphertext) {
  const config = useRuntimeConfig()
  const secretKey = config.CRYPTO_SECRET_KEY

  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8)

  try {
    return JSON.parse(decryptedString)
  } catch {
    return decryptedString
  }
}
