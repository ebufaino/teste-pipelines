pipeline {
  agent {
    node {
      label 'dockerdotnet'
    }

  }
  stages {
    stage('CheckOut') {
      steps {
        checkout scm
        sh "echo MINHA BRANCH É ${GIT_BRANCH}"
        sh 'printenv'
      }
    }
    stage('Build projeto') {
      steps {
        sh 'echo executando build de projeto'
        sh 'dotnet restore'
      }
    }
    stage('Testes de integração') {
      steps {
        sh 'dotnet test --logger "trx;LogFileName=TestResults.trx"'
        mstest()
      }
    }
    stage('Analise codigo') {
      when {
        branch 'master'
      }
      steps {
        sh 'echo Analise SonarQube API'
        sh 'echo Analise SonarQube FRONTEND'
      }
    }
    stage('Deploy Homologação') {
      when {
        branch 'master'
      }
      steps {
        timeout(time: 24, unit: 'HOURS') {
          input(message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'admin')
        }

        sh 'echo analise codico sonar aqui'
        sh 'echo Deploying master'
      }
    }
    stage('Deploy Desenvolvimento') {
      when {
        branch 'dev'
      }
      steps {
        sh 'echo analise codico sonar aqui'
        sh 'echo Deploying DEV'
      }
    }
  }
  post {
    always {
      echo 'One way or another, I have finished'

    }

    success {
      telegramSend "${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Esta ok !!!\nBranch name: ${GIT_BRANCH}\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n\n Uma nova versão da aplicação esta disponivel!!!"

    }

    unstable {
      telegramSend "O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Esta instavel ...\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)"

    }

    failure {
      telegramSend "O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Quebrou. \nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)"

    }

    changed {
      echo 'Things were different before...'

    }

    aborted {
      telegramSend "O Build ${BUILD_DISPLAY_NAME} - Foi abortado.\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)"

    }

  }
}