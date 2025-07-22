# El-Manassa API Documentation

## Overview

The El-Manassa API provides programmatic access to all platform features. Built on REST principles, it uses standard HTTP methods and returns JSON responses.

## Base URLs

- **Production**: `https://api.el-manassa.com/v1`
- **Staging**: `https://staging-api.el-manassa.com/v1`
- **School-specific**: `https://{school-subdomain}.el-manassa.com/api/v1`

## Authentication

### JWT Token Authentication

All API requests require authentication using JWT tokens.

#### Obtaining Tokens

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "school_id": "school_123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 900,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "role": "student",
    "school_id": "school_123"
  }
}
```

#### Using Tokens

Include the access token in the Authorization header:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

#### Refreshing Tokens

```http
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

## API Endpoints

### Authentication Endpoints

#### Login
```http
POST /auth/login
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

#### Refresh Token
```http
POST /auth/refresh
```

#### Forgot Password
```http
POST /auth/forgot-password
```

#### Reset Password
```http
POST /auth/reset-password
```

### User Management

#### Get Current User
```http
GET /users/me
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "user_123",
  "email": "student@example.com",
  "first_name": "أحمد",
  "last_name": "محمد",
  "role": "student",
  "school_id": "school_123",
  "profile": {
    "avatar_url": "https://cdn.el-manassa.com/avatars/user_123.jpg",
    "phone": "+201234567890",
    "grade_level": 10,
    "parent_phone": "+201234567891"
  },
  "preferences": {
    "language": "ar",
    "notifications": {
      "email": true,
      "sms": true,
      "whatsapp": true,
      "push": true
    }
  }
}
```

#### Update User Profile
```http
PUT /users/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "first_name": "أحمد",
  "last_name": "محمد",
  "profile": {
    "phone": "+201234567890"
  }
}
```

#### Upload Avatar
```http
POST /users/me/avatar
Authorization: Bearer {token}
Content-Type: multipart/form-data

avatar: [binary file data]
```

### Course Management

#### List Courses
```http
GET /courses?page=1&limit=20&category=math&grade=10
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (integer): Page number for pagination
- `limit` (integer): Number of items per page (max: 100)
- `category` (string): Filter by category
- `grade` (integer): Filter by grade level
- `teacher_id` (string): Filter by teacher
- `search` (string): Search in title and description
- `status` (string): published, draft, archived
- `sort` (string): created_at, updated_at, title, price
- `order` (string): asc, desc

**Response:**
```json
{
  "data": [
    {
      "id": "course_123",
      "title": "الرياضيات - الصف العاشر",
      "description": "دورة شاملة في الرياضيات للصف العاشر",
      "thumbnail_url": "https://cdn.el-manassa.com/courses/math10.jpg",
      "teacher": {
        "id": "teacher_123",
        "name": "د. محمد أحمد",
        "avatar_url": "https://cdn.el-manassa.com/avatars/teacher_123.jpg"
      },
      "price": 500,
      "currency": "EGP",
      "duration_hours": 40,
      "lessons_count": 24,
      "enrolled_count": 156,
      "rating": 4.8,
      "categories": ["math", "grade-10"],
      "preview_url": "https://cdn.el-manassa.com/previews/course_123.mp4"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

#### Get Course Details
```http
GET /courses/{course_id}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "course_123",
  "title": "الرياضيات - الصف العاشر",
  "description": "دورة شاملة في الرياضيات للصف العاشر",
  "detailed_description": "...",
  "thumbnail_url": "https://cdn.el-manassa.com/courses/math10.jpg",
  "teacher": {
    "id": "teacher_123",
    "name": "د. محمد أحمد",
    "bio": "دكتوراه في الرياضيات من جامعة القاهرة",
    "avatar_url": "https://cdn.el-manassa.com/avatars/teacher_123.jpg"
  },
  "price": 500,
  "currency": "EGP",
  "duration_hours": 40,
  "lessons_count": 24,
  "requirements": ["كتاب الرياضيات للصف العاشر", "آلة حاسبة علمية"],
  "what_you_learn": [
    "الجبر والمعادلات",
    "الهندسة التحليلية",
    "حساب المثلثات"
  ],
  "curriculum": [
    {
      "module_id": "module_1",
      "title": "الوحدة الأولى: الجبر",
      "lessons": [
        {
          "id": "lesson_1",
          "title": "المعادلات الخطية",
          "duration_minutes": 45,
          "is_preview": true
        }
      ]
    }
  ],
  "enrollment_status": "not_enrolled",
  "rating": 4.8,
  "reviews_count": 45,
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-20T15:30:00Z"
}
```

#### Create Course (Teachers Only)
```http
POST /courses
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "الفيزياء - الصف الحادي عشر",
  "description": "دورة شاملة في الفيزياء",
  "detailed_description": "...",
  "price": 600,
  "currency": "EGP",
  "categories": ["physics", "grade-11"],
  "requirements": ["كتاب الفيزياء"],
  "what_you_learn": ["الميكانيكا", "الكهرباء"]
}
```

### Enrollment Management

#### Enroll in Course
```http
POST /enrollments
Authorization: Bearer {token}
Content-Type: application/json

{
  "course_id": "course_123",
  "payment_method": "paymob",
  "coupon_code": "DISCOUNT20"
}
```

#### Get My Enrollments
```http
GET /enrollments/my?status=active&page=1&limit=10
Authorization: Bearer {token}
```

**Response:**
```json
{
  "data": [
    {
      "id": "enrollment_123",
      "course": {
        "id": "course_123",
        "title": "الرياضيات - الصف العاشر",
        "thumbnail_url": "https://cdn.el-manassa.com/courses/math10.jpg"
      },
      "progress": {
        "completed_lessons": 12,
        "total_lessons": 24,
        "percentage": 50,
        "last_accessed": "2024-01-25T14:30:00Z"
      },
      "enrolled_at": "2024-01-01T10:00:00Z",
      "expires_at": null,
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5
  }
}
```

### Lesson Management

#### Get Lesson Content
```http
GET /lessons/{lesson_id}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "lesson_123",
  "title": "المعادلات الخطية",
  "description": "في هذا الدرس سنتعلم حل المعادلات الخطية",
  "course_id": "course_123",
  "module_id": "module_1",
  "order": 1,
  "duration_minutes": 45,
  "content": {
    "video_url": "https://cdn.el-manassa.com/videos/lesson_123.m3u8",
    "video_duration": 2700,
    "attachments": [
      {
        "id": "attach_1",
        "title": "ملخص الدرس",
        "type": "pdf",
        "url": "https://cdn.el-manassa.com/attachments/summary.pdf",
        "size_bytes": 1048576
      }
    ],
    "can_download": true
  },
  "quiz_id": "quiz_123",
  "next_lesson_id": "lesson_124",
  "previous_lesson_id": null,
  "is_completed": false,
  "completion_percentage": 0
}
```

#### Mark Lesson Complete
```http
POST /lessons/{lesson_id}/complete
Authorization: Bearer {token}
Content-Type: application/json

{
  "video_position": 2700,
  "completion_percentage": 100
}
```

### Quiz Management

#### Get Quiz
```http
GET /quizzes/{quiz_id}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "quiz_123",
  "title": "اختبار المعادلات الخطية",
  "description": "اختبار قصير لتقييم فهمك للمعادلات الخطية",
  "lesson_id": "lesson_123",
  "questions_count": 10,
  "duration_minutes": 15,
  "passing_score": 70,
  "attempts_allowed": 3,
  "attempts_remaining": 3,
  "shuffle_questions": true,
  "show_correct_answers": "after_submission",
  "questions": [
    {
      "id": "q_1",
      "type": "multiple_choice",
      "question": "حل المعادلة: 2x + 5 = 15",
      "options": [
        {"id": "a", "text": "x = 5"},
        {"id": "b", "text": "x = 10"},
        {"id": "c", "text": "x = 7.5"},
        {"id": "d", "text": "x = 20"}
      ],
      "points": 10
    },
    {
      "id": "q_2",
      "type": "fill_blank",
      "question": "المعادلة 3x - 7 = 8 لها الحل x = ___",
      "points": 10
    }
  ]
}
```

#### Submit Quiz
```http
POST /quizzes/{quiz_id}/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "answers": [
    {
      "question_id": "q_1",
      "answer": "a"
    },
    {
      "question_id": "q_2",
      "answer": "5"
    }
  ],
  "time_spent_seconds": 600
}
```

**Response:**
```json
{
  "attempt_id": "attempt_123",
  "score": 85,
  "passed": true,
  "correct_answers": 8,
  "total_questions": 10,
  "time_spent_seconds": 600,
  "feedback": {
    "q_1": {
      "correct": true,
      "points_earned": 10
    },
    "q_2": {
      "correct": true,
      "points_earned": 10,
      "correct_answer": "5"
    }
  }
}
```

### Payment Integration

#### Create Payment
```http
POST /payments/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 500,
  "currency": "EGP",
  "payment_method": "paymob",
  "items": [
    {
      "type": "course",
      "id": "course_123",
      "title": "الرياضيات - الصف العاشر",
      "amount": 500
    }
  ],
  "billing_data": {
    "first_name": "أحمد",
    "last_name": "محمد",
    "email": "ahmad@example.com",
    "phone_number": "+201234567890"
  }
}
```

**Response:**
```json
{
  "payment_id": "pay_123",
  "payment_url": "https://accept.paymob.com/api/acceptance/iframes/123456?payment_token=xyz",
  "amount": 500,
  "currency": "EGP",
  "status": "pending",
  "expires_at": "2024-01-25T15:00:00Z"
}
```

#### Check Payment Status
```http
GET /payments/{payment_id}/status
Authorization: Bearer {token}
```

### Notifications

#### Get Notifications
```http
GET /notifications?unread=true&page=1&limit=20
Authorization: Bearer {token}
```

**Response:**
```json
{
  "data": [
    {
      "id": "notif_123",
      "type": "course_update",
      "title": "محتوى جديد متاح",
      "message": "تم إضافة درس جديد في دورة الرياضيات",
      "data": {
        "course_id": "course_123",
        "lesson_id": "lesson_125"
      },
      "is_read": false,
      "created_at": "2024-01-25T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15
  },
  "unread_count": 5
}
```

#### Mark Notification as Read
```http
PUT /notifications/{notification_id}/read
Authorization: Bearer {token}
```

### Analytics (Teachers)

#### Course Analytics
```http
GET /analytics/courses/{course_id}?period=30d
Authorization: Bearer {token}
```

**Response:**
```json
{
  "course_id": "course_123",
  "period": "30d",
  "enrollment_stats": {
    "total": 156,
    "new_this_period": 23,
    "active": 142,
    "completed": 45
  },
  "engagement_stats": {
    "average_progress": 67.5,
    "average_time_spent_minutes": 1250,
    "lesson_completion_rate": 78.3,
    "quiz_average_score": 82.4
  },
  "revenue_stats": {
    "total_revenue": 78000,
    "revenue_this_period": 11500,
    "currency": "EGP"
  },
  "popular_lessons": [
    {
      "lesson_id": "lesson_123",
      "title": "المعادلات الخطية",
      "views": 245,
      "completion_rate": 85.2
    }
  ]
}
```

### School Admin Endpoints

#### Dashboard Statistics
```http
GET /admin/dashboard/stats
Authorization: Bearer {token}
X-School-ID: school_123
```

**Response:**
```json
{
  "school_id": "school_123",
  "statistics": {
    "total_students": 2456,
    "active_students": 2103,
    "total_teachers": 45,
    "total_courses": 125,
    "total_enrollments": 8934,
    "revenue_this_month": 456000,
    "revenue_last_month": 423000,
    "growth_percentage": 7.8
  },
  "recent_activities": [
    {
      "type": "enrollment",
      "description": "طالب جديد التحق بدورة الرياضيات",
      "timestamp": "2024-01-25T14:30:00Z"
    }
  ]
}
```

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "البريد الإلكتروني مطلوب",
    "details": {
      "field": "email",
      "validation": "required"
    }
  },
  "request_id": "req_abc123"
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `PAYMENT_FAILED` | 402 | Payment processing failed |
| `RATE_LIMITED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |

## Rate Limiting

API requests are rate limited based on user role:

- **Students**: 100 requests per minute
- **Teachers**: 200 requests per minute
- **School Admins**: 500 requests per minute
- **Super Admins**: 1000 requests per minute

Rate limit information is included in response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1611234567
```

## Webhooks

Configure webhooks to receive real-time notifications about events:

### Available Events

- `enrollment.created`
- `enrollment.completed`
- `payment.success`
- `payment.failed`
- `course.published`
- `quiz.submitted`
- `user.registered`

### Webhook Payload Format

```json
{
  "event": "enrollment.created",
  "timestamp": "2024-01-25T10:00:00Z",
  "data": {
    "enrollment_id": "enroll_123",
    "user_id": "user_123",
    "course_id": "course_123"
  },
  "signature": "sha256=..."
}
```

### Webhook Security

Verify webhook signatures using HMAC-SHA256:
```python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)
```

## SDK Examples

### JavaScript/TypeScript
```typescript
import { ElManassaClient } from '@el-manassa/sdk';

const client = new ElManassaClient({
  apiKey: 'your_api_key',
  schoolId: 'school_123'
});

// Get courses
const courses = await client.courses.list({
  page: 1,
  limit: 20,
  grade: 10
});

// Enroll in course
const enrollment = await client.enrollments.create({
  courseId: 'course_123',
  paymentMethod: 'paymob'
});
```

### Flutter/Dart
```dart
import 'package:el_manassa_sdk/el_manassa_sdk.dart';

final client = ElManassaClient(
  apiKey: 'your_api_key',
  schoolId: 'school_123',
);

// Get user profile
final user = await client.users.getCurrentUser();

// Submit quiz
final result = await client.quizzes.submit(
  quizId: 'quiz_123',
  answers: [
    QuizAnswer(questionId: 'q_1', answer: 'a'),
    QuizAnswer(questionId: 'q_2', answer: '5'),
  ],
);
```

## API Versioning

The API uses URL versioning. The current version is `v1`.

When breaking changes are introduced:
1. A new version will be released (e.g., `v2`)
2. The old version will be maintained for at least 6 months
3. Deprecation notices will be sent via email and API headers

## Support

For API support:
- Email: api-support@el-manassa.com
- Developer Portal: https://developers.el-manassa.com
- Status Page: https://status.el-manassa.com