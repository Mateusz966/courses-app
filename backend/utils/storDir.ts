require('dotenv').config()


export function storDir(): string {
  return process.env.STOR_DIR.replace('__dirname', __dirname);
}
