const dotenv = require('dotenv');
const loader = require('loader');

async function main() {
    dotenv.config();
    const loaderOptions = loader.getOptions(process.env);
    await loader.run(loaderOptions);
}

main();
