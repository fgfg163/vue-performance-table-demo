module.exports = {
  baseUrl: '',
  outputDir: 'docs',
  pages: {
    index: {
      // entry for the page
      entry: 'src/pages/index/main.js',
      // the source template
      // title: "Login page",
      template: 'src/pages/index/index.html',
      // output as dist/index.html
      filename: 'index.html',
    },
    share: {
      entry: 'src/pages/share/main.js',
      // title: "main page",
      template: 'src/pages/share/index.html',
      filename: 'share.html',
    }
  }
}