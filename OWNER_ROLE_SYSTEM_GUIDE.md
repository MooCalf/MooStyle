# Owner Role System Implementation

## Overview
This document outlines the implementation of the **Owner Role System** for MOOSTYLE, which provides the highest level of administrative privileges. The owner role can edit all users, including admins and other owners, while maintaining security protections.

## Role Hierarchy

### Role Levels (Highest to Lowest)
1. **Owner** - Highest privilege level
2. **Admin** - Administrative privileges
3. **User** - Standard user privileges

### Permission Matrix

| Action | Owner | Admin | User |
|--------|-------|-------|------|
| Edit Users | ✅ All users | ❌ Admins/Owners only | ❌ |
| Edit Admins | ✅ | ❌ | ❌ |
| Edit Owners | ✅ | ❌ | ❌ |
| Ban Users | ✅ All users | ❌ Admins/Owners only | ❌ |
| Delete Users | ✅ All users | ❌ Admins/Owners only | ❌ |
| Change Roles | ✅ All roles | ❌ Admins/Owners only | ❌ |
| Access Admin Dashboard | ✅ | ✅ | ❌ |
| Self-demotion | ❌ | ✅ | ✅ |
| Self-deletion | ❌ | ✅ | ✅ |

## Implementation Details

### Backend Changes

#### 1. Better Auth Configuration (`backend/auth.js`)
```javascript
admin({
  defaultRole: "user",
  adminRoles: ["admin", "owner"], // Added "owner" to admin roles
  adminUserIds: [],
})
```

#### 2. Admin Routes (`backend/routes/admin.js`)

**Updated Middleware:**
- `verifyAdminSession`: Now accepts both "admin" and "owner" roles
- `verifyOwnerSession`: New middleware for owner-only operations

**Role Protection Logic:**
```javascript
// Only owners can modify admins and owners
if (targetUser.role === 'admin' && req.user.role !== 'owner') {
  return res.status(403).json({
    success: false,
    message: 'Cannot modify admin users. Only owners can modify admin accounts.'
  });
}

// Prevent non-owners from modifying owner accounts
if (targetUser.role === 'owner' && req.user.role !== 'owner') {
  return res.status(403).json({
    success: false,
    message: 'Cannot modify owner accounts. Owner access required.'
  });
}

// Prevent owners from demoting themselves
if (targetUser.id === req.user.id && targetUser.role === 'owner' && role !== 'owner') {
  return res.status(403).json({
    success: false,
    message: 'Cannot demote yourself from owner role.'
  });
}
```

#### 3. Updated Routes
- **User Update**: Owners can edit all users
- **Role Change**: Owners can change any role
- **Ban/Unban**: Owners can ban/unban any user
- **Delete User**: Owners can delete any user (except themselves)

### Frontend Changes

#### 1. AuthContext (`src/contexts/AuthContext.jsx`)
```javascript
const value = {
  user: session?.user || null,
  isAuthenticated: !!session?.user,
  isLoading: isPending,
  isAdmin: ['admin', 'owner'].includes(session?.user?.role), // Updated
  isOwner: session?.user?.role === 'owner', // New
  isBanned: session?.user && !session?.user?.isActive,
};
```

#### 2. Admin Dashboard (`src/Pages/AdminDashboard.jsx`)

**New Features:**
- Owner role detection: `const isOwner = user?.role === 'owner'`
- Enhanced permission checks: `canModifyUser()` now allows owners to edit all users
- Owner role option in role selection dropdowns
- Updated stats display to show owner count
- Enhanced role change warnings for owner promotions

**Permission Logic:**
```javascript
const canModifyUser = (targetUser) => {
  // Owners can modify everyone (including other owners and admins)
  if (isOwner) {
    return true;
  }
  
  // Admins can only modify regular users, not other admins or owners
  if (isUserAdmin(targetUser) || isUserOwner(targetUser)) {
    return false;
  }
  
  return true;
};
```

## Security Features

### 1. Self-Protection
- **Owners cannot demote themselves** from owner role
- **Owners cannot delete their own account**
- **Owners cannot ban themselves**

### 2. Role Hierarchy Enforcement
- **Only owners can modify admins and owners**
- **Admins cannot modify other admins or owners**
- **Regular users have no administrative privileges**

### 3. Audit Trail
- All owner actions are logged in the audit trail
- Security metrics track owner operations
- Role changes are recorded with previous and new roles

## Database Scripts

### 1. Create Owner Account (`backend/scripts/createOwnerAccountBetterAuth.js`)
```bash
# Create a new owner account
node scripts/createOwnerAccountBetterAuth.js owner@example.com
```

**Features:**
- Creates owner account with Better Auth structure
- Checks for existing users
- Provides detailed account information
- Security warnings and best practices

### 2. Existing Admin Script Support
The existing `createAdminAccount.js` can be extended to support owner role creation.

## Usage Instructions

### Creating an Owner Account

1. **Using the Better Auth Script:**
   ```bash
   cd backend
   node scripts/createOwnerAccountBetterAuth.js your-email@example.com
   ```

2. **Manual Database Creation:**
   ```javascript
   const ownerUser = {
     id: new Date().getTime().toString(),
     email: 'owner@example.com',
     emailVerified: true,
     name: 'Owner',
     role: 'owner',
     isActive: true,
     points: 1000,
     membershipLevel: 'Diamond',
     // ... other fields
   };
   ```

3. **Promoting Existing User:**
   - Use the admin dashboard (if you have owner access)
   - Update the database directly
   - Use Better Auth admin functions

### Managing Owner Accounts

1. **Login Process:**
   - Owners use the same login process as other users
   - Password reset works normally
   - Session management is identical

2. **Admin Dashboard Access:**
   - Owners see all users (including admins and other owners)
   - Can edit any user's information
   - Can change any user's role
   - Can ban/unban any user
   - Can delete any user (except themselves)

3. **Role Management:**
   - Owners can promote users to admin or owner
   - Owners can demote admins to regular users
   - Owners cannot demote themselves
   - Warning modals appear for sensitive role changes

## Best Practices

### 1. Security
- **Limit owner accounts** to trusted individuals only
- **Use strong passwords** for owner accounts
- **Enable 2FA** when available
- **Monitor owner activity** regularly
- **Keep owner credentials secure**

### 2. Account Management
- **Document owner accounts** and their purposes
- **Regular security audits** of owner privileges
- **Backup owner access** (multiple owners recommended)
- **Clear ownership transfer** procedures

### 3. Operational
- **Train owners** on the system and responsibilities
- **Document procedures** for owner operations
- **Regular role reviews** to ensure appropriate access
- **Incident response** procedures for compromised accounts

## Troubleshooting

### Common Issues

1. **Owner Cannot Edit Admin:**
   - Check if the user is actually an owner
   - Verify the role in the database
   - Check browser session and cookies

2. **Role Change Not Working:**
   - Ensure the owner is logged in
   - Check for JavaScript errors in console
   - Verify API endpoint responses

3. **Permission Denied Errors:**
   - Confirm user role in database
   - Check middleware configuration
   - Verify session validity

### Debugging Steps

1. **Check User Role:**
   ```javascript
   // In browser console
   console.log('Current user:', user);
   console.log('Is owner:', user?.role === 'owner');
   ```

2. **Verify Database:**
   ```javascript
   // In MongoDB
   db.user.findOne({email: "owner@example.com"});
   ```

3. **Check API Responses:**
   - Monitor network tab for 403 errors
   - Check server logs for permission errors
   - Verify middleware execution

## Migration Guide

### From Existing Admin System

1. **Update Better Auth Configuration:**
   - Add "owner" to adminRoles array
   - Restart the server

2. **Promote Existing Admin to Owner:**
   ```javascript
   // Update in database
   db.user.updateOne(
     {email: "admin@example.com"},
     {$set: {role: "owner"}}
   );
   ```

3. **Update Frontend:**
   - Deploy updated admin dashboard
   - Clear browser cache
   - Test owner functionality

### Testing the Implementation

1. **Create Test Owner Account:**
   ```bash
   node scripts/createOwnerAccountBetterAuth.js test-owner@example.com
   ```

2. **Test Owner Permissions:**
   - Login as owner
   - Try to edit admin users
   - Try to change roles
   - Try to ban/unban users
   - Try to delete users

3. **Test Security Protections:**
   - Try to demote yourself
   - Try to delete your own account
   - Verify audit logs are created

## Conclusion

The Owner Role System provides a secure, hierarchical approach to user management with clear separation of privileges. The implementation ensures that only owners can modify high-privilege accounts while maintaining security protections against self-modification and unauthorized access.

Key benefits:
- **Clear role hierarchy** with defined permissions
- **Enhanced security** with multiple protection layers
- **Comprehensive audit trail** for all administrative actions
- **Flexible management** through admin dashboard
- **Easy deployment** with provided scripts and documentation

This system ensures that MOOSTYLE has proper administrative controls while maintaining security and accountability.
