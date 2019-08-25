# apify-etl
Scrape data using apify, normalize and load data into db.

## How to use
Runs a node express server to to accept webhook calls from apify. Once a webhook called is received, task is enqueued into rabbitmq and process by the worker in the same server. This is because the processing scraped data takes a long time and apify requires an immediate response.

## Endpoints

### GET /apify
Entry point, returns the current version of the npm package.

### POST /apify/process-dataset
Accepts the apify webhook event and enqueues task to be processed by the worker.
