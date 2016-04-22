var inquirer = require('inquirer'),
    fs = require('fs'),
    path = require('path'),
    task = require('../task'),
    CWD = process.cwd();

var menu = [{
    type: 'list',
    name: 'task',
    message: 'please choose a service: ',
    choices: [
        {
            name: 'init project',
            value: 'init'
        },
        {
            name: 'run project',
            value: 'start'
        }
    ]
}];

function _help() {
    inquirer.prompt(menu).then(function( choice ){
        task[choice.task]();
    });
}

module.exports = {
    help: _help
}
