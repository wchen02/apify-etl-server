const download = require('download');
const mkdirp = require('mkdirp');
const fs = require('fs');
const { promisify } = require('util');
const log = require('loglevel');
const normalizer = require('normalizer');
const loader = require('loader');
const { 
    format, 
    startOfToday, 
    endOfToday,
    differenceInDays,
} = require('date-fns');
const axios = require('axios');

module.exports = function() {
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

    function renameDir(src, dest) {
        log.info(`Renaming directory ${ src } to ${ dest }`);
        try {
            fs.renameSync(src, dest);
        } catch(err) {
            log.error(`Error renaming directory ${ src } to ${ dest }`);
            log.error(err);
        }
    }
    
    function getDailyOptions(data, requestsPerDay, requestDepthsPerDay) {
        data.startDate = format(startOfToday(), 'MM/DD/YYYY');
        data.endDate = format(endOfToday(), 'MM/DD/YYYY');
    
        data.maxRequestsPerCrawl = requestsPerDay;
        data.maxRequestDepth = requestDepthsPerDay;
    }
    
    function getDateRangeOptions(data, requestsPerDay, requestDepthsPerDay, startDate, endDate) {
        data.startDate = startDate;
        data.endDate = endDate;
    
        const numOfDays = Math.abs(differenceInDays(startDate, endDate)) + 1;
        data.maxRequestsPerCrawl = requestsPerDay * numOfDays;
        data.maxRequestDepth = requestDepthsPerDay * numOfDays;
    }
    
    async function getDataset(options) {
        const rawDataDir = options.RAW_DATA_DIR;
        makeDataDir(rawDataDir);
    
        const getDatasetEndpoint = options.GET_DATASET_ENDPOINT;
        const dataFilename = rawDataDir + options.DATA_FILE;
        await downloadDataset(getDatasetEndpoint, dataFilename);
    }
    
    async function normalize(options) {
        const normalizerOptions = normalizer.getOptions(options);
        await normalizer.run(normalizerOptions);
    }
    
    async function load(options) {
        const loaderOptions = loader.getOptions(options);
        await loader.run(loaderOptions);
    }
    
    async function archive(options) {
        const archivedDir = options.ARCHIVED_DIR || 'archived';
        const downloadDir = options.DOWNLOAD_DIR;
        const rawDataDir = options.RAW_DATA_DIR;
        const normalizedDataDir = options.NORMALIZED_DATA_DIR;

        const date = new Date();
        const year = format(date, 'YYYY');
        const month = format(date, 'MM');
        const day = format(date, 'DD');

        const datedArchivedDir = archivedDir + '/' + year + '/' + month + '/' + day;
        const archivedDownloadDir = datedArchivedDir + '/download';
        const archivedRawDataDir = datedArchivedDir + '/raw';
        const archivedNormalizedDataDir = datedArchivedDir + '/normalized';        

        makeDataDir(datedArchivedDir);
        makeDataDir(archivedDownloadDir);
        makeDataDir(archivedRawDataDir);
        makeDataDir(archivedNormalizedDataDir);

        renameDir(downloadDir, archivedDownloadDir)
        renameDir(rawDataDir, archivedRawDataDir);
        renameDir(normalizedDataDir, archivedNormalizedDataDir);
    }
    
    async function scrape(options, config) {
        // const config = require('./config.json');
        log.info('Input config:');
        log.info(config.INPUT);
    
        const data = config.INPUT;
    
        if (options.DRY_RUN) {
            data.isTestRun = true;
            data.logLevel = 5;
        }
    
        const requestsPerDay = parseInt(options.REQUESTS_PER_DAY, 10);
        const requestDepthsPerDay = parseInt(options.REQUEST_DEPTHS_PER_DAY, 10);
    
        if (options.DAILY) {
            getDailyOptions(data, requestsPerDay, requestDepthsPerDay);
        } else if (options.START_DATE && options.END_DATE) {
            getDateRangeOptions(data, requestsPerDay, requestDepthsPerDay, options.START_DATE, options.END_DATE);
        } else {
            log.error('Invalid command!');
        }
    
        log.debug('Running Task with options:');
        log.debug(data);
        await axios.post(options.RUN_TASK_ENDPOINT, data);
    }
    
    async function processDataset(options) {
        log.info('Processing dataset');
    
        try {
            await getDataset(options);
            await normalize(options);
            await load(options);
            await archive(options);
        } catch(err) {
            log.error(`Error processing dataset`);
            log.error(err);
        }
    
        log.info('Finish processing dataset');
    }

    return {
        getDataset,
        normalize,
        load,
        archive,
        processDataset,
        scrape,
    };
}
