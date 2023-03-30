import bcrypt from 'bcrypt'

class EncryptUtil {
  #salt: string

  constructor() {
    const saltRounds = 10
    this.#salt = bcrypt.genSaltSync(saltRounds)
  }

  encrypt(value: string) {
    return bcrypt.hashSync(value, this.#salt)
  }

  decrypted(value: string, hash: string) {
    return bcrypt.compareSync(value, hash!)
  }
}

export const encryptUtil = new EncryptUtil()
