const reg_manager = require("./src/reg_manager");
const fs = require("fs");
const readline = require("readline");
const chalk = require("chalk");
const dns = require("dns");

let found_commands = {};

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += (""+hex).slice(-4);
    }

    return result;
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var exec = require('child_process').exec, child;

const run = async () => {

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

    await exec('clear', function(error, stdout, stderr) {
        console.log('' + stdout);
        console.log("initializing...");
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    let boot_reg = reg_manager.decompile_reg("boot.reg");
    await sleep(1000);
    console.log(chalk.green("found register "+boot_reg.name+" at location 0x"+boot_reg.name.hexEncode()));
    console.log("extracting register values for "+boot_reg.name);
    await sleep(1000);
    let keys = Object.keys(boot_reg);

    for (let i = 0; i < keys.length; i++) {
        await sleep(50);
        console.log("0x"+keys[i].hexEncode()+" "+keys[i]+": "+boot_reg[keys[i]]);
    }
    await sleep(500);
    console.log(" ");
    console.log("initializing command registry...");
    let command_reg = reg_manager.decompile_reg(""+boot_reg.command_reg);
    await sleep(2500);
    console.log(chalk.green("found register "+command_reg.name+" at 0x"+command_reg.name.hexEncode()));
    keys = Object.keys(command_reg);

    for (let i = 0; i < keys.length; i++) {
        await sleep(50);
        console.log("0x"+keys[i].hexEncode()+" "+keys[i]+": "+command_reg[keys[i]]);
    }

    let count = 0;
    let total = 0;

    for (let i = 0; i < keys.length; i++) {
        await sleep(50);
        if (keys[i] == "name" || keys[i] == "path") {
            
        } else {
            total++;
            if (fs.existsSync(command_reg[keys[i]])) {
                console.log(chalk.cyan(command_reg[keys[i]]+" was found at 0x"+command_reg[keys[i]].hexEncode()));
                found_commands[keys[i]] = require(command_reg[keys[i]]);
                count++;
            } else {
                console.log(chalk.yellow(command_reg[keys[i]]+" was not found, avoiding"));
            }
        }
    }
    console.log("\nfound "+count+"/"+total+" commands, proceeding")
    console.log("\n")
    console.log("initializing xpm...")
    await sleep(500);
    console.log("checking connection to package sources...")

    console.log(chalk.green("connected to '"+boot_reg.xpm_package_source+"'. continuing..."))
            
    let installedPackages = reg_manager.decompile_reg("xpm_installed.reg");

    keys = Object.keys(installedPackages)

    keys.forEach((key) => {
        if (key == "path" || key == "name") {

        } else {
            if (fs.existsSync(installedPackages[key])) {
                console.log(chalk.blue("found "+key+" at 0x"+installedPackages[key].hexEncode()));

                found_commands[key] = require(installedPackages[key]);
            } else {
                console.log(chalk.yellow("could not find package '"+key+"' installed. avoiding..."))
            }
        }
    })

    await sleep(500);
    console.log("loading user information...")
    await sleep(700);
    console.log("done!")
    await sleep(1000);

    await exec('clear', function(error, stdout, stderr) {
        console.log('' + stdout);
        if (!fs.existsSync("./registers/userinfo.reg")) {
            console.log("\nuserinfo.reg not found! creating now...")
    
            rl.question("enter a username: ", (username) => {
                rl.question("enter a password: ", (password) => {
                    fs.writeFile("./registers/userinfo.reg", "_userinfo {\nusername:"+username+"\npassword:"+password+"\n}", (error) => {
                        if (!fs.existsSync("./usr/"+username)) {
                            fs.mkdirSync("./usr/"+username);
                            completedBoot();
                        }
                    })
                });
            });
        } else {
            let userinfo = reg_manager.decompile_reg("userinfo.reg");
    
            rl.question("username: ", (username) => {
                rl.question("password: ", async (password) => {
                    if (username == userinfo.username && password == userinfo.password) {
                        rl.close()
                        completedBoot();
                    } else {
                        await sleep(500);
                        console.log(chalk.red("does not match. aborting..."));
                        rl.close();
                    }
                });
            });
    
        }
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

}

const completedBoot = () => {

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let date = new Date();
    let lastLogin = (date.getMonth()+1)+"/"+(date.getDay())+"/"+(date.getFullYear())+" at "+(date.getHours())+":"+(date.getMinutes())
    let boot_reg = reg_manager.decompile_reg("boot.reg");
    let userinfo_reg = reg_manager.decompile_reg("userinfo.reg");

    reg_manager.set_reg_value("userinfo.reg", "lastLogin", lastLogin)

    console.log("nxt0s: "+boot_reg.version+" - kernel verson: "+boot_reg.kernel_version+" register framework: "+boot_reg.register_version+"\n")
    console.log("last login: "+lastLogin);
    console.log("\n\n")
    input(rl, userinfo_reg);
    
}

const input = (rl, userinfo_reg) => {
    let os_state = reg_manager.decompile_reg("os_state.reg");
    rl.question(userinfo_reg.username+"@nxt0s "+os_state.current_directory+" # ", (command) => {
        if (found_commands[command.split(" ")[0]] != undefined) {
            found_commands[command.split(" ")[0]](command);
            input(rl, userinfo_reg);
        } else {
            console.log("error: command '"+command.split(" ")[0]+"' not found. use 'help' for a list of commands")
            input(rl, userinfo_reg);
        }
    });
}

const xpm_init = () => {

}

run();


