const path = require('path');
const util = require('util');
import fs from 'fs';

export async function removeFileIfPossible(dir: string, fn: string) {
  if (!fn) {
    return;
  }
  const fullPath = path.join(dir, fn);
  try {
    await util.promisify(fs.unlink)(fullPath);
  } catch (e) {
    console.log(e);
  }
}