import Starr from 'commander';

let _mode;

Starr
    .vaersion()
    .action((mode, name) => {
        console.log('this is Starr');
    });


Starr.parse(process.argv);
