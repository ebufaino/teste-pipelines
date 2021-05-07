pipeline {
  agent {
      docker {
        reuseNode true
        image 'node:16-alpine'
      }
    }

stages {
    stage('Prepare') {
      
       steps {
            sh 'whoami'
            sh 'ls -la'
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
    
    
    
    }
  }
