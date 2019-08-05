pipeline {
    agent { node { label 'dockerpython' } }
    
    environment {
        env.POSTGRES_HOST = 'postgres-sme'
        env.POSTGRES_DB = 'teste'
        env.POSTGRES_USER = 'admin'
        env.POSTGRES_PASSWORD = 'adminadmin'
        
        
        
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
              sh 'docker run -d --rm --name postgres-sme -e POSTGRES_DB=teste -e POSTGRES_PASSWORD=adminadmin -e POSTGRES_USER=admin postgres'
            }    
        }
        
        stage('Preparação ambiente') {
            
          steps {
            sh 'pip3 install --no-cache -r requirements/local.txt'    
            sh "echo executar testes"
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
