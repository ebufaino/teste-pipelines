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
	 when { branch pattern: "story-\\d+", comparator: "REGEXP"}	
         steps {
	      sh "echo o nome da branch é: '$BRANCH_NAME'"
	      
        script {
	    def BRANCH_NAME = BRANCH_NAME.toLowerCase()
		
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "541b688a-fad2-499a-9c4d-56c8ffc4cff2",
              nodeFilters: "",
              options: """
                    buildNumber=$BUILD_NUMBER
                    branchName=$BRANCH_NAME
               
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
