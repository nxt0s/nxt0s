const chalk = require("chalk");
const reg_manager = require("../reg_manager")
const fs = require("fs")

module.exports = (command) => {
    let fileName = command.substring(5)
    let os_state = reg_manager.decompile_reg("os_state.reg")
    curr_path = os_state.current_directory

    let path = os_state.current_directory
    if (path[path.length-1] == "/") {
        path = path+""+fileName
    } else if (folderName[0] == "/") {
        path = path+""+fileName
    } else {
        path = path+"/"+fileName
    }

    if (fs.existsSync(path)) {
        let content = fs.readFileSync(path, "utf8");
        console.log(content);
    } else {
        console.log(chalk.red("file does not exist"))
    }

}