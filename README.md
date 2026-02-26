## 🚀 Zero-Downtime Blue-Green Deployment Platform on AWS

Terraform + Jenkins + Ansible + Docker + ALB

Production-grade cloud deployment system implementing health-aware Blue-Green deployment, fully automated CI/CD, and Infrastructure as Code on AWS.

From Git commit → automated build → infrastructure provisioning → health validation → traffic shift → zero downtime.

## 👀 Recruiter Summary (30-Second Read)

✔ Blue-Green deployment using AWS Application Load Balancer
✔ Weighted traffic shifting between environments
✔ Health-check driven production validation
✔ Modular Terraform infrastructure provisioning
✔ Jenkins CI/CD automation pipeline
✔ Ansible-based server configuration
✔ Multi-stage Docker containerization
✔ Fully automated infrastructure lifecycle (including destroy safety)

This project demonstrates how modern DevOps teams deploy safely in production.

## 🧑‍💻 What I Built

A production-ready deployment system that:

Provisions AWS infrastructure using modular Terraform

Automates CI/CD via Jenkins pipeline

Deploys containerized services using Docker

Configures servers using Ansible

Validates deployment using ALB health checks

Switches traffic dynamically between Blue and Green environments

Eliminates downtime during releases

## 🔄 Automation Flow (Actual Implementation)
```text
GitHub Commit
↓
Jenkins Pipeline
├─ Build Docker Images
├─ Push Images to Docker Hub
├─ Terraform Init & Apply
├─ Provision ALB + Target Groups
├─ Detect Active Environment (Blue/Green)
├─ Deploy New Version to Inactive Environment
├─ Health Check Validation
├─ Switch Traffic via Weighted Routing
└─ Cleanup Old Environment
```
Zero manual deployment steps. Fully automated.

## 🏗 Infrastructure as Code (Terraform)
Terraform Highlights

✔ Modular architecture (bootstrap / base / color layers)
✔ Environment isolation (dev setup)
✔ ALB with weighted target group routing
✔ Blue & Green target groups
✔ Remote backend state management
✔ Automated destroy pipeline for cost control

AWS Resources Provisioned

VPC (Virtual Private Cloud)

Subnets (Multi-AZ ready structure)

EC2 Instances

Application Load Balancer

Target Groups (Blue & Green)

Security Groups

IAM Roles

S3 Backend (State Storage)

## ⚙️ CI/CD Automation (Jenkins)
Jenkins Pipeline Stages

Preflight Validation

CI Build & Static Checks

Infrastructure Provisioning

Detect Active Color

Deploy New Version

Health Check Validation

Traffic Switch

Manual Verification Stage

Destroy Safety Stage

Deployment only succeeds if health checks pass.

This ensures production safety.

## 📦 Containerized Architecture
Docker Implementation

✔ Multi-stage build for frontend (React + Nginx)
✔ Backend service isolation (Node.js)
✔ MongoDB containerized
✔ Docker Compose orchestration
✔ Internal service networking

Architecture:

User
→ AWS ALB
→ EC2 (Port 80)
→ Nginx Reverse Proxy
→ Backend API (Port 5000 internal)
→ MongoDB

## 🩺 Health-Aware Deployment

✔ ALB health checks validate new version
✔ Traffic switches only after healthy state
✔ Weighted routing enables gradual transition
✔ Rollback-ready design

Zero downtime achieved through controlled traffic shifting.

## 🔐 Security & Reliability

✔ No direct backend exposure
✔ Reverse proxy pattern via Nginx
✔ Security group isolation
✔ Infrastructure destroy automation to prevent cloud cost leakage
✔ Production-like environment structure

## 🛠 Tech Stack (ATS Optimized)

DevOps & Cloud
Terraform (Modules)
Jenkins (CI/CD Pipeline)
Ansible
AWS (EC2, ALB, VPC, IAM, S3)

Containers
Docker
Docker Compose
Nginx

Application
React
Node.js
MongoDB

## 📈 Why This Project Stands Out

❌ No manual deployments
❌ No downtime during releases
❌ No ad-hoc scripts

✅ Modular Infrastructure as Code
✅ Health-aware deployment validation
✅ Automated traffic switching
✅ Enterprise-style CI/CD pipeline
✅ Production-grade architecture

This reflects real-world cloud deployment practices.

## 🧠 Key Learnings

Designing zero-downtime deployment systems

Implementing weighted traffic routing via ALB

Debugging real-world load balancer & health-check mismatches

Handling container networking & reverse proxy routing

Automating full infrastructure lifecycle

Building production-ready DevOps pipelines

## 🚀 Future Enhancements

HTTPS via AWS ACM

Auto Scaling Group integration

CloudWatch monitoring & alerts

Canary deployment strategy

Multi-environment promotion workflow

## 👤 Author

Sahil Mahesh Saykar
DevOps Engineer

GitHub: https://github.com/sahilll24

LinkedIn: https://www.linkedin.com/in/sahil-saykar-9a11a3264/

## 💬 Recruiter Note

This repository demonstrates a production-grade, health-aware Blue-Green deployment system with full automation — not a basic Docker-on-EC2 setup.

It reflects real DevOps architecture thinking.