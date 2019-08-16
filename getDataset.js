const dotenv = require('dotenv');
const download = require('download');
const mkdirp = require('mkdirp');
const fs = require('fs');
const { promisify } = require('util');
const log = require('loglevel');

async function downloadDataset(datasetUrl, filename) {
    let fileData;

    try {
        fileData = await download(datasetUrl);
    } catch (err) {
        log.error(`Error downloading from ${ datasetUrl }`);
        log.error(err);
    }

    const writeFileAsync = promisify(fs.writeFile);
    
    try {
        await writeFileAsync(filename, fileData);
    } catch (err) {
        log.error(`Error writing file ${ filename }`);
        log.error(err);
    }
    log.debug(`Downloaded to ${ filename }`);

    return filename;
}

function makeDataDir(dir) {
    log.info(`Making directory ${ dir }`);
    try {
        mkdirp.sync(dir);
    } catch(err) {
        log.error(`Error to make dir ${ dir }`);
        log.error(err);
    }
}

async function main() {
    dotenv.config();
    log.setLevel(process.env.LOG_LEVEL);

    const rawDataDir = process.env.RAW_DATA_DIR;
    makeDataDir(rawDataDir);

    const getDatasetEndpoint = process.env.GET_DATASET_ENDPOINT;
    const dataFilename = rawDataDir + process.env.DATA_FILE;
    await downloadDataset(getDatasetEndpoint, dataFilename);
}

main();