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
            sh 'whoami'
            sh 'node --version'
            sh 'npm --version'
            sh 'npm i eslint'
            sh 'npm config list'
          }
          post {
            always {
              updateGitlabCommitStatus name: 'jenkins-build', state: 'running'
            }
          }
        }
    
    stage('Lint and Build') {
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
          parallel {
            // Build > Lint
            stage('Lint') {
              steps {
                // catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE')
                catchError {
                  sh 'npm run eslint -- -f checkstyle -o eslint.xml'
                }
              }
              post {
                always {
                  recordIssues enabledForFailure: true, tools: [esLint(id: 'eslint', name: 'ESlint ', pattern: 'eslint.xml')]
                }
              }
            }
            // Build > Build
            stage('Build') {
              steps {
                sh 'npm run build'
              }
            }
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
        sh 'yarn install'
        sh 'yarn build'
      }
    }
    }
  }
