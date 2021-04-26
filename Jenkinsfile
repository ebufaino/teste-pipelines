pipeline {
  agent any

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
          image 'postman/newman:alpine'
          args '--entrypoint=""'
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
        
        withCredentials([file(credentialsId: 'dev-newman-sgp', variable: 'NEWMANSGPDEV')]) {
               sh 'cp $NEWMANSGPDEV testes/Dev.json'
               sh 'newman run testes/collection.json -e testes/Dev.json -r htmlextra --reporter-htmlextra-export ./results/report.html'
               
               
               
               //publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'results', reportFiles: 'report.html', reportName: 'HTML Report', reportTitles: ''])
               
         }

      }
    }
  } 
}