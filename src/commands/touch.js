const chalk = require("chalk");
const reg_manager = require("../reg_manager");
const fs = require("fs")

module.exports = (command) => {

    let fileName = command.substring(6).split("/")[0];

    let os_state = reg_manager.decompile_reg("os_state.reg");
    let path = os_state.current_directory
    if (path[path.length-1] == "/") {
        path = path+""+fileName
    } else if (folderName[0] == "/") {
        path = path+""+fileName
    } else {
        path = path+"/"+fileName
    }

    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "");
    } else {
        console.log(chalk.red("directory already exists"))
    }

}