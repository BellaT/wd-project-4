module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: [
        'build/js/**/*.js',
        '!build/js/_bower.js'
      ]
    },
    bower_concat: {
      all: {
        dest: {
          'js': 'build/js/_bower.js',
          'css': 'build/scss/_bower.scss'
        },
        mainFiles: {
          bootstrap: [
            'dist/js/bootstrap.js',
            'dist/css/bootstrap.css'
          ]
        },
        dependencies: {
          bootstrap: ["jquery"]
        }
      },
    },
    sass: {
      expanded: {
        options: { outputStyle: 'expanded' },
        files: { 'public/css/style.css': 'build/scss/style.scss' }
      },
      compressed: {
        options: { outputStyle: 'compressed' },
        files: { 'public/css/style.min.css': 'build/scss/style.scss' }
      }
    },
    concat: {
      dist: {
        src: [
          'build/js/_bower.js',
          'build/js/app.js',
          'build/js/**/*.js'
        ],
        dest: 'public/js/app.js'
      }
    },
    uglify: {
      'public/js/app.min.js': 'public/js/app.js'
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js', 'package.json'],
        options: { reload: true }
      },
      scss: {
        files: ['build/scss/**/*.scss'],
        tasks: ['sass'],
        options: { livereload: true }
      },
      js: {
        files: ['build/js/**/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: { livereload: true }
      },
      index: {
        files: ['public/index.html'],
        options: { livereload: true }
      }
    },
    replace: {
      production: {
        options: {
          patterns: [{
            match: /app\.js/,
            replacement: 'app.min.js'
          },{
            match: /style\.css/,
            replacement: 'style.min.css'
          }]
        },
        files: [
          { expand: true, flatten: true, src: ['public/index.html'] }
        ]
      },
      development: {
        options: {
          patterns: [{
            match: /app\.min\.js/,
            replacement: 'app.js'
          },{
            match: /style\.min\.css/,
            replacement: 'style.css'
          }]
        },
        files: [
          { expand: true, flatten: true, src: ['public/index.html'] }
        ]
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'bower_concat', 'sass:expanded', 'concat', 'uglify', 'replace:development', 'watch']);
  grunt.registerTask('deploy', ['jshint', 'bower_concat', 'sass:compressed', 'concat', 'uglify', 'replace:production']);
};
