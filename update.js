const fs = require("fs")
const srcDir =  `${__dirname}\\app-types\\`;
const fePath = `${__dirname}\\frontend\\src\\app-types\\`;
const bePath = `${__dirname}\\backend\\app-types\\`;
const destPaths = [fePath, bePath];
                              
// To copy a files
fs.readdir(srcDir, 'utf8', function(err, data){
    destPaths.forEach(dest => {
        let destName = dest.split(__dirname)[1];
        destName = destName.split('\\')[1];
        data.forEach(file => {
            fs.copyFile(srcDir + file ,dest + file, function (err) {
                if (err) {
                  console.error(err);
                } else {
                  console.log(`File ${file} was successfully copy to ${destName}!`);
                }
              });
        });        
    });
});