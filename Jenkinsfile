pipeline {
    agent none
    stages{
        stage('teste postgres'){
        agent { node { label 'master' } }    
            steps {    
              sh 'docker run -d --rm -p 6666:5432 -e POSTGRES_DB=XXX  -e POSTGRES_PASSWORD=adminadmin -e POSTGRES_USER=admin postgres'
            }    
        }
        stage('teste python'){
        agent { node { label 'dockerpython' } }    
            steps {    
              sh 'ls -la'
            }    
        }
    }
}
