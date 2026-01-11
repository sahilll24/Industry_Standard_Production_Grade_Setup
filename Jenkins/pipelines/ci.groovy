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
        -Dproject.settings=sonar-project.properties \
        -Dsonar.login=$SONAR_TOKEN
        """
    }
}

stage("Quality Gate") {
    timeout(time: 3, unit: 'MINUTES') {
        waitForQualityGate abortPipeline: true
    }
}
