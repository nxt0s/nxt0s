const fs = require("fs");

exports.decompile_reg = (register_name) => {

    const read_register = fs.readFileSync("./registers/"+register_name, "utf8");
    let lines = read_register.split("\n")
    let isOpen = false;
    let register = {
        path: "../registers/"+register_name
    };

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (line.startsWith("_")) {
            isOpen = true;
        }  else if (line.endsWith("}")) {
            isOpen = false;
        } else if (isOpen) {
            let key = line.split(":")[0];
            let value = line.substring(line.indexOf(":")+1);

            register[key] = value;
        }

    }

    return register;

}

exports.set_reg_value = (register_name, key, value) => {
    const read_register = fs.readFileSync("./registers/"+register_name, "utf8");
    let lines = read_register.split("\n")

    lines.forEach((line, i) => {
        if (line.startsWith(key)) {
            lines[i] = key+":"+value
        }
    })

    lines = lines.join("\n")

    fs.writeFile("./registers/"+register_name, lines, (error) => {
        //console.log("login successful")
    });
    
}