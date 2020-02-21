const fs = require("fs");
const reg_manager = require("../reg_manager");

module.exports = () => {
    let os_state = reg_manager.decompile_reg("os_state.reg");

    let files = fs.readdirSync(os_state.current_directory, "utf8");
    files.forEach((file) => {
        if (file.indexOf(".") == 0 || file.indexOf(".") == -1) {
            
        }
    })
}