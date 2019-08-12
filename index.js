const dotenv = require('dotenv');
const axios = require('axios');
const log = require('loglevel');
const dateFns = require('date-fns');

const config = require('./config.json');

function getDailyOptions(data, requestsPerDay, requestDepthsPerDay) {
    data.startDate = dateFns.format(dateFns.startOfToday(), 'MM/DD/YYYY');
    data.endDate = dateFns.format(dateFns.endOfToday(), 'MM/DD/YYYY');
    data.dataset = `${ data.dataset }-${ data.startDate }-${ data.endDate }`;
    data.dataset = data.dataset.replace(/\//g, '');

    data.maxRequestsPerCrawl = requestsPerDay;
    data.maxRequestDepth = requestDepthsPerDay;
}

function getDateRangeOptions(data, requestsPerDay, requestDepthsPerDay, startDate, endDate) {
    data.startDate = startDate;
    data.endDate = endDate;
    data.dataset = `${ data.dataset }-${ data.startDate }-${ data.endDate }`;
    data.dataset = data.dataset.replace(/\//g, '');

    const numOfDays = Math.abs(dateFns.differenceInDays(startDate, endDate)) + 1;
    data.maxRequestsPerCrawl = requestsPerDay * numOfDays;
    data.maxRequestDepth = requestDepthsPerDay * numOfDays;
}

async function main() {
    dotenv.config();
    log.setLevel(process.env.LOG_LEVEL);
    log.info('Input config:');
    log.info(config.INPUT);

    const data = config.INPUT;

    if (process.env.DRY_RUN) {
        data.isTestRun = true;
        data.logLevel = 5;
    }

    const requestsPerDay = parseInt(process.env.REQUESTS_PER_DAY, 10);
    const requestDepthsPerDay = parseInt(process.env.REQUEST_DEPTHS_PER_DAY, 10);

    if (process.env.DAILY) {
        getDailyOptions(data, requestsPerDay, requestDepthsPerDay);
    } else if (process.env.START_DATE && process.env.END_DATE) {
        getDateRangeOptions(data, requestsPerDay, requestDepthsPerDay, process.env.START_DATE, process.env.END_DATE);
    } else {
        log.error('Invalid command!');
    }

    log.debug('Running Task with options:');
    log.debug(data);
    await axios.post(process.env.RUN_TASK_ENDPOINT, data);
}

main();