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
                
		echo "o nome da branch é: ${BRANCH_NAME}"    
            }
       } 
        
	    stage('Build Docker') {
		    steps {
		    step([$class: 'DockerBuilderPublisher', cleanImages: true, cleanupWithJenkinsJobDelete: false, cloud: 'docker-sme', dockerFileDirectory: '', fromRegistry: [], noCache: true, pushCredentialsId: 'sme-user', pushOnSuccess: true, tagsString: 'registry.sme.prefeitura.sp.gov.br/${BRANCH_NAME/sgp-api:latest'])
		    }			    
	    
	    }
		    
	    
       	    
      
       
 } 
  	   
  
}
