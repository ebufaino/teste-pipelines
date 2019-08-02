pipeline {
    agent {
        node {
          label 'master'
        }
    }
    stages {
        stage('teste postgres'){
            steps {    
              sh 'docker run --rm -p 6666:5432 -e POSTGRES_DB=XXX  -e POSTGRES_PASSWORD=adminadmin -e POSTGRES_USER=admin postgres '
            }    
        }
    }
   
    stages {
        stage('CheckOut') {
             agent {
               node {
                label 'dockerpython'
              }
            }
            steps {
            //step([$class: 'WsCleanup'])    
            git branch: 'development', url: 'https://github.com/prefeiturasp/SME-Terceirizadas.git'
         }
      
      
      stage('Testes') {
        steps {
          sh 'pip3 install --no-cache -r requirements/local.txt'    
          sh "echo executar testes"
          //sh 'pytest'
          //sh 'make coverage'
          //sh 'docker-compose down'
            
        }
        //post {
         //   success{
          //  junit 'junit-test.xml'
            //publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'htmlcov', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
       // }
      //}
    } 
      
       
      
      stage('Build') {
        steps {
          
          sh 'ls -la'
          
        }
      }
}


    
post {
        always {
            echo 'One way or another, I have finished'
            deleteDir() /* clean up our workspace */
        }
        success {
            withCredentials([string(credentialsId: 'webhook-teams-gestao', variable: 'WHgestao-Teams')]) {
              echo ' Sucesso !'
              office365ConnectorSend color: '008000', message: "O Build ${BUILD_DISPLAY_NAME} - Esta ok !!!  <${env.BUILD_URL}> ", status: 'SUCESSO', webhookUrl: '$WHgestao-Teams'
             
            }
            telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Esta ok !!!  <${env.BUILD_URL}> ")
        }
        unstable {
            withCredentials([string(credentialsId: 'webhook-teams-gestao', variable: 'WHgestao-Teams')]) {
              echo ' Instavel !!! :/'
              office365ConnectorSend color: 'ffa500', message: "O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Esta instavel ...Verifique os logs para corrigir o problema'", status: 'INSTAVEL', webhookUrl: '$WHgestao-Teams'
            }
            telegramSend("O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Esta instavel ...Verifique os logs para corrigir o problema'")
        }
        failure {
             withCredentials([string(credentialsId: 'webhook-teams-gestao', variable: 'WHgestao-Teams')]) {
               echo ' Falhou!!! :('
               office365ConnectorSend color: 'd00000', message: "O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Quebrou. Verifique os logs para corrigir o problema'", status: 'FALHOU', webhookUrl: '$WHgestao-Teams'
             }
             telegramSend("O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Quebrou. Verifique os logs para corrigir o problema'")
        }
        changed {
             withCredentials([string(credentialsId: 'webhook-teams-gestao', variable: 'WHgestao-Teams')]) {
               echo 'Things were different before...'
             }
        }
    }
}
}
