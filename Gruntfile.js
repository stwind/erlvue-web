// Generated on 2013-07-18 using generator-webapp 0.2.6
'use strict';
var Path = require('path');
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(Path.resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    templates: 'app/templates',
    components: 'app/bower_components'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      handlebars: {
        files: ['<%= yeoman.templates %>/**/*.hbs'],
        tasks: ['handlebars']
      },
      less: {
        files: ['<%= yeoman.app %>/styles/*.less'],
        tasks: ['less']
      },
      karma: {
        files: ['test/{,spec{,/*}/}*.js'],
        tasks: ['karma:dev:run']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    less: {
      main: {
        options: {
          paths: ['<%= yeoman.app %>/styles']
        },
        files: {
          '.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.less'
        }
      }
    },
    karma: {
      options: {
        frameworks: ['mocha','requirejs'],
        files: [
          { pattern: '<%= yeoman.components %>/**/*.js', served: true, included: false },
          { pattern: '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js', served: true, included: false },
          { pattern: '{.tmp,test}/spec/{,*/}*.js', served: true, included: false },
          'test/test-main.js',
          { pattern: 'test/*.js', served: true, included: false }
        ],
        reporters: ['spec']
      },
      ci: {
        singleRun: true,
        browsers: ['PhantomJS']
      },
      dev: {
        background: true,
        browsers: ['Chrome']
        //browsers: ['PhantomJS']
      }
    },
    handlebars: {
      compile: {
        options: {
          amd: true,
          processName: function (filename) {
            var tmplPath = yeomanConfig.templates + '/';
            return filename.replace(tmplPath, '').replace('.hbs', '');
          },
          processContent: function (content) {
            return content.replace(/^[\r\n]+/, '').replace(/[\r\n]*$/, '');
          }
        },
        files: {
          '.tmp/scripts/templates.js': [
            '<%= yeoman.templates %>/**/*.hbs'
          ]
        }
      }
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          // `name` and `out` is set by grunt-usemin
          baseUrl: yeomanConfig.app + '/scripts',
          optimize: 'none',
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: false,
          useStrict: true,
          wrap: false,
          paths: {
            templates: '../../.tmp/scripts/templates'
          }
          //uglify2: {} // https://github.com/mishoo/UglifyJS2
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: '<%= yeoman.app %>/index.html'
    },
    usemin: {
      options: {
        dirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          //removeCommentsFromCDATA: true,
          ////https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          //collapseBooleanAttributes: true,
          //removeAttributeQuotes: true,
          //removeRedundantAttributes: true,
          //useShortDoctype: true,
          //removeEmptyAttributes: true,
          //removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [ 'generated/*' ]
        }]
      }
    },
    concurrent: {
      server: [ 'coffee:dist', 'less', 'handlebars' ],
      test: [ 'coffee', 'less', 'handlebars' ],
      dist: [ 'coffee', 'less', 'handlebars', 'imagemin', 'svgmin', 'htmlmin' ]
    },
    bower: {
      options: {
        exclude: ['modernizr']
      },
      all: {
        rjsConfig: '<%= yeoman.app %>/scripts/main.js'
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    } else if (target === 'test') {
      return grunt.task.run(['karma:dev', 'watch:karma']);
    }

    grunt.task.run([
     'clean:server',
     'concurrent:server',
     'connect:livereload',
     'open',
     'watch'
    ]);
  });

  grunt.registerTask('test', [
   'clean:server',
   'concurrent:test',
   'karma:ci'
  ]);

  grunt.registerTask('build', [
   'clean:dist',
   'useminPrepare',
   'concurrent:dist',
   'requirejs',
   'concat',
   'cssmin',
   'uglify',
   'copy:dist',
   //'rev',
   'usemin'
  ]);

  grunt.registerTask('default', [
   'jshint',
   'test',
   'build'
  ]);
};
