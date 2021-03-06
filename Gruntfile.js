/*global module:false*/
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    pouchdb_bundle: 'pouchdb-browser-6.3.4.js',
    paths: {
      src: 'src',
      src_files: 'src/**/*.js',
      ext_lib: 'lib',
      dist: 'dist',
      dist_debug: 'dist/debug',
      dist_min: 'dist/min',
      dist_bundles: 'dist/bundles',
      dist_bundles_debug: 'dist/bundles-debug',
      node_modules: 'node_modules',
      docs: 'docs',
      config: 'config'
    },
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>'
      }
    },
    clean: {
      all: ['<%= paths.dist_debug %>',
        '<%= paths.dist_min %>',
        '<%= paths.dist_bundles %>',
        '<%= paths.dist_bundles_debug %>',
        '<%= paths.docs %>'],
      bundles_debug: '<%= paths.dist_bundles_debug %>',
      bundles: '<%= paths.dist_bundles %>'
    },
    browserify: {
      pouchDB_browser_bundle: {
        src: ['<%= paths.node_modules %>/pouchdb-browser/lib/index.js'],
        dest: '<%= paths.dist_debug %>/<%= pouchdb_bundle %>',
        options: {
          browserifyOptions: {
            standalone: 'PouchDB'
          }
        }
      }
    },
    requirejs: {
      compileBundles: {
        options: {
          mainConfigFile: 'config/config.js',
          baseUrl: '<%= paths.dist_debug %>',
          modules: [
            {
              name: 'persistenceManager'
            },
            {
              name: 'pouchDBPersistenceStoreFactory',
              include: ['persistenceStoreFactory'],
              excludeShallow: ['impl/logger']
            },
            {
              name: 'localPersistenceStoreFactory',
              include: ['persistenceStoreFactory'],
              excludeShallow: ['impl/logger']
            },
            {
              name: 'fileSystemPersistenceStoreFactory',
              include: ['persistenceStoreFactory'],
              excludeShallow: ['impl/logger', 'persistenceStoreManager']
            },
            {
              name: 'defaultResponseProxy',
              include: ['simpleJsonShredding', 'oracleRestJsonShredding', 'simpleBinaryDataShredding', 'queryHandlers'],
              excludeShallow: ['persistenceUtils', 
                              'impl/logger', 
                              'impl/PersistenceXMLHttpRequest', 
                              'persistenceStoreManager',
                              'impl/defaultCacheHandler',
                              'impl/PersistenceSyncManager',
                              'impl/OfflineCache',
                              'impl/offlineCacheManager',
                              'impl/fetch',
                              'persistenceManager']
            }
          ],
          dir: '<%= paths.dist_bundles %>',
          removeCombined: true
        }
      },
      compileBundles_debug: {
        options: {
          mainConfigFile: 'config/config.js',
          baseUrl: '<%= paths.dist_debug %>',
          modules: [
            {
              name: 'persistenceManager'
            },
            {
              name: 'pouchDBPersistenceStoreFactory',
              include: ['persistenceStoreFactory'],
              excludeShallow: ['impl/logger']
            },
            {
              name: 'localPersistenceStoreFactory',
              include: ['persistenceStoreFactory'],
              excludeShallow: ['impl/logger']
            },
            {
              name: 'fileSystemPersistenceStoreFactory',
              include: ['persistenceStoreFactory'],
              excludeShallow: ['impl/logger', 'persistenceStoreManager']
            },
            {
              name: 'defaultResponseProxy',
              include: ['simpleJsonShredding', 'oracleRestJsonShredding', 'simpleBinaryDataShredding', 'queryHandlers'],
              excludeShallow: ['persistenceUtils', 
                              'impl/logger', 
                              'impl/PersistenceXMLHttpRequest', 
                              'persistenceStoreManager',
                              'impl/defaultCacheHandler',
                              'impl/PersistenceSyncManager',
                              'impl/OfflineCache',
                              'impl/offlineCacheManager',
                              'impl/fetch',
                              'persistenceManager']
            }],
          dir: '<%= paths.dist_bundles_debug %>',
          removeCombined: true,
          optimize: 'none'
        }
      }
    },
    rename: {
      main: {
        files: [
          {
            src: '<%= paths.dist_bundles %>/persistenceManager.js', 
            dest: '<%= paths.dist_bundles %>/offline-persistence-toolkit-core-<%= pkg.version %>.js'
          },
          {
            src: '<%= paths.dist_bundles %>/localPersistenceStoreFactory.js', 
            dest: '<%= paths.dist_bundles %>/offline-persistence-toolkit-localstore-<%= pkg.version %>.js'
          },
          {
            src: '<%= paths.dist_bundles %>/pouchDBPersistenceStoreFactory.js', 
            dest: '<%= paths.dist_bundles %>/offline-persistence-toolkit-pouchdbstore-<%= pkg.version %>.js'
          },
          {
            src: '<%= paths.dist_bundles %>/fileSystemPersistenceStoreFactory.js', 
            dest: '<%= paths.dist_bundles %>/offline-persistence-toolkit-filesystemstore-<%= pkg.version %>.js'
          },
          {
            src: '<%= paths.dist_bundles %>/defaultResponseProxy.js', 
            dest: '<%= paths.dist_bundles %>/offline-persistence-toolkit-responseproxy-<%= pkg.version %>.js'
          },
          {
            src: '<%= paths.dist_bundles_debug %>/persistenceManager.js', 
            dest: '<%= paths.dist_bundles_debug %>/offline-persistence-toolkit-core-<%= pkg.version %>.js'
          },
          {
            src: '<%= paths.dist_bundles_debug %>/localPersistenceStoreFactory.js', 
            dest: '<%= paths.dist_bundles_debug %>/offline-persistence-toolkit-localstore-<%= pkg.version %>.js'
          },
          {
            src: '<%= paths.dist_bundles_debug %>/pouchDBPersistenceStoreFactory.js', 
            dest: '<%= paths.dist_bundles_debug %>/offline-persistence-toolkit-pouchdbstore-<%= pkg.version %>.js'
          },
          {
            src: '<%= paths.dist_bundles_debug %>/fileSystemPersistenceStoreFactory.js', 
            dest: '<%= paths.dist_bundles_debug %>/offline-persistence-toolkit-filesystemstore-<%= pkg.version %>.js'
          },
          {
            src: '<%= paths.dist_bundles_debug %>/defaultResponseProxy.js', 
            dest: '<%= paths.dist_bundles_debug %>/offline-persistence-toolkit-responseproxy-<%= pkg.version %>.js'
          },
          {
            src: 'coverage/dist/debug/require-config-coverage.js', 
            dest: 'coverage/dist/debug/bundles-config.js'
          }
        ]
      }
    },
    'string-replace': {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.config %>',
          src: 'bundles-config.js',
          dest: '<%= paths.dist_debug %>/'
        }],
        options: {
          replacements: [{
            pattern: /\{pkg.version\}/ig,
            replacement: '<%= pkg.version %>'
          }]
        }
      }
    },
    eslint: {
        src: ['<%= paths.src_files %>'],
        options: {
          configFile: "config/.eslintrc.js"
        }
    },
    copy: {
      dist_debug: {
        files: [
          {expand: true,
           cwd: '<%= paths.src %>',
           src: ['*.js', '*/**'],
           dest: '<%= paths.dist_debug %>'}
        ]
      },
      dist_ext_lib: {
        files: [
          {expand: true,
           cwd: '<%= paths.ext_lib %>',
           src: ['*.js'],
           dest: '<%= paths.dist_debug %>'}
        ]
      },
      config_coverage: {
        files: [
          {expand: true,
           cwd: 'config',
           src: 'require-config-coverage.js',
           dest: 'coverage/dist/debug'}
        ]
      },
      test_coverage: {
        files: [
          {expand: true,
           cwd: 'test',
           src: '**',
           dest: 'coverage/test'}
        ]
      },
      lib_coverage: {
        files: [
          {expand: true,
           cwd: 'lib',
           src: '**',
           dest: 'coverage/lib'}
        ]
      },
      dist_bundles_debug: {
        files: [
          {expand: true,
           cwd: '<%= paths.dist_bundles_debug %>',
           src: ['offline*.js', '*/**'],
           dest: '<%= paths.dist_debug %>'}
        ]
      },
      dist_bundles_min: {
        files: [
          {expand: true,
           cwd: '<%= paths.dist_bundles %>',
           src: ['offline*.js', '*/**'],
           dest: '<%= paths.dist_min %>'}
        ]
      },
    },
    jsdoc : {
        dist : {
            src: ['<%= paths.src %>/*.js', 'JSDOC.md'],
            options: {
                destination: '<%= paths.docs %>',
                config: 'config/conf_jsdoc.json'
            }
        }
    },
    uglify: {
      dist: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: '<%= paths.dist_debug %>',
          src: ['*.js', '*/*.js'],
          dest: '<%= paths.dist_min %>'
        }]
      }
    },
    qunit: {
      files: ['test/**/*.html'],
      options: {inject: null}
    },
    run_java: {
      jscover: {
        command: 'java',
        jarName: 'coverage/JSCover-all.jar',
        javaArgs: '-fs dist/debug coverage/dist/debug --no-instrument=impl/fetch.js --no-instrument=<%= pouchdb_bundle %>'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-run-java');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-rename');
  grunt.loadNpmTasks('grunt-string-replace');

  // Default task.
  grunt.registerTask('build', ['clean:all', 'browserify', 'copy:dist_debug', 'copy:dist_ext_lib', 'copy:config_coverage', 'copy:test_coverage', 'copy:lib_coverage', 'eslint', 'requirejs:compileBundles', 'requirejs:compileBundles_debug', 'run_java', 'rename', 'string-replace', 'copy:dist_bundles_debug', 'clean:bundles_debug', 'qunit', 'uglify', 'copy:dist_bundles_min', 'clean:bundles', 'jsdoc']);
};
