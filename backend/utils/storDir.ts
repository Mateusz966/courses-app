require('dotenv').config()


export function storDir(): string {
  console.log(process.env.STOR_DIR.replace('__dirname', __dirname))
  return process.env.STOR_DIR.replace('__dirname', __dirname);
}
