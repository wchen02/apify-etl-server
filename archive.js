const dotenv = require('dotenv');
const mkdirp = require('mkdirp');
const log = require('loglevel');
const fs = require('fs');
const { format } = require('date-fns');

async function main() {
    dotenv.config();
    log.setLevel(process.env.LOG_LEVEL);

    const date = new Date();
    const year = format(date, 'YYYY');
    const month = format(date, 'MM');
    const day = format(date, 'DD');

    const archivedDir = 'archived/' + year + '/' + month + '/' + day + '/';
    log.info(`Making directory ${ archivedDir }`);
    try {
        mkdirp.sync(archivedDir);
    } catch(err) {
        log.error(`Error to make dir ${ archivedDir }`);
        log.error(err);
    }

    const downloadDir = process.env.DOWNLOAD_DIR;
    const rawDataDir = process.env.RAW_DATA_DIR;
    const normalizedDataDir = process.env.NORMALIZED_DATA_DIR;

    const archivedDownloadDir = archivedDir + 'download';
    const archivedRawDataDir = archivedDir + 'raw';
    const archivedNormalizedDataDir = archivedDir + 'normalized';

    mkdirp.sync(archivedDownloadDir);
    mkdirp.sync(archivedRawDataDir);
    mkdirp.sync(archivedNormalizedDataDir);

    await fs.renameSync(downloadDir, archivedDownloadDir);
    await fs.renameSync(rawDataDir, archivedRawDataDir);
    await fs.renameSync(normalizedDataDir, archivedNormalizedDataDir);
}

main();
