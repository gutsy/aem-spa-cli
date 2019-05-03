const mvn = require('maven').create();
const inquirer = require('inquirer');
const ora = require('ora');

module.exports = (args) => {

    console.log('Creating a new AEM SPA project, please answer the following questions:');

    let questions = [
        {
            type: 'input',
            name: 'groupId',
            message: 'Group ID (Maven artifact groupId for all projects):',
            default: function () {
                return 'com.myco';
            }
        },
        {
            type: 'input',
            name: 'artifactId',
            message: 'Artifact ID (Maven artifact "root" artifactId, is suffixed for the individual modules):',
            default: function () {
                return 'example-project';
            }
        },
        {
            type: 'input',
            name: 'version',
            message: 'Starting Maven Version Number:',
            default: function () {
                return '0.0.1-SNAPSHOT';
            }
        },
        {
            type: 'input',
            name: 'projectName',
            message: 'Project Name (Used for building AEM apps path, content path, conf etc. Should not include spaces or special characters):',
            default: function () {
                return 'somethingCool';
            },
            validate: function (value) {
                var pass = value.match('^[a-zA-Z0-9]*$');
                if (pass) {
                    return true;
                }

                return 'Please enter a valid name. Cannot include spaces or special characters';
            }
        },
        {
            type: 'input',
            name: 'package',
            message: 'Package Name:',
            default: function () {
                return 'com.myco.somethingCool';
            }
        },
        {
            type: 'input',
            name: 'projectTitle',
            message: 'Project Title (descriptive project name):',
            default: function () {
                return 'Something Cool';
            }
        },
        {
            type: 'input',
            name: 'componentGroup',
            message: 'Component Group (Name of the component group in AEM Editor):',
            default: function () {
                return 'somethingCool';
            }
        },
        {
            type: 'list',
            name: 'optionFrontend',
            message: 'Front End Framework:',
            choices: ['angular', 'react']
        },
        {
            type: 'confirm',
            name: 'allGood',
            message: 'Review your above selections. Ready to create project?',
            default: function () {
                return false;
            }
        }
    ];

    inquirer.prompt(questions).then(answers => {
        const commands = ['archetype:generate'];
        const defines = {
            'interactiveMode': false,
            'archetypeCatalog': 'remote',
            'archetypeGroupId': 'com.adobe.cq.spa.archetypes',
            'archetypeArtifactId': 'aem-spa-project-archetype',
            'archetypeVersion': '1.0.4',
            'package': answers['package'],
            'groupId': answers['groupId'],
            'artifactId': answers['artifactId'],
            'version': answers['version'],
            'projectTitle': answers['projectTitle'],
            'projectName': answers['projectName'],
            'componentGroup': answers['componentGroup'],
            'optionFrontend': answers['optionFrontend']
        };
        if (answers['allGood']) {
            const spinner = ora('Creating Project').start();
            mvn.execute(commands, defines).then(() => {
                spinner.stop();
            }).catch((error) => {
                console.log(error);
                spinner.stop();
            });
        } else {
            console.log('Exiting project creation...');
        }
    });
};