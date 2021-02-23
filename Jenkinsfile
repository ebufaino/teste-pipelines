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
		    environment {
                      TAGNAME = "${GIT_BRANCH.split("/")[1]}"
                    }
		    steps {
			    	    
			    echo "tagname é: ${TAGNAME}"	    
		    	    step([$class: 'DockerBuilderPublisher', cleanImages: true, cleanupWithJenkinsJobDelete: false, cloud: 'docker-sme', dockerFileDirectory: '', fromRegistry: [credentialsId: 'github-new', url: 'registry.sme.prefeitura.sp.gov.br'], noCache: true, pushCredentialsId: '', pushOnSuccess: false, tagsString: '${BUILD_ID}/sgp-api:latest'])
		    }			    
	    
	    }
		    
	    
       	    
      
       
 } 
  	   
  
}
