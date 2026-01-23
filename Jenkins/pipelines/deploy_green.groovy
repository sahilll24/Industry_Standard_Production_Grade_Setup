stage("Deploy ${env.NEW_COLOR}") {
    dir("terraform/envs/dev") {
        sh """
        terraform apply -auto-approve \
        -var="deploy_color=${env.NEW_COLOR}"
        """
    }

dir("ansible") {
sh '''
#!/bin/bash
set -e

echo "NEW_COLOR is $NEW_COLOR"

echo "⏳ Waiting for EC2 instances to be registered in SSM..."

for i in {1..30}; do
  COUNT=$(aws ssm describe-instance-information \
    --region ap-south-1 \
    --query "InstanceInformationList[?PingStatus=='Online'] | length(@)" \
    --output text)

  if [ "$COUNT" -gt 0 ]; then
    echo "✅ SSM instances are online"
    break
  fi

  echo "⏳ SSM not ready yet (attempt $i)..."
  sleep 20
done

ansible-inventory -i inventory/aws_ec2.yml --graph
ansible-playbook -i inventory/aws_ec2.yml playbook/deploy.yml
'''
}


}
