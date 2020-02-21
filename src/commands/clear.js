module.exports = (command) => {
    var exec = require('child_process').exec, child;

    exec('clear', function(error, stdout, stderr) {
        console.log('' + stdout);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}