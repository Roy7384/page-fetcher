const argu = process.argv.slice(2);
const url = argu[0];
const storeFilePath = argu[1];
const request = require('request');
const fs = require('fs');

request(url, (error, response, body) => {

  console.log('error:', error); // Print the error if one occurred
  
  // prompt failed when error occured or status code is not 200
  if (error || response.statusCode !== 200) {
    console.log('Fetch failed');
    return;
  }
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  // check the filePath, if its already exsit or if its valid
  fs.stat(storeFilePath, (err, stats) => {
    if (err) {
      console.log('Invalid Path');
      process.exit();
    }
    if (stats.size) {
      console.log('file already exist');
      process.exit();
    }
  });

  fs.writeFile(storeFilePath, body, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Downloaded and saved ' + body.length + ' bytes to ' + storeFilePath);
  }); //
});