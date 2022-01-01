const { file } = require("grunt");

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch:{
            html:{
                files: ['src/html/**/*.html'],
                tasks: ['build_tests_html:bp_test']
            },
            dyn:{
                files: ['src/data/**/*.json'],
                tasks: ['build_html_templates']                
            }

        },
        concat:{
            options: {
              separator: '',
            },
            bp_test: {
              src: ['src/html/bp_test/_top.html', 'src/html/bp_test/_bp_test.html', 'src/html/_bot.html'],
              dest: 'public/dev_tests/bp.html',
            },
            menu_test: {
                src: ['src/html/header_test/_top.html', 'src/html/header_test/_menu.html', 'src/html/_bot.html'],
                dest: 'public/dev_tests/menu.html',
            },
            profil_test: {
                src: ['src/html/profil_test/_top.html', 'src/html/profil_test/_profil.html', 'src/html/_bot.html'],
                dest: 'public/dev_tests/profil.html',
            },
        },
    });




    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build_tests_html',"build les fichiers htmls pour démo",function(){
        grunt.log.writeln('build htmls dev test');
 
        grunt.task.run('concat');
    })
    grunt.registerTask('build_html_templates','',function(){
        
        let data = grunt.file.readJSON('src/data/demos/bp_test.json');
        let inFile = grunt.file.read('src/dyn/_top.dyn.html');
        let final_html = grunt.template.process(inFile,{data:data});
        grunt.file.write('src/html/bp_test/_top.html',final_html,{encoding:'UTF-8'});

        data = grunt.file.readJSON('src/data/demos/menu.json');
        inFile = grunt.file.read('src/dyn/_top.dyn.html');
        final_html = grunt.template.process(inFile,{data:data});
        grunt.file.write('src/html/header_test/_top.html',final_html,{encoding:'UTF-8'});

        data = grunt.file.readJSON('src/data/demos/profil.json');
        inFile = grunt.file.read('src/dyn/_top.dyn.html');
        final_html = grunt.template.process(inFile,{data:data});
        grunt.file.write('src/html/profil_test/_top.html',final_html,{encoding:'UTF-8'});
    })
    grunt.registerTask('default', ['watch:html']);
    grunt.registerTask('template', ['watch:dyn']);
};