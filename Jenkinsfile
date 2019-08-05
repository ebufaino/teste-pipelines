pipeline {
    agent { node { label 'dockerpython' } }
    
    environment {
        POSTGRES_HOST = 'postgres-sme'
        
    }
    
    stages{
       stage('CheckOut'){
            
            steps {    
              git branch: 'development', url: 'https://github.com/prefeiturasp/SME-Terceirizadas.git'
              sh 'ls -la'  
            }    
        }
         stage('start postgres teste'){
        agent { node { label 'master' } }    
            steps {    
              sh 'docker run -d --rm --name postgres-sme -p 6666:5432 -e POSTGRES_DB=XXX  -e POSTGRES_PASSWORD=adminadmin -e POSTGRES_USER=admin postgres'
            }    
        }
        
        stage('Preparação ambiente') {
            
          steps {
            sh 'pip3 install --no-cache -r requirements/local.txt'    
            sh "echo executar testes"
            sh 'pytest'  
          }
        }
    }
    post {
        agent { label 'master' }
        always { sh 'docker container stop postgres-sme'}
    }
    
     
}
