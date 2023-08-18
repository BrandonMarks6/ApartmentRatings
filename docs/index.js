const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const apartments = require('./apartments');
const reviews = require('./reviews');

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  paths: {
    ...apartments.paths,
    ...reviews.paths,
  },
};
