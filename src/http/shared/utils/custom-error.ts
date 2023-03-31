interface CustomErrorProps {
  message: string
  error: any
  statusCode: number
}

export class CustomError {
  message: string
  error: any
  statusCode: number

  constructor({ message, error, statusCode }: CustomErrorProps) {
    this.message = message
    this.statusCode = statusCode
    this.error = error
  }
}
