module.exports = function(grunt) {
  grunt.initConfig({
    pug: {
      compile: {
        files: {
          'dist/app/templates/index.html': ['src/static/jade/index.jade']
        }
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['app/**', 'run.py'],
            dest: 'dist'
          }
        ]
      },
      boostrap: {
        files: [{
            expand: true,
            cwd: 'node_modules/bootstrap/dist/css',
            src: ['bootstrap.min.*'],
            dest: 'dist/app/static'
          }
        ]
      }
    },
    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/static/script',
          src: '*.js',
          dest: 'dist/app/static'
        }]
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/static/script/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          document: true
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/static/scss',
          src: ['*.scss'],
          dest: 'dist/app/static',
          ext: '.css'
        }]
      }
    },
    watch: {
      files: ['src/**'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('compile',  ['pug']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'copy', 'uglify', 'pug', 'sass']);
};
