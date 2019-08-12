# apify-etl
Scrape data using apify, normalize and load data into db.

## How to use
Runs remote Apify scraper task daily or at a date range.

### Daily
**Run normal mode**

`npm run start`

**Run dry mode mode**

`npm run start-dev`

### Date Range
**Run normal mode**

`START_DATE='08/12/2019' END_DATE='08/16/2019' npm run start-range`

**Run dry mode mode**

`START_DATE='08/12/2019' END_DATE='08/16/2019' npm run start-range-dev`