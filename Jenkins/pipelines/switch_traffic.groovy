stage("Switch Traffic to ${env.NEW_COLOR}") {
    script {

       
        def listenerArn = sh(
            script: "terraform -chdir=terraform/envs/dev output -raw listener_arn",
            returnStdout: true
        ).trim()

        
        def newTgArn = sh(
            script: "terraform -chdir=terraform/envs/dev output -raw ${env.NEW_COLOR}_tg_arn",
            returnStdout: true
        ).trim()

       
        sh """
        aws elbv2 modify-listener \
          --listener-arn ${listenerArn} \
          --default-actions Type=forward,TargetGroupArn=${newTgArn} \
          --region ${AWS_REGION}
        """

        echo "🚦 Traffic successfully switched to ${env.NEW_COLOR.toUpperCase()}"
    }
}
