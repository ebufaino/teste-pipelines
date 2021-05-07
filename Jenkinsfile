pipeline {
  agent any

  stages {
    stage('Prepare') {
      agent {
        docker {
          /*
           * Reuse the workspace on the agent defined at top-level of
           * Pipeline, but run inside a container.
           */
          reuseNode true
          image 'node:16-alpine'
        }
      }
      steps {
            
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