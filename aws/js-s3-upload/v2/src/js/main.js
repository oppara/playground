/* global AWS */

import { S3_BUCKET_NAME, S3_REGION, IDENTITY_POOL_ID } from './env.js';

AWS.config.update({
  region: S3_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
  }),
});

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const btn = document.getElementById('submit');
  btn.addEventListener(
    'click',
    async () => {
      const files = document.getElementById('file-chooser').files;
      if (!files.length) {
        alert('ファイルを選択してください。');
        return false;
      }

      const file = files[0];
      console.log(file);

      const params = {
        Bucket: S3_BUCKET_NAME,
        Key: file.name,
        ContentType: file.type,
        Body: file,
      };

      try {
        const upload = new AWS.S3.ManagedUpload({ params });
        const data = await upload.promise();
        console.log(data);
      } catch (err) {
        console.log(err);
      }

      return false;
    },
    false
  );
});
