import * as dotenv from "dotenv";
const env = dotenv.config().parsed;

export const getTransporterObject = () => {
  return env.NODE_ENV === 'production' ?
    {
      host: env.EMAIL_HOST,
      secureConnection: true,
      port: env.EMAIL_PORT,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    } :
    {
      service: env.EMAIL_SERVICE,
      secure: env.EMAIL_SECURE,
      port: env.EMAIL_PORT,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    }
}