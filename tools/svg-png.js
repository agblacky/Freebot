const https = require('https');
const fs = require('fs');
const sharp = require('sharp');

//Download SVG
const downloader = (url, filename) => {
  //Create a new promise to wait for the download to finish
  return new Promise((resolve, reject) => {
    https.get(url, function (res) {
      const fileStream = fs.createWriteStream(filename);
      res.pipe(fileStream);
      fileStream.on('finish', function () {
        fileStream.close();
        console.log('Got new file!'.green);
        svgToPng(resolve);
      });
    });
  });
};

//Convert SVG to PNG
function svgToPng(resolve) {
  const timeStamp = new Date().getTime();
  sharp('input.svg')
    .png()
    .flatten({ background: '#fff' })
    .toFile(`bracket-${timeStamp}.png`);
  setTimeout(() => {
    resolve(timeStamp);
  }, 50);
}

function delOldFile(filepath) {
  //Check if file exists
  fs.stat(filepath, function (err) {
    if (err) {
      return console.error(err);
    }
    //Delete old file
    fs.unlink(filepath, function (err) {
      if (err) return console.log(err);
      console.log('File deleted successfully!'.red);
    });
  });
}

module.exports = { downloader, delOldFile };
