# El-Manassa WordPress Backend

This directory contains the WordPress backend setup for the El-Manassa learning platform.

## Quick Setup (Without Docker)

### Prerequisites
- PHP 8.1+
- MySQL 8.0+
- Apache or Nginx web server

### Installation Steps

1. **Download WordPress**:
   ```bash
   wget https://wordpress.org/latest.tar.gz
   tar -xzf latest.tar.gz
   mv wordpress/* ./
   rm -rf wordpress latest.tar.gz
   ```

2. **Create Database**:
   ```sql
   CREATE DATABASE elmanassa_wp;
   CREATE USER 'elmanassa_user'@'localhost' IDENTIFIED BY 'elmanassa_pass_2024';
   GRANT ALL PRIVILEGES ON elmanassa_wp.* TO 'elmanassa_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Configure WordPress**:
   - Copy `wp-config-sample.php` to `wp-config.php`
   - Update database credentials
   - Add security keys from https://api.wordpress.org/secret-key/1.1/salt/

4. **Install Required Plugins**:
   - Tutor LMS (free version)
   - WP REST API Controller
   - JWT Authentication for WP REST API
   - WooCommerce (for payments)

## Docker Setup

If you have Docker installed, use the provided `docker-compose.yml`:

```bash
# Start the containers
docker-compose up -d

# Stop the containers
docker-compose down

# View logs
docker-compose logs -f wordpress
```

### Services

- **WordPress**: http://localhost:8080
- **phpMyAdmin**: http://localhost:8081
- **MySQL**: localhost:3306

### Default Credentials

- **MySQL**:
  - Database: `elmanassa_wp`
  - Username: `elmanassa_user`
  - Password: `elmanassa_pass_2024`

- **WordPress Admin** (after setup):
  - Will be created during WordPress installation

## Custom Features

### Multi-Tenancy
The custom theme supports multi-tenant functionality where content can be assigned to specific tenants (schools/institutions).

### REST API Endpoints

- `GET /wp-json/elmanassa/v1/tenants` - Get all tenants
- `GET /wp-json/elmanassa/v1/tenant-content/{tenant_id}` - Get content for specific tenant

### Custom Post Types

- **Announcements**: Platform-wide announcements
- **Resources**: Downloadable resources and materials

### Tutor LMS Integration

The platform integrates with Tutor LMS for:
- Course management
- Student progress tracking
- Instructor dashboards
- Quiz and assignment systems

## Theme Structure

```
wp-content/themes/elmanassa/
├── functions.php          # Main theme functions
├── style.css             # Theme stylesheet
├── index.php             # Main template
├── header.php            # Header template
├── footer.php            # Footer template
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── templates/            # Custom page templates
```

## Security Considerations

- Change all default passwords
- Install security plugins (Wordfence, etc.)
- Enable SSL certificates
- Regular backups
- Keep WordPress and plugins updated

## API Authentication

For mobile/web app integration, the platform supports JWT authentication:

1. Install JWT Authentication plugin
2. Configure JWT secret in wp-config.php
3. Use `/wp-json/jwt-auth/v1/token` endpoint for authentication

## Development

For development, you can use the simplified setup without Docker by running PHP's built-in server:

```bash
cd /path/to/wordpress
php -S localhost:8080
```

Note: This requires a separate MySQL server running on your system.