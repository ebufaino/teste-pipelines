pipeline {
    agent {
        label 'dockerdotnet2'
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

       stage('Test API Rest') {
        steps {
          withCredentials([file(credentialsId: 'dev-newman-sgp', variable: 'DEVNEWMANSGP')]) {
               sh 'cp $DEVNEWMANSGP testes/Dev.json'
            
               sh 'newman run testes/collection.json -e Dev.json -r junit,html --reporter-junit-export var/reports/newman/junit/newman.xml --reporter-html-export var/reports/newman/html/index.html'

               publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'var/reports/newman/html', reportFiles: 'index.html', reportName: 'Newman API Test', reportTitles: ''])
         }
        }
       }

       
        stage('Build') {
         		
		when { anyOf { branch 'master'; branch "story/*"; branch 'development'; branch 'release';  } }	
        steps {
	     
	      
        script {
	    def BRANCH_REPO = env.BRANCH_NAME.toLowerCase()
	    def BRANCH_NAME = env.BRANCH_NAME	
	    def GIT_URL = sh(returnStdout: true, script: 'git config remote.origin.url').trim()
		
	    	
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
