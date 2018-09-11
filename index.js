const nunjucks = require('nunjucks')
const axios = require('axios');
const fs = require('fs')

const API = 'https://greekdigitalcommunity.com/jobs';

if (!fs.existsSync('public')) {
  fs.mkdirSync('public')
}

build();

async function getJobs() {
  try {
    const res = await axios.get(API);
  } catch(e) {
    return require('./data.js');
  }
}


async function build() {
  const jobs = await getJobs();
  console.log(jobs);
  const renderedPage = nunjucks.render(`index.njk`, {jobs});
  fs.closeSync(fs.openSync(`${__dirname}/public/index.html`, 'a'));
  fs.writeFileSync(`${__dirname}/public/index.html`, renderedPage);
}