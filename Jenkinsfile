pipeline {
    agent none
    stages{
        stage('teste postgres'){
        agent { node { label 'master' } }    
            steps {    
              sh 'docker run --rm -p 6666:5432 -e POSTGRES_DB=XXX  -e POSTGRES_PASSWORD=adminadmin -e POSTGRES_USER=admin postgres '
            }    
        }
}
    stages{
        stage('teste python'){
        
          steps {
              agent { node { label 'dockerpython' } }
              sh 'ls -la'
            }   
        }
    
    }
}
