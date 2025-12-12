# Portfolio Deployment Guide

This guide covers deploying your portfolio using **GitHub Pages** and **AWS**.

---

## Option 1: Deploy to GitHub Pages

### Prerequisites:
- GitHub account
- Git installed on your computer
- Your portfolio files ready

### Step-by-Step Instructions:

#### 1. **Create a GitHub Repository**
```bash
# Go to https://github.com/new
# Create a new repository named: <your-username>.github.io
# Example: raghavendra-thummala.github.io
```

#### 2. **Initialize Git in Your Project**
```powershell
# Navigate to your portfolio directory
cd "C:\Users\raghavendra.thummala\Desktop\My Porfolio"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial portfolio commit"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### 3. **Enable GitHub Pages**
- Go to your repository on GitHub
- Click **Settings** → **Pages**
- Under "Source", select **main** branch
- Click **Save**

#### 4. **Access Your Portfolio**
Your portfolio will be live at: `https://YOUR-USERNAME.github.io`

#### 5. **Update Your Portfolio**
Simply make changes locally and push:
```powershell
git add .
git commit -m "Update: describe your changes"
git push
```

### GitHub Pages Advantages:
✅ Free hosting
✅ Automatic HTTPS
✅ No server management
✅ Easy to update (just push to git)
✅ Custom domain support

### GitHub Pages Limitations:
⚠️ Static sites only (no backend)
⚠️ Limited to 1GB repository size
⚠️ Build time limits for automated deployments

---

## Option 2: Deploy to AWS

### Prerequisites:
- AWS account (with free tier or paid plan)
- AWS CLI installed
- Your portfolio files ready

### Two AWS Deployment Methods:

### Method A: AWS S3 + CloudFront (Recommended)

#### Step 1: **Create an S3 Bucket**
```powershell
# Install AWS CLI (if not already installed)
# Download from: https://aws.amazon.com/cli/

# Configure AWS credentials
aws configure
# Enter your Access Key ID
# Enter your Secret Access Key
# Enter default region: us-east-1
# Enter output format: json

# Create S3 bucket for your portfolio
aws s3 mb s3://raghavendra-portfolio --region us-east-1
```

#### Step 2: **Upload Files to S3**
```powershell
# Navigate to your portfolio directory
cd "C:\Users\raghavendra.thummala\Desktop\My Porfolio\Frontend"

# Sync your portfolio to S3
aws s3 sync . s3://raghavendra-portfolio --delete

# Make files public (optional, or use bucket policy)
aws s3 cp s3://raghavendra-portfolio s3://raghavendra-portfolio --recursive --acl public-read
```

#### Step 3: **Enable Static Website Hosting**
```powershell
# Configure S3 bucket for static hosting
aws s3 website s3://raghavendra-portfolio --index-document index.html --error-document index.html
```

#### Step 4: **Add Bucket Policy (Make it Public)**
```powershell
# Create a file named bucket-policy.json:
# (Save this in your portfolio directory)
```

**bucket-policy.json:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::raghavendra-portfolio/*"
    }
  ]
}
```

```powershell
# Apply the policy
aws s3api put-bucket-policy --bucket raghavendra-portfolio --policy file://bucket-policy.json
```

#### Step 5: **Create CloudFront Distribution (Optional but Recommended)**
```powershell
# Go to AWS Console:
# 1. CloudFront → Create distribution
# 2. Origin domain: raghavendra-portfolio.s3.amazonaws.com
# 3. Default root object: index.html
# 4. Create distribution
# Note the distribution domain name
```

Your portfolio will be accessible at:
- S3 Website: `http://raghavendra-portfolio.s3-website-us-east-1.amazonaws.com`
- CloudFront: `https://d123456.cloudfront.net` (your distribution domain)

#### Step 6: **Update Your Portfolio**
```powershell
# After making changes locally:
cd "C:\Users\raghavendra.thummala\Desktop\My Porfolio\Frontend"
aws s3 sync . s3://raghavendra-portfolio --delete

# Invalidate CloudFront cache (if using CloudFront)
aws cloudfront create-invalidation --distribution-id YOUR-DISTRIBUTION-ID --paths "/*"
```

### Method B: AWS Amplify (Easiest with GitHub Integration)

#### Step 1: **Connect GitHub**
- Go to AWS Amplify Console
- Click "Connect app" → Select GitHub
- Authorize AWS
- Select your portfolio repository

#### Step 2: **Configure Build Settings**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - echo "Building portfolio"
    build:
      commands:
        - echo "Portfolio is ready"
  artifacts:
    baseDirectory: Frontend
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

#### Step 3: **Deploy**
- Click "Deploy"
- Your portfolio will be live at a unique Amplify URL
- Auto-deploys on every git push!

### AWS S3 + CloudFront Advantages:
✅ Reliable and scalable
✅ HTTPS support via CloudFront
✅ Global CDN for fast loading
✅ Pay only for what you use
✅ Excellent for static sites

### AWS S3 + CloudFront Costs:
- S3 Storage: ~$0.023 per GB/month
- CloudFront: ~$0.085 per GB (varies by region)
- Estimated: ~$2-10/month for typical portfolio

### AWS Amplify Advantages:
✅ Easiest setup
✅ Automatic deployments
✅ Free tier available (up to 15GB)
✅ Integrated with GitHub

---

## Comparison Table

| Feature | GitHub Pages | AWS S3 | AWS Amplify |
|---------|-------------|--------|------------|
| **Cost** | Free | $2-10/month | Free tier / $0.15/GB |
| **Setup Difficulty** | Easy | Medium | Easy |
| **Performance** | Good | Excellent (with CDN) | Excellent |
| **HTTPS** | Free | Free (CloudFront) | Free |
| **Custom Domain** | Yes | Yes | Yes |
| **Auto-Deploy** | Via Git Push | Manual | Via Git Push |
| **Backend Support** | No | No | Yes (Lambda) |

---

## Recommended Path

**For Your Portfolio:**
1. **Start with GitHub Pages** - Easiest, free, and perfect for static portfolios
2. **Later upgrade to AWS Amplify** - If you need more features or better performance
3. **Use AWS S3 + CloudFront** - If you need enterprise-grade infrastructure

---

## Quick Start Command Summary

### GitHub Pages:
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

### AWS S3:
```powershell
aws s3 mb s3://raghavendra-portfolio
aws s3 sync Frontend s3://raghavendra-portfolio --delete
aws s3 website s3://raghavendra-portfolio --index-document index.html
```

### AWS Amplify:
```
1. Go to AWS Amplify Console
2. Connect GitHub repository
3. Click Deploy
```

---

## Next Steps

Choose your preferred deployment method and let me know if you need help with:
- Setting up Git and GitHub
- Configuring AWS credentials
- Custom domain setup
- SSL certificates
- Performance optimization

Good luck! 🚀
