const fs = require("fs");
const reg_manager = require("../reg_manager");
const chalk = require("chalk");

module.exports = (command) => {
    let os_state = reg_manager.decompile_reg("os_state.reg");

    let files = fs.readdirSync(os_state.current_directory, "utf8");
    files.forEach((file) => {
        if (file.indexOf(".") == 0 || file.indexOf(".") == -1) {
            console.log(chalk.cyan(file)+"/");
        } else {
            console.log(file);
        }
    })
}