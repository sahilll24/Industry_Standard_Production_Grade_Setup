stage("Deploy ${env.NEW_COLOR}") {
    dir("terraform/envs/dev") {
        sh """
        terraform apply -auto-approve \
        -var="deploy_color=${env.NEW_COLOR}"
        """
    }

    dir("ansible") {
        sh """
        export NEW_COLOR=${env.NEW_COLOR}

        echo "⏳ Waiting for EC2 instances to appear in Ansible inventory..."

        for i in {1..15}; do
          COUNT=\$(ansible-inventory -i inventory/aws_ec2.yml --list | grep instance_id | wc -l)
          if [ "\$COUNT" -gt 0 ]; then
            echo "✅ EC2 instances discovered in inventory"
            break
          fi
          echo "Still waiting for instances (attempt \$i)..."
          sleep 20
        done

        echo "📦 Final inventory:"
        ansible-inventory -i inventory/aws_ec2.yml --graph

        echo "🚀 Running Ansible deployment"
        ansible-playbook -i inventory/aws_ec2.yml playbook/deploy.yml
        """
    }
}
