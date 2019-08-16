const dotenv = require('dotenv');
const normalizer = require('normalizer');

async function main() {
    dotenv.config();
    const normalizerOptions = normalizer.getOptions(process.env);
    await normalizer.run(normalizerOptions);
}

main();
