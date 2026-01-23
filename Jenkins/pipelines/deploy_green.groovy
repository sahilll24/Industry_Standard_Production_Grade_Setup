stage("Deploy ${env.NEW_COLOR}") {
    dir("terraform/envs/dev") {
        sh """
        terraform apply -auto-approve \
        -var="deploy_color=${env.NEW_COLOR}"
        """
    }

    dir("ansible") {
        sh """
        set -e
        export NEW_COLOR=${env.NEW_COLOR}

        echo "⏳ Waiting for EC2 instances to appear in Ansible inventory..."

        for i in {1..20}; do
          COUNT=\$(ansible-inventory -i inventory/aws_ec2.yml --list | grep instance_id | wc -l)
          if [ "\$COUNT" -gt 0 ]; then
            echo "✅ Inventory ready"
            break
          fi
          echo "Waiting for instances (attempt \$i)..."
          sleep 15
        done

        echo "📦 Final inventory:"
        ansible-inventory -i inventory/aws_ec2.yml --graph

        echo "🚀 Running Ansible deployment"
        ansible-playbook -i inventory/aws_ec2.yml playbook/deploy.yml
        """
    }
}
