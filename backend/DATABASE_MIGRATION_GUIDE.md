# Database Migration Guide for MooStyle

## Overview
This guide explains how to handle database schema updates without losing existing user data.

## Current Status ✅

### Existing Accounts Status:
- **MooCalf (Admin)**: ✅ Ready to use all new features
- **MekMek (User)**: ✅ Ready to use all new features

Both accounts already have:
- ✅ `points` field (default: 0)
- ✅ `membershipLevel` field (default: 'Bronze')
- ✅ `notificationSettings` field (default: { emailNotifications: false })
- ✅ Cart collections created

## How Database Updates Work

### 1. Mongoose Schema Flexibility
MongoDB and Mongoose are designed to handle schema changes gracefully:

```javascript
// When you add new fields to a schema:
const userSchema = new mongoose.Schema({
  // Existing fields...
  username: String,
  email: String,
  
  // NEW FIELD - automatically gets default value for existing users
  newField: {
    type: String,
    default: 'defaultValue'
  }
});
```

### 2. Automatic Field Addition
When you add new fields with default values:
- **Existing users**: Automatically get the default value
- **New users**: Get the default value when created
- **No data loss**: All existing data remains intact

### 3. Migration Script System
The `migrate.js` script handles complex updates:

```bash
# Run migrations after schema changes
npm run migrate
```

## Best Practices for Future Updates

### 1. Always Use Default Values
```javascript
// ✅ GOOD - Safe for existing users
newField: {
  type: String,
  default: 'safeDefault'
}

// ❌ BAD - Could cause issues
newField: String // No default = undefined for existing users
```

### 2. Use Migration Scripts for Complex Changes
```javascript
// Example: Adding a new required field
const migration = async () => {
  const users = await User.find({ newRequiredField: { $exists: false } });
  for (const user of users) {
    user.newRequiredField = calculateValue(user);
    await user.save();
  }
};
```

### 3. Test Changes Locally First
1. Make schema changes
2. Run migration script
3. Test with existing data
4. Deploy to production

## Common Update Scenarios

### Adding New Fields
```javascript
// 1. Update schema with default
newField: { type: String, default: 'defaultValue' }

// 2. Run migration (optional if default is sufficient)
npm run migrate

// 3. Existing users automatically get default value
```

### Modifying Existing Fields
```javascript
// 1. Update schema
existingField: { 
  type: String, 
  default: 'newDefault',
  validate: { validator: newValidation }
}

// 2. Run migration to update existing data
const migration = async () => {
  await User.updateMany(
    { existingField: { $exists: false } },
    { $set: { existingField: 'newDefault' } }
  );
};
```

### Removing Fields
```javascript
// 1. Remove from schema
// 2. Run migration to clean up data (optional)
const migration = async () => {
  await User.updateMany(
    {},
    { $unset: { oldField: 1 } }
  );
};
```

## Migration Script Features

The `migrate.js` script automatically handles:

1. **Missing Fields**: Adds default values to existing users
2. **Membership Levels**: Updates based on current points
3. **Cart Creation**: Creates cart collections for existing users
4. **Data Validation**: Ensures all users have required fields

## Running Migrations

### Manual Migration
```bash
cd backend
npm run migrate
```

### Programmatic Migration
```javascript
const { runMigrations } = require('./scripts/migrate');
await runMigrations();
```

## What Happens During Migration

1. **Connection**: Connects to MongoDB
2. **Analysis**: Finds users missing new fields
3. **Updates**: Adds missing fields with defaults
4. **Validation**: Ensures data integrity
5. **Cleanup**: Closes database connection

## Safety Features

### 1. Non-Destructive
- Never deletes existing data
- Only adds missing fields
- Preserves all user information

### 2. Idempotent
- Can run multiple times safely
- Won't duplicate data
- Handles partial failures gracefully

### 3. Logging
- Shows what changes are made
- Reports success/failure
- Provides detailed output

## Example: Adding a New Feature

Let's say you want to add a "preferences" field:

### 1. Update User Schema
```javascript
const userSchema = new mongoose.Schema({
  // ... existing fields
  preferences: {
    theme: { type: String, default: 'light' },
    language: { type: String, default: 'en' },
    notifications: { type: Boolean, default: true }
  }
});
```

### 2. Run Migration
```bash
npm run migrate
```

### 3. Result
- Existing users get default preferences
- New users get default preferences
- No data loss occurs

## Troubleshooting

### Common Issues
1. **Connection Errors**: Check MongoDB URI
2. **Permission Errors**: Ensure database access
3. **Schema Conflicts**: Check for duplicate indexes

### Solutions
1. **Check Logs**: Migration script provides detailed output
2. **Manual Updates**: Can manually update specific users
3. **Rollback**: Keep backups before major changes

## Summary

✅ **Your existing accounts (MooCalf and MekMek) are ready to use all new features**

✅ **Future updates will automatically work with existing accounts**

✅ **Migration system ensures no data loss during updates**

✅ **You never need to delete accounts when making updates**

The system is designed to be backward-compatible and user-friendly. Existing accounts will seamlessly work with new features, and future updates will be handled automatically through the migration system.
