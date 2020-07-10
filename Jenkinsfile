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
                sh 'ls -la'
		    
            }
       }  
      
       
 } 
  	   
  post {
    always {
      echo 'One way or another, I have finished'
      	    
    }
    success {
      step([$class: 'GitHubCommitStatusSetter'])
      githubPRComment comment: githubPRMessage('Build ${BUILD_NUMBER} ${BUILD_STATUS}')	    
    }
    unstable {
      step([$class: 'GitHubCommitStatusSetter'])
      githubPRComment comment: githubPRMessage('Build ${BUILD_NUMBER} ${BUILD_STATUS}')	    
    }
    failure {
      step([$class: 'GitHubCommitStatusSetter'])
      githubPRComment comment: githubPRMessage('Build ${BUILD_NUMBER} ${BUILD_STATUS}')    
    }
    changed {
      echo 'Things were different before...'
    }
    aborted {
      step([$class: 'GitHubCommitStatusSetter'])
    }
  }
  
}
