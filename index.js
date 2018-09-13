const nunjucks = require('nunjucks')
const axios = require('axios');
const fs = require('fs')

const API = process.env.API || 'https://gdcbot.herokuapp.com/jobs';
const KEY = process.env.KEY;

if (!fs.existsSync('public')) {
  fs.mkdirSync('public')
}

build();

async function getJobs() {
  try {
    const { data: { jobs } } = await axios.get(`${API}?key=${KEY}`);
    return jobs;
  } catch(e) {
    return require('./data.js').jobs;
  }
}

async function build() {
  const jobs = await getJobs();
  const renderedPage = nunjucks.render(`index.njk`, {jobs});
  fs.closeSync(fs.openSync(`${__dirname}/public/index.html`, 'a'));
  fs.writeFileSync(`${__dirname}/public/index.html`, renderedPage);
  fs.createReadStream('./styles.css').pipe(fs.createWriteStream('./public/styles.css'));
}