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
      sh 'echo sucesso'
      githubPRComment comment: githubPRMessage('Build ${BUILD_NUMBER} ${BUILD_STATUS}')
      
      
    }
    
  }
}
