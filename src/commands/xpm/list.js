const reg_manager = require("../../reg_manager");
const chalk = require("chalk");

module.exports = () => {
    let installed = reg_manager.decompile_reg("xpm_installed.reg")

    let keys = Object.keys(installed);

    keys.forEach((key) => {
        console.log(chalk.blue(key+": "+installed[keys]))
    })
}