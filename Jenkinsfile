pipeline {
  agent {
    label 'docker-sme'
  }

  stages {
    stage('Prepare') {
      steps {
            sh 'whoami'
            sh 'node --version'
            sh 'npm --version'
            sh 'npm config list'
          }
          post {
            always {
              updateGitlabCommitStatus name: 'jenkins-build', state: 'running'
            }
          }
        }
    
    stage('Build') {
      steps {
        sh 'ls -la'
        sh 'yarn install'
        sh 'yarn build'
      }
    }
    }
  }