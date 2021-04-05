const sharp = require('sharp');
import { removeFileIfPossible } from "./removeFileIfPossible";
import { storDir } from './storDir';

const path = require('path')

export async function setFileIfExists(
    entity: any,
    fieldNameForFileName: string,
    storSubDir: string,
    file: any,
    isDragAndDrop: boolean,
    width = 1024,
    format: 'jpeg' | 'png' = 'jpeg',
  ) {
    if (
      !file ||
      (!file.filename && !isDragAndDrop) ||
      (!file.fieldname && isDragAndDrop)
    )
      return false;
  
    if (entity[fieldNameForFileName]) {
      await removeFileIfPossible(
        path.join(storDir(), storSubDir + '/'),
        entity[fieldNameForFileName],
      );
    }
  
    const oldFileName = file.filename;
    const newFileName = `${file.filename}.${format}`;
  
    const pendingSharp = sharp(file.path)
      .resize(width, 1024, {
        fit: 'inside',
      })
      .toFormat(format);
  
    if (format === 'jpeg') {
      await pendingSharp
        .jpeg({
          quality: 90,
          chromaSubsampling: '4:4:4',
          force: true,
        })
        .toFile(path.resolve(`${storDir()}${storSubDir}/${newFileName}`));
    } else if (format === 'png') {
      await pendingSharp
        .png({
          quality: 100,
          force: true,
        })
        .toFile(path.resolve(`${storDir()}${storSubDir}/${newFileName}`));
    }
  
    await removeFileIfPossible(
      path.join(storDir(), storSubDir + '/'),
      oldFileName,
    );
  
    entity[fieldNameForFileName] = newFileName;
  
    await entity.save();
  }