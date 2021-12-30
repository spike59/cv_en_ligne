module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch:{
            files: ['src/dev_tests/*.html'],
            tasks: ['build_tests_html']
        }
    });


    grunt.registerTask('build_tests_html',"build les fichiers htmls pour démo",function(){
        grunt.log.writeln('build htmls dev test');
    })
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
};