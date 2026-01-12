timeout(time: 30, unit: 'MINUTES') {
    input message: '''
🚀 Deployment is LIVE

Take screenshots of:
✔ Jenkins pipeline
✔ EC2 instances
✔ ALB target group (Healthy)
✔ /health endpoint response
✔ Blue-Green switch

Click "Proceed" once done.
'''
}
