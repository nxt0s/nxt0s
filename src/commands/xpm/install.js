const fs = require("fs");
const chalk = require("chalk");
const reg_manager = require("../../reg_manager");
const request = require("request");
const unzipper = require("unzipper");

module.exports = (args = []) => {

    args.forEach((package) => {

        if (!fs.existsSync("./installed/"+package)) {

            let package_source = reg_manager.decompile_reg("boot.reg").xpm_package_source

            reg_manager.append_reg_value("xpm_installed.reg", package, "./installed/"+package+"/index.js")

            request(package_source+"blob/master/"+package+".zip?raw=true")
            .pipe(fs.createWriteStream('./installed/'+package+'.zip'))
            .on('close', function () {
                fs.createReadStream("./installed/"+package+".zip").pipe(unzipper.Extract({ path: './installed/'})).on("close", () => {
                    reg_manager.append_reg_value("xpm_installed.reg", package, "./installed/"+package+"/index.js")
                    fs.unlinkSync('./installed/'+package+'.zip')
                });
            });




        } else {
            console.log(chalk.red("package "+package+" is already installed. skipping..."))
        }

    });

}