# El-Manassa Technical Architecture

## System Overview

El-Manassa follows a headless architecture pattern, separating the content management backend from the presentation layer. This approach provides maximum flexibility, scalability, and allows for native mobile and web experiences.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Client Layer                               │
├─────────────────────┬─────────────────────┬────────────────────────┤
│   Flutter Mobile    │    React Web App    │    Parent Portal       │
│   (iOS/Android)     │    (Teachers)       │    (React)            │
└──────────┬──────────┴──────────┬──────────┴────────────┬──────────┘
           │                     │                        │
           └─────────────────────┼────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────────┐
│                          API Gateway                                 │
│                    (Rate Limiting, Auth, Routing)                   │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────────────┐
│                        Application Layer                             │
├─────────────────┬─────────────────┬─────────────────┬──────────────┤
│  WordPress API  │  Custom APIs    │  Payment Service │ Notification │
│  (Tutor LMS)    │  (Business)     │  (Paymob/Fawry) │  Service     │
└────────┬────────┴────────┬────────┴────────┬────────┴──────┬───────┘
         │                 │                  │               │
┌────────┴─────────────────┴──────────────────┴───────────────┴───────┐
│                         Data Layer                                   │
├──────────────┬──────────────┬──────────────┬───────────────────────┤
│   MySQL DB   │    Redis     │  File Storage │   Message Queue      │
│  (Primary)   │   (Cache)    │     (S3)      │   (RabbitMQ)       │
└──────────────┴──────────────┴──────────────┴───────────────────────┘
```

## Core Components

### 1. Client Applications

#### Flutter Mobile App
- **Purpose**: Native mobile experience for students
- **Key Features**:
  - Offline content support
  - Push notifications
  - Biometric authentication
  - Native video player
  - Background downloads
- **State Management**: Riverpod/Bloc
- **Local Storage**: SQLite + Hive

#### React Web Application
- **Purpose**: Teacher dashboard and course management
- **Key Features**:
  - Rich content editor
  - Real-time analytics
  - Live session management
  - Bulk operations
- **State Management**: Redux Toolkit
- **UI Framework**: Material-UI or Ant Design

#### Parent Portal
- **Purpose**: Child monitoring and communication
- **Key Features**:
  - Progress tracking
  - Payment management
  - Teacher communication
  - Report generation

### 2. API Layer

#### API Gateway
- **Technology**: Kong or AWS API Gateway
- **Responsibilities**:
  - Request routing
  - Rate limiting
  - Authentication validation
  - Request/response transformation
  - API versioning

#### WordPress REST API
- **Extended Endpoints**:
  ```
  /wp-json/tutor/v1/courses
  /wp-json/tutor/v1/lessons
  /wp-json/tutor/v1/quizzes
  /wp-json/tutor/v1/enrollments
  ```

#### Custom Business APIs
- **Technology**: Node.js/Express or PHP Slim
- **Endpoints**:
  ```
  /api/v1/schools
  /api/v1/subscriptions
  /api/v1/payments
  /api/v1/analytics
  /api/v1/communications
  ```

### 3. Service Layer

#### Authentication Service
- **JWT Token Management**
- **OAuth2 Support**
- **Multi-factor Authentication**
- **Session Management**
- **Role-based Access Control**

#### Payment Service
- **Payment Gateway Abstraction**
- **Transaction Management**
- **Webhook Handling**
- **Refund Processing**
- **Invoice Generation**

#### Notification Service
- **Multi-channel Delivery**:
  - WhatsApp (Twilio)
  - SMS
  - Email
  - Push Notifications
- **Template Management**
- **Scheduling Engine**
- **Delivery Tracking**

#### Analytics Service
- **Real-time Data Processing**
- **Report Generation**
- **Data Aggregation**
- **Export Capabilities**

### 4. Data Layer

#### Primary Database (MySQL)
- **Schema Design**:
  - Multi-tenant architecture with school_id
  - Optimized indexes for common queries
  - Partitioning for large tables
- **Replication**: Master-slave for read scaling

#### Cache Layer (Redis)
- **Use Cases**:
  - Session storage
  - API response caching
  - Real-time analytics
  - Rate limiting counters
- **Eviction Policy**: LRU with TTL

#### File Storage (S3-Compatible)
- **Structure**:
  ```
  /schools/{school_id}/
    /courses/{course_id}/
      /videos/
      /documents/
      /thumbnails/
    /users/{user_id}/
      /avatars/
      /submissions/
  ```

#### Message Queue (RabbitMQ)
- **Queues**:
  - Email notifications
  - SMS delivery
  - Video processing
  - Report generation
  - Webhook processing

## Security Architecture

### Authentication Flow
```
1. User Login → API Gateway
2. Validate Credentials → Auth Service
3. Generate JWT Token (15min access, 7day refresh)
4. Return Token → Client
5. Client stores token securely
6. Include token in subsequent requests
```

### Data Encryption
- **In Transit**: TLS 1.3 for all communications
- **At Rest**: AES-256 for sensitive data
- **Database**: Transparent Data Encryption (TDE)
- **File Storage**: Server-side encryption

### Security Measures
- **OWASP Top 10 compliance**
- **SQL injection prevention**
- **XSS protection**
- **CSRF tokens**
- **Rate limiting**
- **IP whitelisting for admin**
- **WAF integration**

## Multi-Tenancy Strategy

### Data Isolation
- **Shared Database, Separate Schema**
- **Row-level Security with school_id**
- **Tenant-specific encryption keys**

### Domain Mapping
```nginx
server {
    server_name ~^(?<subdomain>.+)\.el-manassa\.com$;
    
    location / {
        proxy_set_header X-Tenant-ID $subdomain;
        proxy_pass http://app-backend;
    }
}
```

### Resource Quotas
- **Storage limits per school**
- **API rate limits per tenant**
- **User count restrictions**
- **Bandwidth monitoring**

## Scalability Considerations

### Horizontal Scaling
- **Application servers**: Auto-scaling groups
- **Database**: Read replicas
- **Cache**: Redis Cluster
- **CDN**: Global content delivery

### Performance Optimization
- **Query optimization**
- **Lazy loading**
- **Image optimization**
- **Video adaptive streaming**
- **API response pagination**

### Load Balancing
- **Application**: Round-robin with health checks
- **Database**: Read/write splitting
- **Geographic**: Multi-region deployment

## Development Environment

### Local Setup
```yaml
version: '3.8'
services:
  wordpress:
    image: wordpress:php8.0
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_NAME: el_manassa
    volumes:
      - ./backend/wordpress:/var/www/html
  
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: el_manassa
      MYSQL_ROOT_PASSWORD: secret
  
  redis:
    image: redis:alpine
  
  rabbitmq:
    image: rabbitmq:management
```

### Development Tools
- **API Testing**: Postman/Insomnia
- **Database Management**: phpMyAdmin
- **Cache Monitoring**: Redis Commander
- **Message Queue**: RabbitMQ Management UI

## Deployment Architecture

### Production Environment
- **Kubernetes**: Container orchestration
- **Helm Charts**: Package management
- **Service Mesh**: Istio for microservices
- **Monitoring**: Prometheus + Grafana

### CI/CD Pipeline
```yaml
stages:
  - test
  - build
  - deploy

test:
  - Unit tests
  - Integration tests
  - Security scanning

build:
  - Docker image creation
  - Push to registry

deploy:
  - Staging deployment
  - Production deployment (manual approval)
```

## Monitoring and Observability

### Metrics Collection
- **Application Metrics**: Response times, error rates
- **Infrastructure Metrics**: CPU, memory, disk
- **Business Metrics**: Enrollments, payments, engagement

### Logging Strategy
- **Centralized Logging**: ELK Stack
- **Log Levels**: ERROR, WARN, INFO, DEBUG
- **Structured Logging**: JSON format
- **Log Retention**: 30 days hot, 1 year cold

### Alerting Rules
- **API response time > 2s**
- **Error rate > 5%**
- **Database connection pool exhaustion**
- **Payment failure rate > 10%**
- **Disk usage > 80%**

## Disaster Recovery

### Backup Strategy
- **Database**: Daily full, hourly incremental
- **Files**: Real-time S3 sync
- **Configuration**: Version controlled

### Recovery Procedures
- **RTO**: 4 hours
- **RPO**: 1 hour
- **Automated failover**
- **Regular DR drills**

## Technology Decisions Rationale

### Why WordPress + Tutor LMS?
- Mature LMS ecosystem
- Extensive plugin support
- Easy content management
- Cost-effective solution
- Large developer community

### Why Headless Architecture?
- Native mobile experience
- Complete UI/UX control
- Better performance
- Easier scaling
- Technology flexibility

### Why Flutter for Mobile?
- Single codebase for iOS/Android
- Native performance
- Rich widget library
- Strong typing with Dart
- Hot reload development

### Why React for Web?
- Large ecosystem
- Component reusability
- Virtual DOM performance
- TypeScript support
- Extensive tooling