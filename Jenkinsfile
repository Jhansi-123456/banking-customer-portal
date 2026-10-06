pipeline {
    agent any

    environment {
        IMAGE_NAME = 'banking-customer-portal'
        CONTAINER_NAME = 'banking-customer-portal-test'
        APP_PORT = '3000'
        GIT_CREDENTIALS = 'Github'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: "${GIT_CREDENTIALS}",
                    url: 'https://github.com/Jhansi-123456/banking-customer-portal.git'
            }
        }

        stage('Build') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:build-%BUILD_NUMBER% .'
            }
        }

        stage('Container Verification') {
            steps {
                bat '''
                    docker run -d --name %CONTAINER_NAME% -p 3001:%APP_PORT% %IMAGE_NAME%:build-%BUILD_NUMBER%
                    timeout /t 5 /nobreak
                    curl -f http://localhost:3001/health 
                ''' 
            } 
        } 
 
        stage('Cleanup') { 
            steps { 
                bat ''' 
                    docker stop %CONTAINER_NAME% 
                    docker rm %CONTAINER_NAME% 
                ''' 
            } 
        } 
    } 
}  so this will be my complete jenkins file right?