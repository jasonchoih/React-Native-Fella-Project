import { S3 } from 'aws-sdk';
import { store } from 'store';
// 
const s3 = new S3({
  accessKeyId: 'AKIAVKCASMRC2PNL5C6M',
  secretAccessKey: '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',
  region: 'us-east-1',
});
// 
export const uploadToAws = async (uri, key) => 
{
  const response = await fetch(uri);
  const blob = await response.blob();
  const params = {
    Bucket: 'fella-storage.com',
    Key: key,
    Body: blob,
    ACL:'public-read',
    ContentEncoding: 'base64'
  };
  // 
  s3.upload(params, (err, data) => {
    if (err) console.log("error", err, err.stack);
    if (data) {
      console.log("Upload Success", data.Location);
      store.dispatch.models.SET({
        media: {
          ...store.getState().models.media,
          ...{ loaded: 1 }
        }
      })
    }
  })
};
