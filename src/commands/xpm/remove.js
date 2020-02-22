const fs = require("fs");
const path = require("path");
const reg_manager = require("../../reg_manager");
const chalk = require("chalk");

module.exports = (args = []) => {
    args.forEach((package) => {
        let dir_path = "./installed/"+package
        rimraf(dir_path);
        reg_manager.set_reg_value("xpm_installed.reg", "x_"+package, "removed")
        console.log(chalk.green("removed '"+package+"'"))
    })
}

const rimraf = (dir_path) => {
    if (fs.existsSync(dir_path)) {
        fs.readdirSync(dir_path).forEach(function(entry) {
            var entry_path = path.join(dir_path, entry);
            if (fs.lstatSync(entry_path).isDirectory()) {
                rimraf(entry_path);
            } else {
                fs.unlinkSync(entry_path);
            }
        });
        fs.rmdirSync(dir_path);
    }
}