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
	  step([$class: 'GitHubSetCommitStatusBuilder'])	
	  	
        }
       }

       stage('Analise codigo') {
	     
            steps {    
                sh 'ls -la'
		sleep time: 2, unit: 'MINUTES'
		    
		    
            }
       }  
      
       
 } 
  	   
  post {
    always {
      echo 'One way or another, I have finished'
      	    
    }
    success {
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
