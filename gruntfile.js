const { file } = require("grunt");

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        structure_data : grunt.file.readJSON('src/data/structure_data.json'),
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
        },
    });




    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build_tests_html',"build les fichiers htmls pour démo",function(){
        grunt.log.writeln('build htmls dev test');
        let concat = grunt.config('concat');
        let structure_data = grunt.config('structure_data');

        for (var i=0;i<structure_data.demos.list.length;i++){
            let current = structure_data.demos.list[i];
            let test = {
                src: ['src/html/' + current.id + '/_top.html', 'src/html/' + current.id + '/_demo_' + current.id + '.html', 'src/html/_bot.html'],
                dest: 'public/dev_tests/' + current.id + '.html',
            }
            concat[current.id] = test;
        }
        let index_build = {
            'src':['src/html/build/_top.html','src/html/build/_header.html'],
            'dest':'public/index3.html'
        }
        for (var i=0;i<structure_data.build.sections.length;i++){
            let current = structure_data.build.sections[i];
            index_build.src.push('src/html/' + current.id + '/_' + current.id + '.html')
        }
        index_build.src.push('src/html/_bot.html');
        concat[index_build]= index_build;

        grunt.config.set('concat',concat);
        grunt.task.run('concat');
    })
    grunt.registerTask('build_html_templates','',function(){

        let structure_data = grunt.config('structure_data');
        
        let demo_links = '';
        for (var i=0;i<structure_data.demos.list.length;i++){
            let current = structure_data.demos.list[i];
            demo_links += '<a href="./dev_tests/' + current.id + '.html">test ' + current.id + '</a>'
            
        }        
        


        for (var i=0;i<structure_data.demos.list.length;i++){
            let current = structure_data.demos.list[i];
            let data = grunt.file.readJSON('src/data/demos/' + current.id + '.json');
            data.origin = "./../";
            data.links = demo_links;
            let topFile = grunt.file.read('src/dyn/_top.dyn.html');
            let top_html = grunt.template.process(topFile,{data:data});
            grunt.file.write('src/html/' + current.id + '/_top.html',top_html,{encoding:'UTF-8'});

            let currentFile = grunt.file.read('src/dyn/_' + current.id + '.dyn.html');
            let current_html = grunt.template.process(currentFile,{data:data});
            grunt.file.write('src/html/' + current.id + '/_demo_' + current.id + '.html',current_html,{encoding:'UTF-8'});                    
        }

        

        //CONSTRUCTION FINALE DEMO
        let demo_data = {
            'links':demo_links
        }
        let demo_index = grunt.file.read('src/dyn/demo.dyn.html');
        let demo_html = grunt.template.process(demo_index,{data:demo_data});
        grunt.file.write('public/demo.html',demo_html,{encoding:'UTF-8'});

        //CONSTRUCTION FINALE DU BUILD
        //le header
        let sections_links = '';
        let header_file = grunt.file.read('src/dyn/_header.dyn.html');
        for (var i=0;i<structure_data.build.sections.length;i++){
            let current = structure_data.build.sections[i];
            sections_links +=  '                    <li><a href="#' + current.id + '" class="section_link">' + current.id + '</a></li>\n';          
        
        }  
        header_data = {
            'origin' : "./",
            'links':sections_links
        }
        let header_html = grunt.template.process(header_file,{data:header_data});
        //header_html += '        <main>\n'
        grunt.file.write('src/html/build/_header.html',header_html,{encoding:'UTF-8'});
        for (var i=0;i<structure_data.build.sections.length;i++){
            let current = structure_data.build.sections[i];
            let currentFile = grunt.file.read('src/dyn/_' + current.id + '.dyn.html');
            let current_html = grunt.template.process(currentFile,{data:header_data});
            grunt.file.write('src/html/' + current.id + '/_' + current.id + '.html',current_html,{encoding:'UTF-8'});
        }  
    })
    grunt.registerTask('default', ['watch:html']);
    grunt.registerTask('template', ['watch:dyn']);
};