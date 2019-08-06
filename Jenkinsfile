pipeline {
    agent { node { label 'dockerpython' } }
    
    environment {
        POSTGRES_HOST = 'postgres-sme'
        POSTGRES_DB = 'teste'
        POSTGRES_USER = 'admin'
        POSTGRES_PASSWORD = 'adminadmin'
   }
    
    stages{
       stage('CheckOut'){
            
            steps {    
              git branch: 'development', url: 'https://github.com/prefeiturasp/SME-Terceirizadas.git'
              //sh 'ls -la'  
            }    
        }
         stage('start postgres teste'){
        agent { node { label 'master' } }    
            steps {    
              sh 'docker run --rm --name postgres-sme --network python-net -e POSTGRES_DB=teste -e POSTGRES_PASSWORD=adminadmin -e POSTGRES_USER=admin postgres'
            }    
        }
        stage('Prep'){
          agent { node { label 'master' } }    
            steps {    
              //sh 'docker network create python-net'
              //sh 'docker network connect python-net postgres-sme'
               sh 'ls -la'  
            }    
        }
        
        stage('Preparação ambiente') {
            
          steps {
            sh 'pip3 install --no-cache -r requirements/local.txt'    
            sh "echo executar testes"
            sh 'export POSTGRES_HOST=postgres-sme'  
            sh 'export POSTGRES_PORT=5432'
            sh 'export POSTGRES_DB=teste'
            sh 'export POSTGRES_USER=admin'
            sh 'export POSTGRES_PASSWORD=adminadmin'  
            sh 'pytest'
            sh "echo ${POSTGRES_HOST}"  
          }
        }
         stage('Limpeza'){
        agent { node { label 'master' } }    
            steps {    
              sh 'docker container stop postgres-sme'
            }    
        }
    }
     
     
}
