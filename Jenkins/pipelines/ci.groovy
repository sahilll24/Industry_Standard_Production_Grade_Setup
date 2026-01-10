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
    withSonarQubeEnv("sonarqube") {
        sh """
        sonar-scanner \
        -Dsonar.projectKey=doctor-app \
        -Dsonar.sources=app \
        """
    }
}

stage("Quality Gate") {
    timeout(time: 2, unit: 'MINUTES') {
        waitForQualityGate abortPipeline: true
    }
}
