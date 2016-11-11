module.exports = function(grunt) {
  // Do grunt-related things in here
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
	pug: {
	  compile: {
	    options: {
	      data: {
	        debug: false
	      }
	    },
	    files: {
	      'templates/index.html': ['index.jade']
	    }
	  }
	},
	concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['*.js', '!Gruntfile.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', '*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'styles', //need to change to whatever folder will hold sass files
          src: ['*.scss'],
          dest: '../public', //need to change to destination for the css files
          ext: '.css'
        }]
      }
  	}
  });

  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');



  grunt.registerTask('compile',  ['pug']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'pug', 'sass']);



};
