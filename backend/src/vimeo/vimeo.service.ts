import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as util from 'util';
import * as fs from 'fs';
import { storDir } from '../../utils/storDir';

const { Vimeo } = require('vimeo');

@Injectable()
export class VimeoService {
  private client = new Vimeo(
    process.env.VIMEO_CLIENT_ID,
    process.env.VIMEO_CLIENT_SECRET,
    process.env.VIMEO_ACCESS_TOKEN,
  );

  async upload(file: Express.Multer.File, name: string, description: string) {
    return new Promise<any>((resolve, reject) =>
      this.client.upload(
        path.join(storDir(), 'video_store/', file.filename),
        {
          name,
          description,
        },
        async (uri: string) => {
          try {
            console.log(`URI: ${uri}`);
            resolve(uri);
            // returnuri;
          } catch (error) {
            reject(error);
          }
        },
        (bytes_uploaded, bytes_total) => {
          const percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
          console.log(bytes_uploaded, bytes_total, `${percentage}%`);
        },
        async (error) => {
          // return error;
          await util.promisify(fs.unlink)(
            path.join(storDir(), 'video_store/', file.filename),
          );
          reject(error);
        },
      ),
    );
  }
}
