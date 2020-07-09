pipeline {
    agent {
      node { 
        label 'py-uniformes'
	    }
    }
    
    options {
      buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
      disableConcurrentBuilds()
      skipDefaultCheckout()  
    }
        
    stages {
       stage('CheckOut') {
        steps {
          checkout scm	
	  	
        }
       }

       stage('Analise codigo') {
	     
            steps {
                step([$class: 'GitHubCommitStatusSetter'])
            }
       }  
      
       
 } 
  	   
  post {
    always {
      echo 'One way or another, I have finished'
      	    
    }
    success {
      step([$class: 'GitHubCommitStatusSetter', errorHandlers: [[$class: 'ChangingBuildStatusErrorHandler', result: '']], reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/ebufaino/teste-pipelines.git']])
    }
    unstable {
      step([$class: 'GitHubCommitStatusSetter'])
    }
    failure {
      step([$class: 'GitHubCommitStatusSetter'])
    }
    changed {
      echo 'Things were different before...'
    }
    aborted {
      step([$class: 'GitHubCommitStatusSetter'])
    }
  }
  
}
