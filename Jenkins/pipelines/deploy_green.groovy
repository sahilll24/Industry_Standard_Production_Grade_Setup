stage("Deploy ${env.NEW_COLOR}") {
    dir("terraform/envs/dev") {
        sh """
        terraform apply -auto-approve \
        -var="deploy_color=${env.NEW_COLOR}"
        """
    }

    dir("ansible") {
sh """
#!/bin/bash
set -e

export AWS_REGION=ap-south-1
export NEW_COLOR=${NEW_COLOR}

echo "⏳ Waiting for EC2 instances to be registered in SSM..."

for i in {1..30}; do
  COUNT=$(aws ssm describe-instance-information \
    --region $AWS_REGION \
    --query "InstanceInformationList[?PingStatus=='Online'] | length(@)" \
    --output text)

  if [ "$COUNT" -gt 0 ]; then
    echo "✅ SSM instances are online"
    break
  fi

  echo "⏳ SSM not ready yet (attempt $i)..."
  sleep 20
done

echo "📦 Inventory after SSM ready:"
ansible-inventory -i inventory/aws_ec2.yml --graph

echo "🚀 Running Ansible deployment"
ansible-playbook -i inventory/aws_ec2.yml playbook/deploy.yml
"""
}

}
