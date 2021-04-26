pipeline {
  agent none

  stages {
    stage('NPM install') {
      agent {
        docker {
          /*
           * Reuse the workspace on the agent defined at top-level of
           * Pipeline, but run inside a container.
           */
          reuseNode true
          image 'node:12.16.1'
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
        sh 'env | sort'
        sh 'ls -la'
      }
    }

    stage('Testes API Rest') {
      agent {
        docker {
          /*
           * Reuse the workspace on the agent defined at top-level of
           * Pipeline, but run inside a container.
           */
          reuseNode true
          image 'postman/newman'
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

      }
    }
  } 
}