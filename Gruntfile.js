module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less:{
            development:{ // Config. debtro do ambiente do desenvolvedor
                files:{
                    'dev/styles/main.css': 'src/styles/main.less' // arquivo final : origem
                }
            },
            production: { //config do ambiente de produção
                options:{
                    compress:true, //minificar o arquivo
                },
                files:{
                    'dist/styles/main.min.css': 'src/styles/main.less' // arquivo final minificado e origem
                }

            }
        },
        watch:{
            less: {
                // * * para qualquer pasta
                // * para qualquer arquivo
                files:['src/styles/**/*.less'],
                tasks:['less:development']
            },
            html:{
                files: ['src/index.html'],
                tasks:['replace:dev']
            }
        },
        replace:{
            dev:{
                options:{
                    patterns:[
                        {
                            match: 'ADRESS_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ADRESS_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files:[
                    {
                        expand: true,
                        flatten:true,
                        src:['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist:{
                options:{
                    patterns:[
                        {
                            match: 'ADRESS_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ADRESS_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files:[
                    {
                        expand: true,
                        flatten:true,
                        src:['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                    //pré-build

                    'prebuild/index.html': 'src/index.html'
                    //1 - minificação

                    //2 - substituição
                }
            }
        },
        clean:['prebuild'],
        uglify:{
            target:{
                files:{
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }

    })
    //para poder utilizar o plugin devemos carregá-lo
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    

    // Criamos tarefa default
    // Dentro do Array passamos as tarefas a serem executadas
   
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);


}