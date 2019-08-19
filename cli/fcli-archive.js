const log = require('loglevel');
const program = require('commander');
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
    .option('-D, --download-dir <downloadDir>', 'Specifies the download directory to archive', defaultOptions.downloadDir)
    .option('-R, --raw-data-dir <rawDataDir>', 'Specifies the raw data directory to archive', defaultOptions.rawDataDir)
    .option('-N, --normalized-data-dir <normalizedDataDir>', 'Specifies the normalized data directory to archive', defaultOptions.normalizedDataDir)
    .option('-A, --archived-dir <archivedDir>', 'Specifies the destination archived directory', defaultOptions.archivedDir)
    .parse(process.argv)

async function main() {
    log.setLevel(getLogLevel());

    // TODO: make all option names camelCase, so we don't need to transform them
    const options = {
        ARCHIVED_DIR: program.archivedDir,
        DOWNLOAD_DIR: program.downloadDir,
        RAW_DATA_DIR: program.rawDataDir,
        NORMALIZED_DATA_DIR: program.normalizedDataDir,
    };

    await apify.archive(options);
}

main();
