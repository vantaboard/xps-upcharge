const { author, dependencies, repository, version } = require('../package.json')

module.exports = {
  name: 'XPS Upcharge',
  namespace: 'https://brightentompkins.com/',
  version: version,
  author: author,
  source: repository.url,
  'license': 'MIT',
  match: [
    'http://www.xpsshipper.com/ec/*'
  ],
  icon: [
    'https://xpsshipper.com/ec/static/images/client/xps/xps-favicon.png'
  ],
  require: [
    `https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`,
    `https://cdn.jsdelivr.net/npm/axios@${dependencies.axios}/dist/axios.min.js`,
    `https://cdn.jsdelivr.net/npm/axios-userscript-adapter@${dependencies['axios-userscript-adapter']}/dist/axiosGmxhrAdapter.min.js`,
  ],
  grant: [
    'window.onurlchange',
    'GM.xmlHttpRequest',
    'GM.addStyle',
    'GM.setValue',
    'GM.getValue'
  ],
  connect: [
    'httpbin.org'
  ],
  'run-at': 'document-end'
}
