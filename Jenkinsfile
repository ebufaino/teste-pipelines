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
      step([$class: 'GitHubCommitStatusSetter'])	    
    }
    success {
      step([$class: 'GitHubCommitStatusSetter'])
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
