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

       
        stage('Build') {
      steps {
        git branch: "${params.BRANCH}", url: 'https://github.com/jenkinsci/git-parameter-plugin.git'
        sh "echo o nome da branch é: '${params.BRANCH}'"
        script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "541b688a-fad2-499a-9c4d-56c8ffc4cff2",
              nodeFilters: "",
              options: """
                    buildNumber=$BUILD_NUMBER
                    branchName=${params.BRANCH}
               
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
