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
                sh 'echo teste homolog'
            }
       }  
      
       
 } 
  	   
  post {
    always {
      echo 'One way or another, I have finished'
    }
    success {
      githubPRStatusPublisher statusMsg: githubPRMessage('${GITHUB_PR_COND_REF} run ended'), statusVerifier: allowRunOnStatus('SUCCESS'), unstableAs: 'SUCCESS'
      
      
    }
    
  }
}
