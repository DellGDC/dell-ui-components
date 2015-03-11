/*jslint node: true */
'use strict';

var pkg = require('./package.json');

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, bower_components, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function(fileTypePatterns) {
  fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
  var ignore = ['node_modules','bower_components','dist','temp'];
  var fs = require('fs');
  return fs.readdirSync(process.cwd())
          .map(function(file){
            if (ignore.indexOf(file) !== -1 ||
                file.indexOf('.') === 0 ||
                !fs.lstatSync(file).isDirectory()) {
              return null;
            } else {
              return fileTypePatterns.map(function(pattern) {
                return file + '/**/' + pattern;
              });
            }
          })
          .filter(function(patterns){
            return patterns;
          })
          .concat(fileTypePatterns);
};

module.exports = function (grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

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
        files: [createFolderGlobs(['*.js','*.less','*.html']),'!_SpecRunner.html','!.grunt'],
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
      before:{
        src:['dist','temp']
      },
      after: {
        src:['temp']
      }
    },
    less: {
      production: {
        options: {
        },
        files: {
          'temp/dell-ui-bootstrap.css': 'theme/dell-ui-bootstrap.less'
        }
      }
    },
    ngtemplates: {
      main: {
        options: {
            module: pkg.name,
            htmlmin:'<%= htmlmin.main.options %>'
        },
        src: [createFolderGlobs('*.html'),'!index.html','!_SpecRunner.html'],
        dest: 'temp/templates.js'
      }
    },
    copy: {
      main: {
        files: [
          {src: ['theme/fonts/*.*'], dest:'dist/fonts/',flatten:true,expand:true},
          {src: ['bower_components/bootstrap/dist/fonts/*.*'], dest:'dist/fonts/',flatten:true,expand:true},
          {src: ['theme/img/*.*'], dest:'dist/img/',flatten:true,expand:true},
          {src: ['temp/dell-ui-bootstrap.css'], dest: 'dist/dell-ui-bootstrap.css'},
          {src: ['demo.html'], dest: 'dist/demo.html'}          
          //{src: ['bower_components/font-awesome/fonts/**'], dest: 'dist/',filter:'isFile',expand:true}
          //{src: ['bower_components/angular-ui-utils/ui-utils-ieshiv.min.js'], dest: 'dist/'},
          //{src: ['bower_components/select2/*.png','bower_components/select2/*.gif'], dest:'dist/css/',flatten:true,expand:true},
          //{src: ['bower_components/angular-mocks/angular-mocks.js'], dest: 'dist/'}
        ]
      }
    },
    dom_munger:{
      read: {
        options: {
          read:[
            {selector:'script[data-concat!="false"]',attribute:'src',writeto:'demojs'},
            {selector:'link[rel="stylesheet"][data-concat!="false"]',attribute:'href',writeto:'delluibootrapcss'}
          ]
        },
        src: 'index.html'
      },
      update: {
        options: {
          remove: ['script[data-remove!="false"]','link[data-remove!="false"]'],
          append: [
            {selector:'body',html:'<script src="demo.min.js"></script>'},
            {selector:'head',html:'<!--[if !IE]><!--><link rel="stylesheet" href="dell-ui-bootstrap.min.css"><![endif]-->'},
            {selector:'head',html:'<!--[if IE]><link rel="stylesheet" href="dell-ui-bootstrap-ie.min.css"><![endif]-->'}
          ]
        },
        src:'index.html',
        dest: 'dist/index.html'
      }
    },
    cssmin: {
      main: {
        src:['temp/dell-ui-bootstrap.css','<%= dom_munger.data.delluibootrapcss %>'],
        dest:'dist/dell-ui-bootstrap.min.css'
      }
    },
    concat: {
      main: {
        src: ['<%= dom_munger.data.demojs %>','<%= ngtemplates.main.dest %>'],
        dest: 'temp/demo.js'
      }
    },
    ngmin: {
      main: {
        src:'temp/demo.js',
        dest: 'temp/demo.js'
      }
    },
    uglify: {
      main: {
        src: 'temp/demo.js',
        dest:'dist/demo.min.js'
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
    bless: {
      css: {
        options: {
          // Task-specific options go here.
        },
        files: {
          'dist/dell-ui-bootstrap-ie.min.css': 'dist/dell-ui-bootstrap.min.css'
        }
      }
    },
    'string-replace': {
        "bsFonts": {
            files: {
                'temp/dell-ui-bootstrap.css': 'temp/dell-ui-bootstrap.css'
            },
            options: {
                replacements: [
                    {
                        pattern: /..\/bower_components\/bootstrap\/dist\/fonts\//ig,
                        replacement: 'fonts\/'
                    }
                ]
            }
        }
    }
  });

  grunt.registerTask('build',['jshint','clean:before','less','string-replace:bsFonts','dom_munger','cssmin','concat','uglify','copy','bless','clean:after']);
  grunt.registerTask('serve', ['dom_munger:read','jshint','connect', 'watch']);
  grunt.registerTask('test',['dom_munger:read','karma:all_tests']);

  grunt.event.on('watch', function(action, filepath) {
    //https://github.com/gruntjs/grunt-contrib-watch/issues/156

    var tasksToRun = [];

    if (filepath.lastIndexOf('.js') !== -1 && filepath.lastIndexOf('.js') === filepath.length - 3) {

      //lint the changed js file
      grunt.config('jshint.main.src', filepath);
      tasksToRun.push('jshint');


    }

    //if index.html changed, we need to reread the <script> tags so our next run of karma
    //will have the correct environment
    if (filepath === 'index.html') {
      tasksToRun.push('dom_munger:read');
    }

    grunt.config('watch.main.tasks',tasksToRun);

  });
};
