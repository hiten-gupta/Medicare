pipeline {
    agent any

    tools {
        maven 'Maven3'
        jdk 'JDK17'
    }

    environment {
        PROJECT_NAME = 'medicare'
    }

    stages {

        stage('📥 Checkout Code') {
            steps {
                echo '========================================='
                echo '  Pulling latest code from GitHub...'
                echo '========================================='
                checkout scm
            }
        }

        stage('🔨 Build Backend') {
            steps {
                echo '========================================='
                echo '  Building Spring Boot JAR...'
                echo '========================================='
                dir('medicare-backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('🐳 Build Docker Images') {
            steps {
                echo '========================================='
                echo '  Building Docker Images...'
                echo '========================================='
                bat 'docker-compose build'
            }
        }

        stage('🚀 Deploy Containers') {
            steps {
                echo '========================================='
                echo '  Starting All Containers...'
                echo '========================================='
                bat 'docker-compose down'
                bat 'docker-compose up -d'
            }
        }

        stage('✅ Verify Deployment') {
            steps {
                echo '========================================='
                echo '  Checking containers are running...'
                echo '========================================='
                bat 'docker ps'
            }
        }
    }

    post {
        success {
            echo '============================================='
            echo '  ✅ BUILD SUCCESSFUL!'
            echo '  Medicare app deployed successfully!'
            echo '============================================='
        }
        failure {
            echo '============================================='
            echo '  ❌ BUILD FAILED!'
            echo '  Check the logs above for errors.'
            echo '============================================='
        }
    }
}