# User Roles and Permissions Documentation

## Overview

El-Manassa implements a hierarchical role-based access control (RBAC) system with five primary user roles. Each role has specific permissions and capabilities designed to support the multi-tenant educational platform structure.

## Role Hierarchy

```
Super Admin (Platform Level)
    └── School Admin (Institution Level)
            ├── Teacher
            ├── Student
            └── Parent
```

## Detailed Role Specifications

### 1. Super Admin

The Super Admin has complete control over the entire platform ecosystem.

#### Core Responsibilities
- Platform infrastructure management
- Multi-school administration
- Global configuration settings
- Platform-wide analytics and monitoring

#### Detailed Permissions

##### School Management
- `schools.create` - Create new school instances
- `schools.read` - View all schools
- `schools.update` - Modify school settings
- `schools.delete` - Remove schools from platform
- `schools.suspend` - Temporarily disable school access
- `schools.billing` - Manage school subscriptions

##### Platform Configuration
- `platform.settings.read` - View platform settings
- `platform.settings.update` - Modify platform settings
- `platform.features.toggle` - Enable/disable features
- `platform.maintenance.manage` - Schedule maintenance windows
- `platform.integrations.manage` - Configure third-party integrations

##### User Management
- `users.*.read` - View all users across all schools
- `users.*.update` - Modify any user account
- `users.*.delete` - Remove any user account
- `users.impersonate` - Login as any user for support

##### Analytics & Monitoring
- `analytics.platform.view` - Access platform-wide analytics
- `analytics.revenue.view` - View revenue reports
- `analytics.export` - Export analytics data
- `logs.system.view` - Access system logs
- `monitoring.alerts.manage` - Configure monitoring alerts

##### Financial Management
- `payments.gateway.configure` - Setup payment gateways
- `payments.transactions.view` - View all transactions
- `payments.refunds.process` - Process refunds
- `payments.reports.generate` - Generate financial reports

### 2. School Admin

School Admins manage their specific educational institution within the platform.

#### Core Responsibilities
- Institution branding and customization
- Teacher and staff management
- Course catalog oversight
- School-specific analytics

#### Detailed Permissions

##### Institution Management
- `school.settings.read` - View school settings
- `school.settings.update` - Update school configuration
- `school.branding.update` - Customize school appearance
- `school.domain.configure` - Setup custom domain
- `school.notifications.configure` - Setup notification templates

##### User Management (School Scope)
- `users.teachers.create` - Add new teachers
- `users.teachers.read` - View teacher accounts
- `users.teachers.update` - Modify teacher details
- `users.teachers.delete` - Remove teacher accounts
- `users.students.read` - View all students
- `users.students.export` - Export student data
- `users.parents.read` - View parent accounts
- `users.bulk.import` - Bulk import users

##### Course Management
- `courses.*.read` - View all courses
- `courses.approval.manage` - Approve/reject courses
- `courses.pricing.override` - Set custom pricing
- `courses.visibility.control` - Control course visibility
- `courses.categories.manage` - Manage course categories

##### Financial Operations
- `payments.school.view` - View school transactions
- `payments.refunds.approve` - Approve refund requests
- `payments.reports.school` - Generate school financial reports
- `payments.methods.configure` - Configure payment methods

##### Analytics (School Scope)
- `analytics.school.view` - Access school analytics
- `analytics.courses.view` - View course performance
- `analytics.teachers.view` - View teacher performance
- `analytics.students.view` - View student progress
- `analytics.revenue.school` - View school revenue

##### Communication
- `communications.templates.create` - Create message templates
- `communications.campaigns.send` - Send bulk messages
- `communications.settings.configure` - Configure communication channels

### 3. Teacher

Teachers create and manage educational content and interact with students.

#### Core Responsibilities
- Course creation and management
- Student assessment and grading
- Live session conducting
- Student progress monitoring

#### Detailed Permissions

##### Course Management
- `courses.own.create` - Create new courses
- `courses.own.read` - View own courses
- `courses.own.update` - Edit own courses
- `courses.own.delete` - Delete own courses (if empty)
- `courses.own.publish` - Publish courses (may require approval)

##### Content Management
- `lessons.create` - Create lessons
- `lessons.read` - View lessons
- `lessons.update` - Edit lessons
- `lessons.delete` - Delete lessons
- `lessons.reorder` - Reorder lessons
- `materials.upload` - Upload course materials
- `materials.delete` - Remove course materials

##### Assessment Management
- `quizzes.create` - Create quizzes
- `quizzes.read` - View quizzes
- `quizzes.update` - Edit quizzes
- `quizzes.delete` - Delete quizzes
- `assignments.create` - Create assignments
- `assignments.grade` - Grade submissions
- `grades.manage` - Manage student grades

##### Student Interaction
- `students.enrolled.read` - View enrolled students
- `students.progress.view` - View student progress
- `students.communicate` - Message students
- `students.attendance.mark` - Mark attendance
- `students.certificates.issue` - Issue certificates

##### Live Sessions
- `sessions.schedule` - Schedule live classes
- `sessions.host` - Host live sessions
- `sessions.record` - Record sessions
- `sessions.attendance.view` - View session attendance

##### Analytics (Teacher Scope)
- `analytics.courses.own` - View own course analytics
- `analytics.students.performance` - View student performance
- `analytics.revenue.own` - View earnings (if applicable)

### 4. Student

Students access educational content and track their learning progress.

#### Core Responsibilities
- Course enrollment and learning
- Assignment submission
- Quiz participation
- Progress tracking

#### Detailed Permissions

##### Course Access
- `courses.browse` - Browse available courses
- `courses.preview` - View course previews
- `courses.enroll` - Enroll in courses
- `courses.enrolled.read` - Access enrolled courses

##### Learning Activities
- `lessons.enrolled.view` - View lesson content
- `lessons.progress.track` - Track lesson progress
- `materials.download` - Download course materials
- `videos.stream` - Stream video content
- `videos.download` - Download videos (if allowed)

##### Assessments
- `quizzes.take` - Take quizzes
- `quizzes.results.own` - View own quiz results
- `assignments.submit` - Submit assignments
- `assignments.results.own` - View assignment feedback

##### Communication
- `messages.teachers.send` - Message teachers
- `messages.receive` - Receive messages
- `forums.participate` - Participate in forums
- `announcements.read` - View announcements

##### Personal Management
- `profile.own.read` - View own profile
- `profile.own.update` - Update profile information
- `progress.own.view` - View learning progress
- `certificates.own.view` - View earned certificates
- `payments.own.view` - View payment history

### 5. Parent

Parents monitor their children's educational progress and manage administrative tasks.

#### Core Responsibilities
- Child progress monitoring
- Teacher communication
- Payment management
- Report access

#### Detailed Permissions

##### Child Monitoring
- `children.progress.view` - View children's progress
- `children.grades.view` - View children's grades
- `children.attendance.view` - View attendance records
- `children.courses.view` - View enrolled courses
- `children.schedule.view` - View class schedules

##### Communication
- `messages.teachers.send` - Message teachers
- `messages.receive` - Receive messages
- `meetings.schedule` - Schedule parent-teacher meetings
- `announcements.read` - View school announcements

##### Administrative
- `payments.family.manage` - Manage family payments
- `payments.history.view` - View payment history
- `payments.methods.update` - Update payment methods
- `enrollments.children.manage` - Manage children's enrollments

##### Reports
- `reports.progress.download` - Download progress reports
- `reports.attendance.download` - Download attendance reports
- `reports.grades.download` - Download grade reports

## Permission Inheritance

### Default Permission Sets

```yaml
super_admin:
  inherits: []
  has_all_permissions: true

school_admin:
  inherits: []
  cannot_access:
    - platform.*
    - schools.* (except own)
    - users.* (except school scope)

teacher:
  inherits: []
  cannot_access:
    - school.*
    - users.* (except enrolled students)
    - payments.* (except own revenue)
    - analytics.* (except own courses)

student:
  inherits: []
  limited_to:
    - own profile
    - enrolled courses
    - own progress

parent:
  inherits: []
  limited_to:
    - children's data
    - family payments
    - teacher communication
```

## Custom Roles

School Admins can create custom roles with specific permission combinations:

### Example Custom Roles

#### Teaching Assistant
```yaml
name: teaching_assistant
base_role: teacher
permissions:
  remove:
    - courses.own.create
    - courses.own.delete
    - payments.revenue.view
  add:
    - assignments.grade (limited to assigned courses)
    - students.communicate (limited to assigned courses)
```

#### Course Coordinator
```yaml
name: course_coordinator
base_role: teacher
permissions:
  add:
    - courses.*.read
    - courses.approval.recommend
    - analytics.courses.department
    - teachers.schedule.view
```

#### Receptionist
```yaml
name: receptionist
base_role: staff
permissions:
  - users.students.create
  - users.students.read
  - payments.cash.collect
  - enrollments.process
  - communications.send (limited templates)
```

## Permission Checking Implementation

### Backend (PHP/WordPress)

```php
// Check single permission
if (current_user_can('courses.own.create')) {
    // Allow course creation
}

// Check multiple permissions
if (current_user_can('courses.own.update') && 
    is_course_owner($course_id)) {
    // Allow course editing
}

// Check with context
if (user_can_for_school($user_id, 'analytics.school.view', $school_id)) {
    // Show school analytics
}
```

### Frontend (React)

```javascript
// Permission hook
const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

// Component-level check
function CourseCreator() {
  if (!hasPermission('courses.own.create')) {
    return <AccessDenied />;
  }
  
  return <CourseForm />;
}

// Conditional rendering
<PermissionGuard require="courses.own.create">
  <CreateCourseButton />
</PermissionGuard>
```

### Mobile (Flutter)

```dart
// Permission service
class PermissionService {
  bool hasPermission(String permission) {
    return currentUser.permissions.contains(permission);
  }
  
  bool canAccessCourse(String courseId) {
    return hasPermission('courses.enrolled.read') &&
           currentUser.enrolledCourses.contains(courseId);
  }
}

// Widget-level check
class CourseListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    if (!context.read<PermissionService>()
        .hasPermission('courses.browse')) {
      return AccessDeniedScreen();
    }
    
    return CourseListView();
  }
}
```

## API Permission Enforcement

### Middleware Implementation

```javascript
// Express middleware
function requirePermission(permission) {
  return async (req, res, next) => {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!await userHasPermission(user.id, permission)) {
      return res.status(403).json({ 
        error: 'Forbidden',
        required_permission: permission 
      });
    }
    
    next();
  };
}

// Route protection
router.post('/courses', 
  requirePermission('courses.own.create'),
  createCourse
);

router.get('/analytics/platform',
  requirePermission('analytics.platform.view'),
  getPlatformAnalytics
);
```

## Permission Audit Logging

All permission checks and changes are logged for security and compliance:

```json
{
  "timestamp": "2024-01-25T10:30:00Z",
  "user_id": "user_123",
  "action": "permission_check",
  "permission": "courses.own.create",
  "result": "granted",
  "context": {
    "ip_address": "41.234.56.78",
    "user_agent": "Mozilla/5.0...",
    "school_id": "school_123"
  }
}
```

## Best Practices

### 1. Principle of Least Privilege
- Grant only the minimum permissions required
- Regularly review and audit permissions
- Remove permissions when no longer needed

### 2. Permission Naming Convention
- Use dot notation: `resource.scope.action`
- Be specific and descriptive
- Maintain consistency across the platform

### 3. Context-Aware Permissions
- Consider school context for multi-tenant operations
- Validate ownership for resource-specific actions
- Implement time-based permissions where needed

### 4. Permission Caching
- Cache permission checks for performance
- Invalidate cache on role changes
- Use Redis for distributed caching

### 5. Security Considerations
- Never expose internal permission names to end users
- Log all permission-related activities
- Implement rate limiting on permission checks
- Regular security audits of permission system