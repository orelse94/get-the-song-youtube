const fs = require('fs');
const youTube = require('youtube-dl');

const dn = (add) => {
  let url = 'https://www.youtube.com/watch?v=' + add;
  const video = youTube(url);
  let nme ='';
  // called when the download starts.
  video.on('info', function(info) {
    console.log('Download started');
    console.log('filename: ' + info._filename);
    console.log('size: ' + info.size);
    nme = info._filename
    video.pipe(fs.createWriteStream(`downloads/${nme}.mp3`));
  })
  .catch(err => console.log(err));

}
// const video = youTube('https://www.youtube.com/watch?v=uYOT93GM86o&t=0s&list=PL8ywZtbqCRCT-Htr1k28mH8AuR7FnQPhI&index=3');


function playlist(url) {

  'use strict';
  let video = ytdl(url);

  video.on('error', function error(err) {
    console.log('error 2:', err);
  });

  let size = 0;
  video.on('info', function(info) {
    size = info.size;
    let output = path.join(__dirname + '/', size + '.mp4');
    video.pipe(fs.createWriteStream(output));
  });

  let pos = 0;
  video.on('data', function data(chunk) {
    pos += chunk.length;
    // `size` should not be 0 here.
    if (size) {
      let percent = (pos / size * 100).toFixed(2);
      process.stdout.cursorTo(0);
      process.stdout.clearLine(1);
      process.stdout.write(percent + '%');
    }
  });

  video.on('next', playlist);

}
