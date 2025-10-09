const cron = require('node-cron');
const { checkAndSendNotifications, cleanupExpiredUsers } = require('./emailService');

// Run daily at 9 AM to check for users expiring soon
cron.schedule('0 9 * * *', async () => {
  console.log('Running daily notification check...');
  try {
    const notifiedCount = await checkAndSendNotifications();
    console.log(`Sent expiry notifications to ${notifiedCount} users`);
  } catch (error) {
    console.error('Error in daily notification check:', error);
  }
});

// Run weekly on Sundays at 2 AM to clean up expired users
cron.schedule('0 2 * * 0', async () => {
  console.log('Running weekly cleanup of expired users...');
  try {
    const deletedCount = await cleanupExpiredUsers();
    console.log(`Cleaned up ${deletedCount} expired users`);
  } catch (error) {
    console.error('Error in weekly cleanup:', error);
  }
});

// Run every 6 hours to check for immediate expirations
cron.schedule('0 */6 * * *', async () => {
  console.log('Running 6-hourly notification check...');
  try {
    const notifiedCount = await checkAndSendNotifications();
    if (notifiedCount > 0) {
      console.log(`Sent expiry notifications to ${notifiedCount} users`);
    }
  } catch (error) {
    console.error('Error in 6-hourly notification check:', error);
  }
});

console.log('Cron jobs scheduled:');
console.log('- Daily notification check: 9:00 AM');
console.log('- Weekly cleanup: Sunday 2:00 AM');
console.log('- 6-hourly notification check: Every 6 hours');
