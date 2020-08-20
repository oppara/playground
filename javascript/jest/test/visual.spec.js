// const SNAPSHOT_FAILURE_THRESHOLD = 0.01;
const path = require('path');
const fs = require('fs');

const loadPages = (dir) => {
  const target = path.resolve(workdir, 'pages.json');
  try{
    return JSON.parse(fs.readFileSync(target, 'utf8'));
  }
  catch(e){
    console.log(e.message);
  }
};

// ID のディレクトリを作成し、そのディレクトリに移動してからコマンドを実行する
// npx jest --silent --no-colors --json --outputFile=log_`date "+%Y%m%d_%H%M"`.json --noStackTrace --projects ../test
// npx jest --silent --updateSnapshot --no-colors --json --outputFile=update_`date "+%Y%m%d_%H%M"`.json --noStackTrace --projects ../test
//
const workdir = process.cwd();
console.log(workdir);
// 以下でIDを求められる
console.log(path.basename(workdir));
const siteId = path.basename(workdir);

const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: path.resolve(workdir, 'snapshots'),
  // failureThreshold: SNAPSHOT_FAILURE_THRESHOLD,
  // failureThresholdType: 'percent',
});
expect.extend({ toMatchImageSnapshot });

const pages = loadPages(workdir);

describe(siteId, () => {
  beforeAll(async () => {});

  for (const key in pages) {
    const pageId = key.replace('id', '');
    const url = pages[key];

    it(pageId + ' ' + url, async () => {
      await page.goto(url, { waitUntil: 'networkidle0' });
      expect(await page.screenshot({ fullPage: true })).toMatchImageSnapshot({
        customSnapshotIdentifier: url
          .replace(/https?:\/\//, '')
          .replace(/\//g, '-'),
      });
    });
  }
});
