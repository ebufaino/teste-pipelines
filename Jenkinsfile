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
          script {
            BRANCH_REPO = env.BRANCH_NAME.toLowerCase()
            CRED_ID = ${BRANCH_REPO}_NEWMANSGP
          }
          withCredentials([file(credentialsId: 'dev-newman-sgp', variable: 'DEVNEWMANSGP')]) {
               sh 'cp $DEVNEWMANSGP testes/Dev.json'
               sh 'newman run testes/collection.json -e testes/Dev.json -r htmlextra --reporter-htmlextra-export ./results/report.html'
               echo "nome da branch é : ${BRANCH_REPO}"
               echo "O ID é : ${CRED_ID}"
               publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'results', reportFiles: 'report.html', reportName: 'HTML Report', reportTitles: ''])
               
         }
        }
       }

        
 } 
  	   
  
}
