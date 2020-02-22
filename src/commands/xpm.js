const chalk = require("chalk");
const reg_manager = require("../reg_manager");
const fs = require("fs");

const install = require("./xpm/install");
const remove = require("./xpm/remove");
const list = require("./xpm/list");
const help = require("./xpm/help");

module.exports = (command) => {

    command = command.split(" ")

    let subCommand = "";
    let args = [];

    for (let i = 1; i < command.length; i++) {
        if (i == 1) {
            subCommand = command[i];
        } else {
            args.push(command[i]);
        }
    }

    if (subCommand == "install") {
        install(args);
    } else if (subCommand == "remove") {
        remove(args);
    } else if (subCommand == "list") {
        list();
    } else if (subCommand == "help") {
        help();
    } else {
        console.log(chalk.red("invalid sub-command. use 'xpm help' for help on the nxt0s package manager"))
    }

    


}