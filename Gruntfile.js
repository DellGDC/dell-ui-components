/*jslint node: true */
'use strict';

var pkg = require('./package.json'),
    components = require('./components/components-list.json'),
    currentVersion = pkg.version;

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, bower_components, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function (fileTypePatterns) {
    fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
    var ignore = ['node_modules', 'bower_components', 'dist', 'temp'];
    var fs = require('fs');
    return fs.readdirSync(process.cwd())
        .map(function (file) {
            if (ignore.indexOf(file) !== -1 ||
                file.indexOf('.') === 0 || !fs.lstatSync(file).isDirectory()) {
                return null;
            } else {
                return fileTypePatterns.map(function (pattern) {
                    return file + '/**/' + pattern;
                });
            }
        })
        .filter(function (patterns) {
            return patterns;
        })
        .concat(fileTypePatterns);
};

module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-prompt');
    // Project configuration.
    grunt.initConfig({
        connect: {
            main: {
                options: {
                    port: 9001
                }
            }
        },
        watch: {
            main: {
                options: {
                    livereload: true,
                    livereloadOnError: false,
                    spawn: false
                },
                files: [createFolderGlobs(['*.js', '*.less', '*.html']), '!_SpecRunner.html', '!.grunt'],
                tasks: [] //all the tasks are run dynamically during the watch event handler
            }
        },
        jshint: {
            main: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: createFolderGlobs('*.js')
            }
        },
        clean: {
            before: {
                src: ['dist', 'temp']
            },
            after: {
                src: ['temp']
            }
        },
        less: {
            production: {
                options: {
                },
                files: {
                    'temp/dell-ui-components.css': 'dell-ui-components.less'
                }
            },
            demo: {
                options: {
                },
                files: {
                    'temp/demo.css': 'demo.less'
                }
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module: pkg.name,
                    htmlmin: '<%= htmlmin.main.options %>'
                },
                src: [createFolderGlobs('*.html'), '!index.html', '!_SpecRunner.html'],
                dest: 'temp/templates.js'
            }
        },
        copy: {
            main: {
                files: [
                    {src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'], dest: 'dist/bootstrap/bootstrap.min.js', filter: 'isFile', expand: true},
                    {src: ['temp/dell-ui-components.js'], dest: 'dist/dell-ui-components.js'},
                    {src: ['temp/dell-ui-components.css'], dest: 'dist/dell-ui-components.css'},
                    {src: ['bower_components/dell-ui-bootstrap/dist/**'], dest: 'dist/dell-ui-bootstrap/', filter: 'isFile', expand: true}
                ]
            }
        },
        dom_munger: {
            read: {
                options: {
                    read: [
                        {selector: 'script[data-concat="demoJs"]', attribute: 'src', writeto: 'demoJs'},
                        {selector: 'script[data-concat="dellUiComponentsJs"]', attribute: 'src', writeto: 'dellUiComponentsJs'},
                        {selector: 'link[rel="stylesheet"][data-concat="demoCss"]', attribute: 'href', writeto: 'demoCss'},
                        {selector: 'link[rel="stylesheet"][data-concat="dellUiComponentsCss"]', attribute: 'href', writeto: 'demoCss'}
                    ]
                },
                src: 'index.html'
            },
            update: {
                options: {
                    remove: ['script[data-remove!="false"]', 'link[data-remove!="false"]'],
                    append: [
                        {selector: 'body', html: '<script src="bootstrap/bootstrap.min.js"></script>'},
                        {selector: 'body', html: '<script src="dell-ui-components.min.js"></script>'},
                        {selector: 'body', html: '<script src="demo.min.js"></script>'},
                        {selector: 'head', html: '<link rel="stylesheet" href="dell-ui-bootstrap/dell-ui-bootstrap.min.css">'},
                        {selector: 'head', html: '<link rel="stylesheet" href="dell-ui-components.min.css">'},
                        {selector: 'head', html: '<link rel="stylesheet" href="demo.min.css">'}
                    ]
                },
                src: 'index.html',
                dest: 'dist/index.html'
            }
        },
        cssmin: {
            main: {
                src: ['temp/dell-ui-components.css', '<%= dom_munger.data.dellUiComponentsCss %>'],
                dest: 'dist/dell-ui-components.min.css'
            },
            demo: {
                src: ['temp/demoCss.css', '<%= dom_munger.data.demoCss %>'],
                dest: 'dist/demo.min.css'
            }
        },
        concat: {
            main: {
                src: ['<%= dom_munger.data.dellUiComponentsJs %>', '<%= ngtemplates.main.dest %>'],
                dest: 'temp/dell-ui-components.js'
            },
            demo: {
                src: ['<%= dom_munger.data.demoJs %>', '<%= ngtemplates.main.dest %>'],
                dest: 'temp/demo.js'
            }
        },
        ngmin: {
            main: {
                src: 'temp/dell-ui-components.js',
                dest: 'temp/dell-ui-components.js'
            },
            demo: {
                src: 'temp/demo.js',
                dest: 'temp/demo.js'
            }
        },
        uglify: {
            main: {
                src: 'temp/dell-ui-components.js',
                dest: 'dist/dell-ui-components.min.js'
            },
            demo: {
                src: 'temp/demo.js',
                dest: 'dist/demo.min.js'
            }
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        //Imagemin has issues on Windows.
        //To enable imagemin:
        // - "npm install grunt-contrib-imagemin"
        // - Comment in this section
        // - Add the "imagemin" task after the "htmlmin" task in the build task alias
        // imagemin: {
        //   main:{
        //     files: [{
        //       expand: true, cwd:'dist/',
        //       src:['**/{*.png,*.jpg}'],
        //       dest: 'dist/'
        //     }]
        //   }
        // },
        karma: {
            options: {
                frameworks: ['jasmine'],
                files: [  //this files data is also updated in the watch handler, if updated change there too
                    '<%= dom_munger.data.dellUiComponentsJs %>',
                    'bower_components/angular-mocks/angular-mocks.js',
                    createFolderGlobs('*-spec.js')
                ],
                logLevel: 'ERROR',
                reporters: ['mocha'],
                autoWatch: false, //watching is handled by grunt-contrib-watch
                singleRun: true
            },
            all_tests: {
                browsers: ['PhantomJS', 'Chrome', 'Firefox']
            },
            during_watch: {
                browsers: ['PhantomJS']
            }
        },
        prompt: {
            directive: {
                options: {
                    questions: [
                        {
                            config: 'component',
                            type: 'list',
                            message: 'Which component is this directive for?',
                            default: components[0],
                            choices: components
                        }
                    ]
                }
            },
            externalFile: {
                options: {
                    questions: [
                        {
                            config: 'externalFile',
                            type: 'confirm',
                            message: 'Do you need an external file?',
                            default: "Yes",
                            choices: ["Yes", "No"]
                        }
                    ]
                }

            },
        }
    });


    grunt.registerTask('build', ['jshint', 'clean:before', 'less', 'dom_munger', 'ngtemplates', 'cssmin', 'concat', 'ngmin', 'uglify', 'copy', 'htmlmin', 'clean:after']);
    grunt.registerTask('serve', ['dom_munger:read', 'jshint', 'connect', 'watch']);
    grunt.registerTask('test', ['dom_munger:read', 'karma:all_tests']);
    grunt.registerTask('component', 'Builds a Dell-UI-Component componentt and demo files', function () {
        var hasErrors = false,
            componentsToBuild = this.args,
            _ = require('lodash'),
            componentsTemplates = "templates/component/",
            indexFile = "index.html",
            demoLessFile = "app.less",
            componentsLessFile = "dell-ui-components.less",
            targetPath = "components/",
            LESS_PATTERN = "/* Add Component LESS Above */",
            JS_PATTERN = "<!-- Add New Component JS Above -->",
            componentsListFile = "components/components-list.json",
            componentsList = grunt.file.readJSON(componentsListFile);

        _.str = require('underscore.string');

        if (componentsToBuild.length === 0) {
            grunt.log.error("We are sorry, you need to provide an argument to build a component. \nExample: grunt component:alerts");
            hasErrors = true;
        } else {
            //Work with arguments
            _.each(componentsToBuild, function (component) {

                var dashedId = _.str.dasherize(component);

                grunt.log.writeln("Copying files for " + component + " component");
                if (grunt.file.isDir(targetPath + dashedId)) {
                    grunt.log.error("We are sorry, the component you requested (" + component + ") already exists.");
                    hasErrors = true;
                } else {

                    var camelId = _.str.camelize(component),
                        name = _.str.titleize(component),
                        injectReference = function (fullPath, lineToAdd, pattern) {
                            try {
                                var fileSrc = grunt.file.read(fullPath),
                                    indexOf = fileSrc.indexOf(pattern),
                                    lineStart = fileSrc.substring(0, indexOf).lastIndexOf('\n') + 1,
                                    indent = fileSrc.substring(lineStart, indexOf);

                                fileSrc = fileSrc.substring(0, indexOf) + lineToAdd + "\n" + indent + fileSrc.substring(indexOf);

                                grunt.file.write(fullPath, fileSrc);

                            } catch (e) {
                                grunt.log.error("There was a problem injecting code into " + fullPath);
                                throw e;
                            }
                        },
                        injectContent;

                    //create component less and  demo files
                    grunt.file.recurse(componentsTemplates, function (abspath, rootdir, subdir, filename) {
                        var content = grunt.file.read(abspath),
                            newFilename = filename.replace(/partial/g, dashedId);

                        content = content.replace(/<%= name %>/g, name);
                        content = content.replace(/<%= camelId %>/g, camelId);
                        content = content.replace(/<%= dashedId %>/g, dashedId);
                        grunt.file.write(targetPath + dashedId + "/" + newFilename, content);

                    });

                    grunt.log.writeln("Done copying files for " + component + " component");
                    grunt.log.writeln("Configuring " + component + " component");

                    //push to components list
                    componentsList.push(dashedId);
                    grunt.file.write(componentsListFile, JSON.stringify(componentsList, null, 5));

                    //inject demo less file reference
                    injectContent = '@import "components/' + dashedId + '/demo-' + dashedId + '.less";';
                    injectReference(demoLessFile, injectContent, LESS_PATTERN);

                    //inject component less file reference
                    injectContent = '@import "components/' + dashedId + '/' + dashedId + '.less";';
                    injectReference(componentsLessFile, injectContent, LESS_PATTERN);

                    //inject demo script references
                    injectContent = '<script src="components/' + dashedId + '/demo-' + dashedId + '.js" data-concat="demoJs"></script>';
                    injectReference(indexFile, injectContent, JS_PATTERN);


                    grunt.log.writeln("Done configuring " + component + " component");

                }

            });

        }


        if (hasErrors) {
            return false;
        }
    });


    var directiveId;
    grunt.registerTask('directive', 'Builds a Dell-UI-Component directive', function () {

        var hasErrors = false,
            args = this.args;

        if (args.length === 0) {
            grunt.log.error("We are sorry, you need to provide an argument to build a directive. \nExample: grunt directive:my-custom-alert");
            hasErrors = true;
        } else {
            directiveId = args[0]

            grunt.task.run([
                'prompt:directive',
                'prompt:externalFile',
                'saveDirective'
            ]);

        }

        if (hasErrors) {
            return false;
        }
    });
    grunt.registerTask('saveDirective', 'Builds a Dell-UI-Component directive', function () {

        var component = grunt.config('component'),
            externalFile = grunt.config('externalFile'),
            _ = require('lodash'),
            directiveTemplates = "templates/directive/",
            indexFile = "index.html",
            targetPath = "components/",
            JS_PATTERN = "<!-- Add New Component JS Above -->",
            dashedId,
            camelId,
            name,
            targetJSFilename;

        _.str = require('underscore.string');
        dashedId = _.str.dasherize(directiveId);
        camelId = _.str.camelize(directiveId),
            name = _.str.titleize(directiveId),
            targetJSFilename = targetPath + component + "/directive-" + dashedId + ".js";

        if (grunt.file.exists(targetJSFilename)) {
            grunt.log.error("We are sorry, the directive you requested (" + dashedId + ") already exists.");
            hasErrors = true;
        } else {

            var injectReference = function (fullPath, lineToAdd, pattern) {
                    try {
                        var fileSrc = grunt.file.read(fullPath),
                            indexOf = fileSrc.indexOf(pattern),
                            lineStart = fileSrc.substring(0, indexOf).lastIndexOf('\n') + 1,
                            indent = fileSrc.substring(lineStart, indexOf);

                        fileSrc = fileSrc.substring(0, indexOf) + lineToAdd + "\n" + indent + fileSrc.substring(indexOf);

                        grunt.file.write(fullPath, fileSrc);

                    } catch (e) {
                        grunt.log.error("There was a problem injecting code into " + fullPath);
                        throw e;
                    }
                },
                injectContent;

            //create directive files
            grunt.file.recurse(directiveTemplates, function (abspath, rootdir, subdir, filename) {
                if (!(!externalFile && filename.match('html'))) {
                    var content = grunt.file.read(abspath),
                        newFilename = filename.replace(/directive/g, "directive-" + dashedId);

                    content = content.replace(/<%= name %>/g, name);
                    content = content.replace(/<%= component %>/g, component);
                    content = content.replace(/<%= camelId %>/g, camelId);
                    content = content.replace(/<%= dashedId %>/g, dashedId);
                    grunt.file.write(targetPath + component + "/" + newFilename, content);

                }

            });

            grunt.log.writeln("Done copying files for " + dashedId + " directive");
            grunt.log.writeln("Configuring " + dashedId + " directive");

            //push to components list


            //inject dell-ui-component script references
            injectContent = '<script src="' + targetJSFilename + '" data-concat="dellUiComponentsJs"></script>';
            injectReference(indexFile, injectContent, JS_PATTERN);


            grunt.log.writeln("Done configuring " + component + " component");

        }

    });


    grunt.event.on('watch', function (action, filepath) {
        //https://github.com/gruntjs/grunt-contrib-watch/issues/156

        var tasksToRun = [];

        if (filepath.lastIndexOf('.js') !== -1 && filepath.lastIndexOf('.js') === filepath.length - 3) {

            //lint the changed js file
            grunt.config('jshint.main.src', filepath);
            tasksToRun.push('jshint');

            //find the appropriate unit test for the changed file
            var spec = filepath;
            if (filepath.lastIndexOf('-spec.js') === -1 || filepath.lastIndexOf('-spec.js') !== filepath.length - 8) {
                spec = filepath.substring(0, filepath.length - 3) + '-spec.js';
            }

            //if the spec exists then lets run it
            if (grunt.file.exists(spec)) {
                var files = [].concat(grunt.config('dom_munger.data.dellUiComponentsJs'));
                files.push('bower_components/angular-mocks/angular-mocks.js');
                files.push(spec);
                grunt.config('karma.options.files', files);
                tasksToRun.push('karma:during_watch');
            }
        }

        //if index.html changed, we need to reread the <script> tags so our next run of karma
        //will have the correct environment
        if (filepath === 'index.html') {
            tasksToRun.push('dom_munger:read');
        }

        grunt.config('watch.main.tasks', tasksToRun);

    });
};
