pipeline {
    agent {
            node {
              label 'dockerdotnet'
              //customWorkspace '/some/other/path'
            }
          }
    
    stages{
        
        stage('Build') {
            steps {
                sh 'printenv'
                sh "echo ENTROU NO BUILD"
                echo "My branch is: ${env.GIT_BRANCH}"
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
            when {
                expression { BRANCH_NAME ==~ /(homologacao|staging)/ }
                anyOf {
                    environment name: 'branch', value: 'homologacao'
                }
            }
              steps {
                echo 'ENTROU NO TESTE DE BRANCH HOMOLOGACAO'
              }
        }
        stage('Deploy PROD'){
            when{
                branch 'origin/master'
              }
              steps {
                echo 'ENTROU NO TESTE DE BRANCH MASTER'
              }
        }
        
    }
    
    
    
}
