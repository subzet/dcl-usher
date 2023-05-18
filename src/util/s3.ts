import S3 from 'aws-sdk/clients/s3.js';

import { environment } from './environment';

export const s3 = new S3({
  endpoint: `https://${environment.S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: environment.S3_ACCESS_KEY,
  secretAccessKey: environment.S3_SECRET_KEY,
  signatureVersion: 'v4',
});
