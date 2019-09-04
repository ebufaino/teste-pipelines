pipeline {
    agent {
      node { 
        label 'dockerdotnet'
      }
    }
          
    stages {
      stage('CheckOut') {
        steps {
          git 'https://github.com/prefeiturasp/SME-NovoSGP.git'
          //sh 'ls -la'
          sh "echo MINHA BRANCH É ${GIT_BRANCH}"
          sh 'printenv'
            
            
        }
      }
      
        
       
     stage('Build projeto') {
       steps {
         sh "echo executando build de projeto"
         sh 'dotnet restore'
       }
     } 
     
     
      
     stage('Testes de integração') {
        steps {
          
          //Execuita os testes gerando um relatorio formato trx
          sh 'dotnet test --logger "trx;LogFileName=TestResults.trx"'
          
          //Publica o relatorio de testes
          mstest()
          
        }
     }
        
      stage('Analise codigo') {
          when {
                branch 'master'
            }
         steps {
             sh 'echo analise sonarqube'
           //sh 'dotnet-sonarscanner begin /k:"SME-NovoSGP" /d:sonar.host.url="http://automation.educacao.intranet:9000" /d:sonar.login="346fd763d9581684b9271a03d8ef5a16fe92622b"'
          // sh 'dotnet build'
           //sh 'dotnet-sonarscanner end /d:sonar.login="346fd763d9581684b9271a03d8ef5a16fe92622b"'
           // anlise de frontend
          // sh 'sonar-scanner \
          //     -Dsonar.projectKey=SME-NovoSGP-WebClient \
          //     -Dsonar.sources=src/SME.SGP.WebClient \
          //     -Dsonar.host.url=http://sonar.sme.prefeitura.sp.gov.br \
          //      -Dsonar.login=1ab3b0eb51a0f51c846c13f2f5a0255fd5d7583e'
         }
       }  
      
      stage('Example Deploy Master') {
            when {
                branch 'master'
            }
            steps {
                input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'admin'
                sh 'echo analise codico sonar aqui'
                sh 'echo Deploying master'
            }
        }
        
        stage('Example Deploy DEV') {
            when {
                branch 'dev'
            }
            steps {
                //input message: 'Deseja realizar o deploy ?', ok: 'SIM', submitter: 'admin'
                sh 'echo analise codico sonar aqui'
                sh 'echo Deploying DEV'
            }
        }
        
       
     
     
     
     
    // stage('Aprovação') {
      //    steps {
      //        timeout(time: 24, unit: "HOURS") {
              
             // withCredentials([string(credentialsId: 'webhook-backend', variable: 'WH-teams')]) {
             // office365ConnectorSend color: '008000', message: "O Build ${BUILD_DISPLAY_NAME} - Requer uma aprovação para deploy !!!", status: 'SUCESSO', webhookUrl: '$WH-teams'
           // }
      //      input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'admin'
     //}
     // }
     // }
      
      // Start JOB Rundeck para build das imagens Docker e push Azure repo
      //stage('Build Images') {
      //  steps {
      //    script {
      //      step([$class: "RundeckNotifier",
      //        includeRundeckLogs: true,
      //        jobId: "397ce3f8-0af7-4d26-b65b-19f09ccf6c82",
      //        nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
       //       rundeckInstance: "Rundeck-SME",
       //       shouldFailTheBuild: true,
       //       shouldWaitForRundeckJob: true,
       //       tags: "",
       //       tailLog: true])
        //   }
       // }
     // }
      
      
      //Start JOB Rundeck para update de imagens no host homologação 
     // stage('Deploy homologaçao') {
        
     //   steps {
     //      sh 'echo DEPLOY HOMOLOG'    
      //   script {
      //      step([$class: "RundeckNotifier",
     //         includeRundeckLogs: true,
     //         jobId: "ec4238e5-4aab-4b5d-b949-aa46d6b2b09d",
     //        nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
     //         rundeckInstance: "Rundeck-SME",
     //         shouldFailTheBuild: true,
     //         shouldWaitForRundeckJob: true,
     //         tags: "",
      //        tailLog: true])
      //     }
      //  }
      //}
}

    
post {
        always {
            //step ([$class: 'MSTestPublisher', testResultsFile:"**/*.trx", failOnError: false, keepLongStdio: true])
            echo 'One way or another, I have finished'
            
            
        }
        success {
           // withCredentials([string(credentialsId: 'webhook-backend', variable: 'WH-teams')]) {
           //   office365ConnectorSend color: '008000', message: "O Build ${BUILD_DISPLAY_NAME} - Esta ok !!!  <${env.BUILD_URL}> ", status: 'SUCESSO', webhookUrl: '$WH-teams'
           // }
            telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Esta ok !!!\nBranch name: ${GIT_BRANCH}\nAuthor: ${GIT_AUTHOR_NAME}\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n\n Uma nova versão da aplicação esta disponivel!!!")
        }
        unstable {
           // withCredentials([string(credentialsId: 'webhook-backend', variable: 'WH-teams')]) {
           //  office365ConnectorSend color: 'ffa500', message: "O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Esta instavel ...Verifique os logs para corrigir o problema'", status: 'INSTAVEL', webhookUrl: '$WH-teams'
           //}
            telegramSend("O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Esta instavel ...\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
        }
        failure {
            // withCredentials([string(credentialsId: 'webhook-backend', variable: 'WH-teams')]) {
            //   office365ConnectorSend color: 'd00000', message: "O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Quebrou. Verifique os logs para corrigir o problema'", status: 'FALHOU', webhookUrl: '$WH-teams'
            // }
             telegramSend("O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Quebrou. \nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
        }
        changed {
             //withCredentials([string(credentialsId: 'webhook-backend', variable: 'WH-teams')]) {
               echo 'Things were different before...'
            // }
        }
       aborted {
             //withCredentials([string(credentialsId: 'webhook-API', variable: 'WHapi-teams')]) {
             //  office365ConnectorSend color: 'd00000', message: "O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Quebrou. Verifique os logs para corrigir o problema'", status: 'FALHOU', webhookUrl: '$WHapi-teams'
             //}
             telegramSend("O Build ${BUILD_DISPLAY_NAME} - Foi abortado.\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
        }
    }
}
