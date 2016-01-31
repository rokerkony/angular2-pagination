module.exports = function(grunt) {
     require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var tsOptions = {
        target: 'es5',
        module: 'commonjs',
        sourceMap: true,
        declaration: false,
        noLib: false,
        noImplicitAny: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        DEVELOPMENT_PATH: 'demo/app/',
        SRC_PATH: 'src/',
        PRODUCTION_PATH: 'demo/dist/',

        browserify: {
            //src: {
            //    src: './src/pagination.js',
            //    dest: './src/main.js'
            //},
            demo: {
                src: './demo/app/app.js',
                dest: './demo/app/main.js'
            }
        },
        ts: {
            main: {
                options: tsOptions,
                src: [
                    '<%= DEVELOPMENT_PATH %>' + '**/*.ts',
                    '<%= SRC_PATH %>' + '**/*.ts'
                ],
                dist: '<%= PRODUCTION_PATH %>'
            }
        },
        watch: {
            src: {
                files: [
                    '<%= DEVELOPMENT_PATH %>' + '**/*.ts',
                    '<%= DEVELOPMENT_PATH %>' + '**/*.html',
                    '<%= DEVELOPMENT_PATH %>' + '**/*.css',
                    '<%= SRC_PATH %>' + '**/*.ts',
                    '<%= SRC_PATH %>' + '**/*.html',
                    '<%= SRC_PATH %>' + '**/*.css'
                ],
                tasks: [
                    'ts',
                    'browserify'
                ]
            }
        }
    });
 
    grunt.registerTask('demo', [
        'ts',
        'browserify',
        'watch'
    ]);

    grunt.registerTask('default', function () {
        console.log('!!! NOT ALLOWED !!!\n\nPlease run `grunt demo`.');
    });
};
