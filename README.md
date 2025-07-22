# El-Manassa - Multi-Tenant Online Learning Platform

## Overview

El-Manassa is a comprehensive, multi-tenant online learning platform designed specifically for the Egyptian educational market. Built with a headless architecture, it combines WordPress/Tutor LMS backend with custom Flutter mobile and React web frontends, providing a flexible and scalable solution for educational institutions.

## Key Features

### 🏫 Multi-Tenant Architecture
- Complete white-label solution for educational institutions
- Custom domain/subdomain mapping per school
- Isolated data and branding for each tenant
- Centralized platform management

### 👥 Comprehensive User Management
- **Super Admin**: Platform-wide control and monitoring
- **School Admin**: Institution-level management
- **Teachers**: Course creation and student management
- **Students**: Interactive learning experience
- **Parents**: Child progress monitoring portal

### 📚 Flexible Course Delivery Models
- **Subscription-based**: Grade-level access (similar to NajwaClasses)
- **Individual Sales**: Course-by-course purchases (Udemy-style)
- **Hybrid Models**: Combining subscription and individual sales
- **Bundle Offerings**: Subject packages and term-based access

### 💳 Egyptian Payment Integration
- Paymob (card payments)
- Fawry payment network
- Vodafone Cash
- Bank transfers
- Installment plans
- Family discounts

### 📱 Multi-Platform Support
- Native mobile apps (iOS & Android) built with Flutter
- Responsive web application built with React
- Offline content support
- Cross-platform synchronization

### 🌐 Localization
- Full Arabic language support with RTL interface
- Bilingual content management (Arabic/English)
- Egyptian cultural considerations
- Local date/time formats

## Technology Stack

### Backend
- **CMS**: WordPress with Tutor LMS
- **API**: REST API with JWT authentication
- **Database**: MySQL/MariaDB
- **Caching**: Redis
- **File Storage**: S3-compatible object storage

### Frontend
- **Mobile**: Flutter (iOS & Android)
- **Web**: React with TypeScript
- **State Management**: Redux/MobX
- **UI Components**: Material Design / Custom theme

### Infrastructure
- **Hosting**: Cloud-based (AWS/Google Cloud)
- **CDN**: CloudFlare
- **Communication**: Twilio (WhatsApp Business & SMS)
- **Monitoring**: Prometheus & Grafana
- **CI/CD**: GitHub Actions

## Project Structure

```
el-manassa/
├── docs/                    # Documentation
│   ├── api/                # API documentation
│   ├── architecture/       # System architecture docs
│   ├── user-guides/        # User manuals
│   └── deployment/         # Deployment guides
├── backend/                # WordPress backend
│   ├── wordpress/          # WordPress installation
│   ├── api/               # Custom API endpoints
│   └── database/          # Database schemas
├── frontend/              # Frontend applications
│   ├── mobile-flutter/    # Flutter mobile app
│   └── web-react/         # React web app
├── shared/                # Shared resources
│   ├── assets/           # Images, fonts, etc.
│   └── utils/            # Shared utilities
├── scripts/              # Build and deployment scripts
└── tests/                # Test suites
```

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ & npm
- Flutter SDK 3.0+
- PHP 8.0+
- MySQL 8.0+

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/your-org/el-manassa.git
cd el-manassa
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the development environment:
```bash
docker-compose up -d
```

4. Install dependencies:
```bash
# Backend
cd backend && composer install

# Web frontend
cd frontend/web-react && npm install

# Mobile frontend
cd frontend/mobile-flutter && flutter pub get
```

## Implementation Phases

### Phase 1: Foundation (Months 1-2)
- WordPress/Tutor LMS setup
- Authentication system
- Basic API endpoints
- User role structure

### Phase 2: Core Features (Months 3-4)
- Course creation tools
- Quiz system implementation
- Payment gateway integration
- Notification system

### Phase 3: Advanced Features (Months 5-6)
- Live session integration
- Analytics dashboard
- Parent portal
- Advanced assessment tools

### Phase 4: Optimization (Months 7-8)
- Performance optimization
- Security hardening
- UX refinements
- Beta testing

### Phase 5: Launch (Month 9)
- Final testing
- School onboarding
- Marketing preparation
- Go-live

## Contributing

Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is proprietary software. All rights reserved.

## Support

For support, email support@el-manassa.com or join our Slack channel.

## Acknowledgments

- Tutor LMS for the robust LMS foundation
- Flutter team for the excellent mobile framework
- React community for the web framework
- Egyptian EdTech community for valuable insights