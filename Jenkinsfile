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
		step([$class: 'GitHubSetCommitStatusBuilder'])    
                sh 'ls -la'
		sleep time: 1, unit: 'MINUTES'
		    
		    
            }
       }  
      
       
 } 
  	   
  post {
    always {
      echo 'One way or another, I have finished'
      	    
    }
    success {
      step([$class: 'GitHubCommitStatusSetter'])
      githubPRComment comment: githubPRMessage('Build ${BUILD_NUMBER} ${BUILD_STATUS}'), errorHandler: statusOnPublisherError('FAILURE'), statusVerifier: allowRunOnStatus('FAILURE')	    
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
