import { unlink } from 'fs';

export const unlinkFile = (path: string) => {
  return new Promise((resolve, reject) => {
    unlink(path, (err) => {
      if (err) {
        const unlinkFileError = new Error('Error unlinking file');
        return reject(unlinkFileError);
      }
      resolve(true);
    });
  });
};
