stage("Checkout") {
    checkout scm
}

stage("Install Dependencies") {
    parallel(
        "Client": {
            dir("app/Client") {
                sh "npm ci"
            }
        },
        "Server": {
            dir("app/Server") {
                sh "npm ci"
            }
        }
    )
}

stage("SonarQube Analysis") {
    withSonarQubeEnv("sonar-server") {
        sh """
        sonar-scanner \
        -Dproject.settings=sonar-project.properties 
        
        """
    }
}

stage("Quality Gate") {
    timeout(time: 3, unit: 'MINUTES') {
        waitForQualityGate abortPipeline: true
    }
}
stage('Build Docker Images') {
            
                echo "🐳 Building frontend image..."
                sh """
                docker build \
                  -t $DOCKER_REPO/doctor-frontend:${env.BUILD_NUMBER} \
                  -t $DOCKER_REPO/doctor-frontend:latest \
                  -f docker/Client/Dockerfile \
                  app/Client
                """

                echo "🐳 Building backend image..."
                sh """
                docker build \
                  -t $DOCKER_REPO/doctor-backend:${env.BUILD_NUMBER} \
                  -t $DOCKER_REPO/doctor-backend:latest \
                  -f docker/Server/Dockerfile \
                  app/Server
                """
            
        }
stage('Push Docker Images') {
            
                echo "📤 Pushing images to DockerHub..."
                sh """
                echo "$DOCKERHUB_PSW" | docker login -u "$DOCKERHUB_USR" --password-stdin

                docker push $DOCKER_REPO/doctor-frontend:${env.BUILD_NUMBER}
                docker push $DOCKER_REPO/doctor-frontend:latest

                docker push $DOCKER_REPO/doctor-backend:${env.BUILD_NUMBER}
                docker push $DOCKER_REPO/doctor-backend:latest

                docker logout
                """
          
        }