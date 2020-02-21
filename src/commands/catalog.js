const reg_manager = require("../reg_manager");
const fs = require("fs");

module.exports = (command) => {
    let files = fs.readdirSync("./registers", "utf8");
    files.forEach((file) => {
        if (file.endsWith(".reg")) {
            console.log("\n")
            console.log(file)
            let current_register = reg_manager.decompile_reg(file);

            let keys = Object.keys(current_register);
            keys.forEach((key) => {
                console.log(key.hexEncode()+" "+key+": "+current_register[key])
            })
            console.log("\n")
        }
    })
}