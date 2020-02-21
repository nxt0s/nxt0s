const fs = require("fs");
const chalk = require("chalk");
const reg_manager = require("../reg_manager");

module.exports = (command) => {
    let folderName = command.substring(6).split("/")[0];

    let os_state = reg_manager.decompile_reg("os_state.reg");
    let path = os_state.current_directory
    if (path[path.length-1] == "/") {
        path = path+""+folderName
    } else if (folderName[0] == "/") {
        path = path+""+folderName
    } else {
        path = path+"/"+folderName
    }

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    } else {
        console.log(chalk.red("directory already exists"))
    }
}