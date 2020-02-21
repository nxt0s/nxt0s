const fs = require("fs");
const chalk = require("chalk");
const reg_manager = require("../reg_manager");

module.exports = (command) => {
    let path = command.substring(3)
    let os_state = reg_manager.decompile_reg("os_state.reg");
    let curr_path = os_state.current_directory



    if (curr_path == "./" || curr_path == ".") {
        curr_path = "./"
    }

    let final_path = "";
    if (curr_path[curr_path.length-1] == "/" && path[0] == "/") {
        path[path.length - 1] = ""
        final_path = curr_path+""+path
    } else if (curr_path[curr_path.length-1] != "/" && path[0] != "/") {
        final_path =  curr_path+"/"+path
    } else {
        final_path = curr_path+""+path
    }

    if (fs.existsSync(final_path) || fs.existsSync(path)) {
        if (path == "..") {

            if (curr_path == "./") {
                curr_path = "./"

                reg_manager.set_reg_value("os_state.reg", "current_directory", curr_path)
            } else {
                let path = curr_path.split("/")
                path.pop()

                path = path.join("/")

                reg_manager.set_reg_value("os_state.reg", "current_directory", path)
            }
        } else if (path == ".") {

        } else {
            
            reg_manager.set_reg_value("os_state.reg", "current_directory", final_path)
        }
    } else {
        console.log(chalk.red("invalid directory"))
    }
}