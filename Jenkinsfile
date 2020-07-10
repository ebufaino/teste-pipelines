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
                sh ''
		sh ''   
            }
       }  
      
       
 } 
  	   
  post {
    always {
      echo 'One way or another, I have finished'
      	    
    }
    success {
      step([$class: 'GitHubCommitStatusSetter'])
    }
    unstable {
      step([$class: 'GitHubCommitStatusSetter'])
    }
    failure {
      step([$class: 'GitHubCommitStatusSetter'])
      step([$class: 'GitHubIssueNotifier', issueAppend: true, issueBody: '', issueLabel: '', issueReopen: true, issueRepo: '', issueTitle: ''])	    
    }
    changed {
      echo 'Things were different before...'
    }
    aborted {
      step([$class: 'GitHubCommitStatusSetter'])
    }
  }
  
}
