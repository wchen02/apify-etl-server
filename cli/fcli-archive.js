const log = require('loglevel');
const program = require('commander');
const omit = require('object.omit');
const apify = require('../lib/apify-client')();

function getLogLevel() {
    if (program.silent) {
        return log.levels.WARN;
    } else if (program.debug) {
        return log.levels.DEBUG;
    } else {
        return log.levels.INFO;
    }
}

function getDefaultOptions() {
    return {
        silent: false,
        debug: false,
        downloadDir: 'download',
        rawDataDir: 'raw',
        normalizedDataDir: 'normalized',
        archivedDir: 'archived'
    }
}

const defaultOptions = getDefaultOptions();

program
    .description('Retrieves last run dataset items')
    .option('-s, --silent', 'Set log level to warn', defaultOptions.silent)
    .option('-d, --debug', 'Set log level to debug', defaultOptions.debug)
    .option('-D, --download-dir', 'Specifies the download directory to archive', defaultOptions.downloadDir)
    .option('-R, --raw-data-dir', 'Specifies the raw data directory to archive', defaultOptions.rawDataDir)
    .option('-N, --normalized-data-dir', 'Specifies the normalized data directory to archive', defaultOptions.normalizedDataDir)
    .option('-A, --archived-dir', 'Specifies the destination archived directory', defaultOptions.archivedDir)
    .parse(process.argv)

async function main() {
    log.setLevel(getLogLevel());
    const options = omit(program.opts(), ['silent', 'debug']);
    await apify.archive(options);
}

main();
