import { uploadFileParams } from './typeing';

export const uploadFile = ({
  url,
  formData,
  fileName,
  headers,
  onProgress,
  onError,
}: uploadFileParams) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.setRequestHeader('Content-Disposition', encodeURIComponent(fileName));
    // 自定义headers
    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress?.({
          xhr,
          percent: percent === 100 ? 99 : percent,
        });
      }
    });
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        onProgress({
          xhr,
          percent: 100,
          data,
        });
        resolve(data);
      } else {
        const error = xhr.statusText;
        onError(error);
        reject(error);
      }
    };
    xhr.onerror = (e) => {
      onError(e);
      reject(e);
    };
    xhr.send(formData);
  });
};

export const getExtension = (fileName: string) => {
  return fileName.substring(fileName.lastIndexOf('.')).toLocaleLowerCase();
};
export const getSizeMb = (fileSize: number) => {
  return fileSize / 1024 / 1024;
};

// export const uploadFileWithProgress = (file, url, onprogress) => {
//   return new Promise((resolve, reject) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     console.log(file, url);

//     const stream = file.stream();
//     const reader = stream.getReader();
//     console.log(stream, 'stream');

//     let loaded = 0;
//     let total = file.size;

//     const uploadChunk = () => {
//       return reader.read().then(({ done, value }) => {
//         if (done) {
//           resolve(undefined);
//           return;
//         }

//         loaded += value.byteLength;

//         const progress = Math.round((loaded / total) * 100);
//         console.log(`Upload Progress: ${progress}%`);
//         onprogress(progress);
//         return fetch(url, {
//           method: 'POST',
//           body: value,
//           headers: {
//             'Content-Type': 'form-data',
//             'Content-Length': value.byteLength.toString(),
//           },
//         }).then(uploadChunk);
//       });
//     };

//     uploadChunk().catch(reject);
//   });
// };
