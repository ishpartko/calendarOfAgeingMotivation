module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/calendarOfAgeingMotivation/dist/'
    : '/',
  outputDir: "../docs/dist",
  indexPath: "../index.html"
}