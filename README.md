# Raghavendra Reddy Thummala - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. This static website showcases professional experience, projects, and expertise in Data Engineering and AI/ML.

## 🌟 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Single Page Application**: Smooth tab navigation without page reloads
- **Professional Layout**: Clean, resume-style design suitable for professional use
- **Multiple Sections**: Home, About, Portfolio, Blog, Contact, Resume, and Media
- **Contact Form**: Functional contact form with validation
- **Mobile Menu**: Hamburger menu for mobile navigation
- **Smooth Animations**: CSS transitions and JavaScript animations
- **AWS Ready**: Optimized for static hosting on AWS S3/CloudFront

## 📁 Project Structure

```
My Portfolio/
├── Frontend/               # Main website files
│   ├── index.html         # Main HTML file
│   ├── css/
│   │   └── styles.css     # All CSS styles
│   ├── js/
│   │   └── script.js      # JavaScript functionality
│   └── assets/            # Future assets (icons, etc.)
└── Data/                  # Content and media files
    ├── images/            # Profile photos, project images
    └── documents/         # Resume PDFs, certificates
```

## 🚀 Getting Started

### Local Development

1. **Clone or download** the project to your local machine
2. **Open** `Frontend/index.html` in your web browser
3. **Start editing** content in the HTML file

### Adding Your Content

#### 1. Personal Information
Update the following in `index.html`:
- Name in the navigation logo
- Hero section content
- Contact information

#### 2. Profile Image
- Add your profile image to `Data/images/`
- Replace the profile placeholder in the hero section

#### 3. About Section
- Update professional background
- Add your skills and technologies
- Customize skill categories

#### 4. Projects/Portfolio
- Replace placeholder projects with your actual work
- Add project images to `Data/images/`
- Update technology tags

#### 5. Blog/Articles
- Add your blog posts or articles
- Include publication dates and categories

#### 6. Resume
- Add your resume PDF to `Data/documents/`
- Update the download link in the Resume section

#### 7. Media/YouTube
- Add links to your videos or presentations
- Update media thumbnails and descriptions

## 🎨 Customization

### Colors and Styling
The website uses a professional blue color scheme. To customize:

1. **Primary Colors**: Edit CSS variables in `styles.css`
2. **Fonts**: Change the Google Fonts import in `index.html`
3. **Layout**: Modify grid layouts and spacing in CSS

### Adding New Sections
1. Add new tab in the navigation menu
2. Create corresponding section in the main content
3. Add tab functionality in `script.js`

## 🌐 AWS Hosting Setup

### Option 1: S3 Static Website Hosting

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-portfolio-bucket-name
   ```

2. **Upload Files**
   ```bash
   aws s3 sync Frontend/ s3://your-portfolio-bucket-name
   ```

3. **Configure Static Website**
   - Enable static website hosting in S3 console
   - Set index.html as index document
   - Configure bucket policy for public read access

4. **Custom Domain** (Optional)
   - Configure Route 53 for custom domain
   - Set up CloudFront for HTTPS and CDN

### Option 2: CloudFront + S3

1. **Upload to S3** (private bucket)
2. **Create CloudFront Distribution**
   - Origin: Your S3 bucket
   - Default root object: index.html
   - Custom error pages: 404 → index.html (for SPA routing)

3. **Configure HTTPS**
   - Request SSL certificate via ACM
   - Configure custom domain

### Option 3: AWS Amplify

1. **Initialize Amplify**
   ```bash
   amplify init
   ```

2. **Add Hosting**
   ```bash
   amplify add hosting
   ```

3. **Deploy**
   ```bash
   amplify publish
   ```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 📝 Content Guidelines

### Writing Content
1. **Keep it Professional**: Use formal but approachable tone
2. **Be Specific**: Include concrete examples and metrics
3. **Use Action Words**: Start bullet points with action verbs
4. **Keep it Updated**: Regular update projects and experience

### Image Requirements
- **Profile Photo**: 400x400px, high quality
- **Project Images**: 800x600px recommended
- **Format**: JPG or PNG
- **File Size**: Keep under 1MB for faster loading

### Resume PDF
- **File Size**: Keep under 2MB
- **Format**: PDF only
- **Filename**: Use format "FirstName_LastName_Resume.pdf"

## 🛠️ Development

### Adding Features
1. **New Components**: Add HTML structure, CSS styles, and JS functionality
2. **Testing**: Test on multiple devices and browsers
3. **Performance**: Optimize images and minimize CSS/JS

### Code Structure
- **HTML**: Semantic structure with proper accessibility
- **CSS**: BEM methodology for class naming
- **JavaScript**: Modular approach with ES6+ features

## 🔐 Security Considerations

- No sensitive data in client-side code
- Contact form data handling (implement backend if needed)
- HTTPS enabled for production
- Content Security Policy headers

## 📊 Analytics Setup

1. **Google Analytics**
   - Add tracking code to `index.html`
   - Set up goals and events

2. **Performance Monitoring**
   - Use Lighthouse for performance audits
   - Monitor Core Web Vitals

## 🚀 Deployment Checklist

- [ ] All content updated and reviewed
- [ ] Images optimized and uploaded
- [ ] Contact information verified
- [ ] Links tested and working
- [ ] Responsive design tested
- [ ] Performance optimized
- [ ] Meta tags and SEO configured
- [ ] Analytics tracking implemented
- [ ] Domain and SSL configured
- [ ] Backup strategy in place

## 📞 Support

For questions or issues with this portfolio template:
- Check the browser console for JavaScript errors
- Validate HTML and CSS
- Test responsive design on multiple devices

## 📄 License

This portfolio template is open source and available under the MIT License.

## 🎯 Future Enhancements

- Dark mode toggle
- Blog CMS integration
- Contact form backend
- Search functionality
- Progressive Web App features
- Animation improvements
- Accessibility enhancements

---

**Built with ❤️ for professional portfolio presentation**