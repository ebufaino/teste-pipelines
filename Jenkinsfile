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
      environment {
        /*
         * Change HOME, because default is usually root dir, and
         * Jenkins user may not have write permissions in that dir.
         */
        HOME = "${WORKSPACE}"
      }
      steps {
            sh 'pwd'
            sh 'node --version'
            sh 'npm --version'
            sh 'npm config list'
          }
          
        }
    
    stage('Build') {
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
      environment {
        /*
         * Change HOME, because default is usually root dir, and
         * Jenkins user may not have write permissions in that dir.
         */
        HOME = "${WORKSPACE}"
      }
      steps {
        sh 'ls -la'
        sh 'npm install'
        sh 'npm build'
      }
    }
    
    }
  post { 
        always { 
            cleanWs()
        }
    }  
    
  }