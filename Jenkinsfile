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
  	   
  
    githubPRComment {
      comment {content('PR builder ${BUILD_NUMBER} ${BUILD_STATUS}')}
      statusVerifier {buildStatus("FAILURE")}
      errorHandler {buildStatus("UNSTABLE")}
    }
  
}
