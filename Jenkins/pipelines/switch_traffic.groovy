stage("Switch Traffic to ${env.NEW_COLOR}") {
    sh """
    aws elbv2 modify-listener \
      --listener-arn $(terraform -chdir=terraform/envs/dev output -raw listener_arn) \
      --default-actions Type=forward,TargetGroupArn=$(terraform -chdir=terraform/envs/dev output -raw ${env.NEW_COLOR}_tg_arn) \
      --region ${AWS_REGION}
    """
}
