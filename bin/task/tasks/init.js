var inquirer = require('inquirer'),
    fs = require('fs'),
    path = require('path'),
    utils = require('../../utils/utils'),
    CWD = process.cwd();

require('shelljs/global');

module.exports = function() {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'please input app name: ',
        validate: function(name) {
            if (!name && !name.length) {
                return 'Starr need an app name';
            }

            if (utils.isExists(name)) {
                return 'the project exists, please choose another name.';
            }

            return true;
        }
    }).then(function(app) {
        cp('-R', path.resolve(__dirname, '../../', 'template', 'app/'), path.resolve(CWD, app.name));
        console.log(app.name, ' has been inited!');
    })
}
