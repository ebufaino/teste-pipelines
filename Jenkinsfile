pipeline {
    agent {
        label 'dockerpython'
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

       
        stage('Build') {
         		
		when { anyOf { branch 'master'; branch "story/*"; branch 'development'; branch 'release';  } }	
        steps {
	     
	      
        script {
	    def BRANCH_REPO = env.BRANCH_NAME.toLowerCase()
	    def BRANCH_NAME = env.BRANCH_NAME	
	    def GIT_URL = sh(returnStdout: true, script: 'git config remote.origin.url').trim()
		
	    echo "Utilizando branch $BRANCH_NAME"
            echo "Url: $gitUrl"		
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "541b688a-fad2-499a-9c4d-56c8ffc4cff2",
              nodeFilters: "",
              options: """
                    buildNumber=$BUILD_NUMBER
                    branchName=$BRANCH_NAME
		    gitUrl=$GIT_URL
		    branchRepo=$BRANCH_REPO
               
                   """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
           }
        }
      }    
 } 
  	   
  
}
