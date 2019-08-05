pipeline {
    agent none
    stages{
        stage('teste postgres'){
        agent { node { label 'master' } }    
            steps {    
              sh 'docker run -d --rm --name postgres-sme -p 6666:5432 -e POSTGRES_DB=XXX  -e POSTGRES_PASSWORD=adminadmin -e POSTGRES_USER=admin postgres'
            }    
        }
        stage('CheckOut'){
        agent { node { label 'dockerpython' } }    
            steps {    
              git branch: 'development', url: 'https://github.com/prefeiturasp/SME-Terceirizadas.git'
              sh 'ls -la'  
            }    
        }
        
        stage('Testes') {
          agent { node { label 'dockerpython' } }  
          steps {
            sh 'pip3 install --no-cache -r requirements/local.txt'    
            sh "echo executar testes"            
          }
        }
    }
     
}
