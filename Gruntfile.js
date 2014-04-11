// Generated on 2014-04-03 using generator-angular-component 0.2.3
'use strict';

module.exports = function (grunt) {

    // Configurable paths
    var yoConfig = {
        livereload: 35729,
        src: 'src',
        dist: 'dist'
    };

    // Livereload setup
    var lrSnippet = require('connect-livereload')({port: yoConfig.livereload});
    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yo: yoConfig,
        meta: {
            banner: '/**\n' +
                ' * <%= pkg.name %>\n' +
                ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * @link <%= pkg.homepage %>\n' +
                ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
                ' */\n',
            module: 'angular.module("quark.tab", ["quark.tab.module"]);',
            all: 'angular.module("quark.tab", ["quark.tab.template","quark.tab.module"]);'
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yo.dist %>/*',
                            '!<%= yo.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            less: {
                files: ['<%= yo.src %>/{,*/}*.less'],
                tasks: ['less:dist']
            },
            app: {
                files: [
                    '<%= yo.src %>/{,*/}*.html',
                    '{.tmp,<%= yo.src %>}/{,*/}*.css',
                    '{.tmp,<%= yo.src %>}/{,*/}*.js'
                ],
                options: {
                    livereload: yoConfig.livereload
                }
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0' // Change this to '0.0.0.0' to access the server from outside.
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yoConfig.src)
                        ];
                    }
                }
            }
        },
        less: {
            options: {
                // dumpLineNumbers: 'all',
                paths: ['<%= yo.src %>']
            },
            dist: {
                files: {
                    '<%= yo.src %>/<%= yo.name %>.css': '<%= yo.src %>/<%= yo.name %>.less'
                }
            }
        },
        jshint: {
            src: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['<%= yo.src %>/{,*/}*.js']
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS']
            },
            unit: {
                singleRun: true
            },
            server: {
                autoWatch: true
            }
        },
        ngmin: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: ['<%= yo.dist %>/<%= pkg.name %>.js'],
                dest: '<%= yo.dist %>/<%= pkg.name %>.js'
            }
        },
        concat: {
            options: {
                stripBanners: true
            },
            dist: {
                options: {
                    banner: '<%= meta.banner %><%= meta.module %>',
                },
                src: ['<%= yo.src %>/<%= pkg.name %>.js'],
                dest: '<%= yo.dist %>/<%= pkg.name %>.js'
            },
            tpl: {
                options: {
                    banner: '<%= meta.banner %><%= meta.all %>',
                },
                src: ['<%= yo.dist %>/<%= pkg.name %>.tpl.js','<%= yo.src %>/<%= pkg.name %>.js'],
                dest: '<%= yo.dist %>/<%= pkg.name %>.tpl.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= yo.dist %>/<%= pkg.name %>.min.js'
            },
            tpl: {
                src: '<%= yo.dist %>/<%= pkg.name %>.tpl.js',
                dest: '<%= yo.dist %>/<%= pkg.name %>.tpl.min.js'
            }
        },
        html2js: {
            options: {
                module: "quark.tab.template",
                base: "<%= yo.src %>/../"
            },
            product: {
                src: ['<%= yo.src %>/*.html'],
                dest: '<%= yo.dist %>/angular-tab.tpl.js'
            }
        }
    });

    grunt.registerTask('test', [
//        'jshint',
        'karma:unit'
    ]);

    grunt.registerTask('dev', [
        'build'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'html2js',
        'concat',
        'less:dist',
        'ngmin:dist',
        'uglify'
    ]);



    grunt.registerTask('default', ['build']);

};
