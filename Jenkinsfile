pipeline {
    agent {
            node {
              label 'dockerdotnet'
              //customWorkspace '/some/other/path'
            }
          }
    
    stages {
        stage('CheckOut') {
           steps {
                
                checkout([$class: 'GitSCM', branches: [[name: '**']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'sme-git-user', url: 'https://github.com/ebufaino/teste-pipelines.git']]])
                //script{ 
                //     def branch = sh(script: 'rev=$(git name-rev --name-only HEAD)', returnStdout: true)
                //}     
                //sh 'ls -la'
                sh 'pwd'
                sh 'git status'
                //sh 'git submodule update --init'
                
                
                echo "My branch is: ${env.GIT_BRANCH}"
                
                
               }
        }
        
        
        stage('Build') {
            steps {
                sh 'printenv'
                sh "echo ENTROU NO BUILD"
            }
        }
    
        



       stage('Analise de codigo') {
            steps {
                 //sh 'dotnet-sonarscanner begin /k:"SME-Pedagogico-API-DEV" /d:sonar.host.url="http://automation.educacao.intranet:9000" /d:sonar.login="b5c1bda4c6e9a4cc414d37f3dd9e163cd6e54f92"'
                // sh 'dotnet build'
                 //sh 'dotnet-sonarscanner end /d:sonar.login="d5d0485ee11059d5a9110a9dcce00cb9a098d10b"'
                 sh "echo analise de codigo ook"
                 
            
            }
        }
        
        stage('master-branch-stuff'){
            when{
                branch 'homologacao'
              }
              steps {
                echo 'ENTROU NO TESTE DE BRANCH'
              }
        }
        
    }
    
    
    
}
