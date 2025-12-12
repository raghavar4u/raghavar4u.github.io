# AWS Deployment Guide

This guide will help you deploy your portfolio website to AWS using different methods.

## Prerequisites

1. **AWS Account**: Ensure you have an active AWS account
2. **AWS CLI**: Install and configure AWS CLI
3. **Domain** (Optional): Purchase a custom domain for professional appearance

## Method 1: S3 Static Website Hosting (Recommended for beginners)

### Step 1: Create S3 Bucket

```bash
# Replace 'your-portfolio-domain' with your desired bucket name
aws s3 mb s3://your-portfolio-domain --region us-east-1
```

### Step 2: Configure Bucket for Static Website Hosting

1. Go to AWS S3 Console
2. Select your bucket
3. Go to Properties tab
4. Enable "Static website hosting"
5. Set Index document: `index.html`
6. Set Error document: `index.html` (for single-page app routing)

### Step 3: Set Bucket Policy for Public Access

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-portfolio-domain/*"
        }
    ]
}
```

### Step 4: Upload Files

```bash
# Navigate to Frontend directory
cd "Frontend"

# Upload all files to S3
aws s3 sync . s3://your-portfolio-domain --delete
```

### Step 5: Access Your Website

Your website will be available at:
`http://your-portfolio-domain.s3-website-us-east-1.amazonaws.com`

## Method 2: CloudFront + S3 (Recommended for production)

### Step 1: Create S3 Bucket (Private)

```bash
aws s3 mb s3://your-portfolio-source --region us-east-1
```

### Step 2: Upload Files

```bash
aws s3 sync Frontend/ s3://your-portfolio-source
```

### Step 3: Create CloudFront Distribution

1. Go to CloudFront Console
2. Create Distribution
3. **Origin Settings:**
   - Origin Domain: Select your S3 bucket
   - Origin Path: Leave empty
   - Origin Access: Use OAC (recommended)

4. **Default Cache Behavior:**
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Allowed HTTP Methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - Cache Policy: Managed-CachingOptimized

5. **Distribution Settings:**
   - Default Root Object: `index.html`
   - Custom Error Pages:
     - Error Code: 404
     - Response Page Path: `/index.html`
     - HTTP Response Code: 200

### Step 4: Configure Custom Domain (Optional)

1. **Request SSL Certificate (ACM):**
   - Go to Certificate Manager
   - Request public certificate
   - Add your domain name
   - Validate via DNS or email

2. **Update CloudFront Distribution:**
   - Add Alternate Domain Names (CNAME)
   - Select your SSL certificate

3. **Update DNS (Route 53 or your DNS provider):**
   - Create CNAME record pointing to CloudFront domain

## Method 3: AWS Amplify (Easiest deployment)

### Step 1: Install Amplify CLI

```bash
npm install -g @aws-amplify/cli
amplify configure
```

### Step 2: Initialize Amplify Project

```bash
# Navigate to your project root
cd "My Portfolio"

amplify init
```

Settings:
- Project name: portfolio
- Environment: prod
- Default editor: Visual Studio Code
- App type: javascript
- Framework: none
- Source directory: Frontend
- Distribution directory: Frontend
- Build command: (leave empty)
- Start command: (leave empty)

### Step 3: Add Hosting

```bash
amplify add hosting
```

Choose:
- Select hosting service: Amazon CloudFront and S3
- Select environment: prod

### Step 4: Deploy

```bash
amplify publish
```

## Domain Configuration with Route 53

### Step 1: Register Domain (if needed)

```bash
# Check domain availability
aws route53domains check-domain-availability --domain-name yourname.com
```

### Step 2: Create Hosted Zone

```bash
aws route53 create-hosted-zone --name yourname.com --caller-reference $(date +%s)
```

### Step 3: Create DNS Records

```bash
# For CloudFront distribution
aws route53 change-resource-record-sets --hosted-zone-id YOUR_ZONE_ID --change-batch '{
  "Changes": [{
    "Action": "CREATE",
    "ResourceRecordSet": {
      "Name": "yourname.com",
      "Type": "A",
      "AliasTarget": {
        "DNSName": "your-cloudfront-domain.cloudfront.net",
        "EvaluateTargetHealth": false,
        "HostedZoneId": "Z2FDTNDATAQYW2"
      }
    }
  }]
}'
```

## Continuous Deployment Setup

### Option 1: GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Sync to S3
      run: |
        aws s3 sync Frontend/ s3://your-portfolio-domain --delete
    
    - name: Invalidate CloudFront
      run: |
        aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Option 2: AWS CodePipeline

1. Create CodeCommit repository
2. Set up CodePipeline with:
   - Source: CodeCommit
   - Build: CodeBuild (optional)
   - Deploy: S3

## Cost Optimization

### S3 Storage Class

For static websites, use:
- **Standard**: For frequently accessed files
- **Standard-IA**: For older versions/backups

### CloudFront Caching

- Set appropriate cache TTL for static assets
- Use compression
- Enable Gzip

### Monitoring and Alerts

```bash
# Create CloudWatch alarm for high bandwidth
aws cloudwatch put-metric-alarm \
  --alarm-name "HighBandwidth" \
  --alarm-description "Alert when bandwidth exceeds limit" \
  --metric-name "BytesDownloaded" \
  --namespace "AWS/CloudFront" \
  --statistic "Sum" \
  --period 3600 \
  --threshold 1000000000 \
  --comparison-operator "GreaterThanThreshold"
```

## Security Best Practices

### 1. Content Security Policy

Add to `index.html` header:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:;">
```

### 2. HTTPS Only

Always redirect HTTP to HTTPS in CloudFront settings.

### 3. Access Logging

Enable CloudFront and S3 access logging for security monitoring.

## Troubleshooting

### Common Issues:

1. **403 Forbidden**: Check bucket policy and public access settings
2. **404 Not Found**: Verify index.html exists and error document is set
3. **SSL Certificate**: Ensure certificate is in us-east-1 region for CloudFront
4. **DNS Issues**: Check CNAME records and propagation

### Debugging Commands:

```bash
# Check S3 bucket contents
aws s3 ls s3://your-portfolio-domain

# Check CloudFront distribution
aws cloudfront list-distributions

# Test website
curl -I https://your-domain.com
```

## Backup Strategy

### Automated Backup Script:

```bash
#!/bin/bash
# backup-portfolio.sh

DATE=$(date +%Y%m%d)
BUCKET_NAME="your-portfolio-domain"
BACKUP_BUCKET="your-portfolio-backups"

# Create backup
aws s3 sync s3://$BUCKET_NAME s3://$BACKUP_BUCKET/$DATE/

echo "Backup completed: $DATE"
```

## Performance Optimization

### 1. Image Optimization

```bash
# Install ImageMagick for batch processing
# Resize and compress images
for img in Data/images/*.jpg; do
  convert "$img" -resize 800x600> -quality 80 "Frontend/assets/$(basename "$img")"
done
```

### 2. Minify CSS/JS (Optional)

```bash
# Install terser for JS minification
npm install -g terser

# Minify JavaScript
terser Frontend/js/script.js -o Frontend/js/script.min.js

# Update HTML to use minified version
```

---

Choose the deployment method that best fits your needs:
- **S3 Static Hosting**: Simple, cost-effective
- **CloudFront + S3**: Professional, with CDN and HTTPS
- **Amplify**: Easiest setup with CI/CD

Remember to replace placeholder values with your actual domain names and resource IDs!