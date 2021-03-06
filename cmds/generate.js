const fs = require('fs-extra');
const findRoot = require('find-root');
const path = require('path');
let isAngularProject = false;
let isReactProject = false;
const inquirer = require('inquirer');
const ora = require('ora');
let reactComponentJsText = require('../templates/react/react-component-js');
let aemComponentContentXml = require('../templates/aem/aem-component-content-xml');
let aemComponentEditConfig = require('../templates/aem/aem-component-edit-config');
let aemComponentHtml = require('../templates/aem/aem-component-html');
let aemJava = require('../templates/aem/aem-java');
let aemJavaImpl = require('../templates/aem/aem-java-impl');


module.exports = (args) => {
    let item = args._[1];

    const aemSpaProjectRoot = findRoot(process.cwd(), function (dir) {
        return fs.existsSync(path.resolve(dir, 'ui.apps')) && fs.existsSync(path.resolve(dir, 'ui.content'));
    });

    isAngularProject = fs.existsSync(path.resolve(aemSpaProjectRoot, 'angular-app'));
    isReactProject = fs.existsSync(path.resolve(aemSpaProjectRoot, 'react-app'));


    if (isAngularProject || isReactProject) {
        switch (item) {
            case 'template':
                console.log('going to generate a template');
                generateTemplate(aemSpaProjectRoot, name, projectFolder, componentGroup, resourceType);
                break;

            case 'component':
                console.log('going to generate a component, prepare for questions!');
                componentQuestions(aemSpaProjectRoot);
                break;

            default:
                error(`"${item}" is not a valid item that can be generate!`, true);
                break;
        }
    } else {
        console.log('This is not an AEM SPA project, please run this from inside of an AEM SPA project.');
    }

};


function generateComponent(projectRoot, name, projectFolder, componentGroup, resourceType, javaPackage, spinner, className) {
    if (isReactProject) {

        let aemName = name;
        let aemPath = projectRoot + '/ui.apps/src/main/content/jcr_root/apps/' + projectFolder + '/components/' + aemName;
        let javaRoot = projectRoot + '/core/src/main/java';
        name = name.replace(/^\w/, c => c.toUpperCase());
        let reactComponentPath = projectRoot + '/react-app/src/components/' + name;
        let componentExists = fs.existsSync(path.resolve(projectRoot, projectFolder + '/src/components/' + name));
        if (componentExists) {
            console.log(name + ' component already exists, please create something else');
        } else {

            //TODO ensure project files are outputting at somethingCool/components/content/something
            fs.outputFile(aemPath + '/_cq_editConfig.xml', aemComponentEditConfig.getEditConfig(), function(err) {
                if (err) throw err;
                console.log('Created AEM component edit config');
            });

            fs.outputFile(aemPath + '/.content.xml', aemComponentContentXml.getContentXml(aemName, resourceType, componentGroup), function(err) {
                if (err) throw err;
                console.log('Created AEM component content xml');
            });

            fs.outputFile(reactComponentPath + '/' + name + '.js', reactComponentJsText.getJsContent(name, aemName, projectFolder), function(err) {
                if (err) throw err;
                console.log('Created React component js file');
            });

            fs.outputFile(reactComponentPath + '/' + name + '.css', '', function(err) {
                if (err) throw err;
                console.log('Created React component css file');
            });

            if (javaPackage) {
                //TODO make sure java files have JavaNames
                let packagePath = javaPackage.toString().split('\.').join('\/');
                fs.outputFile(javaRoot + '/' + packagePath + '/' + className + '.java', aemJava.getJava(javaPackage, className), function(err) {
                    if (err) throw err;
                    console.log('Created React component java file at path ' + javaRoot + '/' + packagePath);
                });

                fs.outputFile(javaRoot + '/' + packagePath + '/' + className + 'Impl.java', aemJavaImpl.getJavaImpl(javaPackage, aemName, resourceType, className), function(err) {
                    if (err) throw err;
                    console.log('Created React component java implementation file at path ' + javaRoot + '/' + packagePath);
                });
            }

            fs.appendFile(projectRoot + '/react-app/src/ImportComponents.js', 'require(\'./components/'+ name +'/' + name + '\');', function (err) {
                if (err) throw err;
                console.log('ImportComponents updated');
            });
            spinner.stop();
        }

    } else {
        console.log('angular not implemented yet, please use ng generate');
    }
}

function componentQuestions(projectRoot) {

    let questions = [
        {
            type: 'input',
            name: 'componentName',
            message: 'Component name?',
            default: function () {
                return 'something';
            }
        },
        {
            type: 'input',
            name: 'projectFolder',
            message: 'Project folder (first folder after \'apps\')?',
            default: function () {
                return 'somethingCool';
            }
        },
        {
            type: 'input',
            name: 'secondaryFolder',
            message: 'Secondary nav folder? (folder after \'components\') *optional*',
        },
        {
            type: 'input',
            name: 'resourceType',
            message: 'resource type for this component?',
            default: function () {
                return 'somethingCool/components/content/something';
            }
        },
        {
            type: 'input',
            name: 'componentGroup',
            message: 'Component Group (Name of the component group in AEM Editor):',
            default: function () {
                return 'customComponents';
            }
        },
        {
            type: 'input',
            name: 'package',
            message: 'Package Name if java classes are needed (full package name, i.e. com.my.app.component. leave blank if you don\'t want java classes generated) *optional*',
        },
        {
            type: 'input',
            name: 'className',
            message: 'Java Class name if needed. Will not be used if previous question was left blank',
            default: function () {
                return 'SomethingCool';
            }
        },
        {
            type: 'confirm',
            name: 'allGood',
            message: 'Review your above selections. Ready to generate component?',
            default: function () {
                return false;
            }
        }
    ];

    inquirer.prompt(questions).then(answers => {

        if (answers['allGood']) {
            const spinner = ora('Generating Component').start();

            let name = answers['componentName'];
            let projectFolder = answers['projectFolder'];
            let componentGroup = answers['componentGroup'];
            let resourceType = answers['resourceType'];
            let javaPackage = answers['package'];
            let className = answers['className'];

            generateComponent(projectRoot, name, projectFolder, componentGroup, resourceType, javaPackage, spinner, className);

        } else {
            console.log('Exiting component generation...');
        }
    });
}

function generateTemplate(projectRoot, name) {
    if (isReactProject) {
        console.log('react not implemented yet, please create your own files');
    } else {
        console.log('angular not implemented yet, please use ng generate');
    }

}