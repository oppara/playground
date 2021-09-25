import { S3_BUCKET_NAME, S3_REGION, IDENTITY_POOL_ID } from './env.js';

const { CognitoIdentityClient } = require('@aws-sdk/client-cognito-identity');

const {
  fromCognitoIdentityPool,
} = require('@aws-sdk/credential-provider-cognito-identity');

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: S3_REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: S3_REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const upload = async (file) => {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: file.name,
      Body: file,
    };
    try {
      const data = await s3.send(new PutObjectCommand(params));
      console.log('ok');
      console.log(data);
    } catch (err) {
      console.log(err.message);
      console.log(err);
    }
  };

  const btn = document.getElementById('submit');
  btn.addEventListener(
    'click',
    () => {
      const files = document.getElementById('file-chooser').files;
      if (!files.length) {
        alert('ファイルを選択してください。');
        return false;
      }

      const file = files[0];
      console.log(file);
      upload(file);

      return false;
    },
    false
  );
});
