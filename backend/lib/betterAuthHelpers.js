// Helper functions for Better Auth user management
const updateUserPoints = async (userId, pointsToAdd, sessionCookie) => {
  try {
    const response = await fetch(`${process.env.BETTER_AUTH_URL || 'http://localhost:5000'}/api/auth/update-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': sessionCookie || '',
      },
      body: JSON.stringify({
        points: pointsToAdd
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update user points');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error updating user points:', error);
    throw error;
  }
};

const getUserSession = async (sessionCookie) => {
  try {
    const response = await fetch(`${process.env.BETTER_AUTH_URL || 'http://localhost:5000'}/api/auth/get-session`, {
      headers: {
        'Cookie': sessionCookie || '',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get user session');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error getting user session:', error);
    throw error;
  }
};

const calculateMembershipLevel = (points) => {
  if (points >= 200) return 'Diamond';
  if (points >= 80) return 'Gold';
  if (points >= 30) return 'Silver';
  return 'Bronze';
};

module.exports = {
  updateUserPoints,
  getUserSession,
  calculateMembershipLevel
};

const updateUserPoints = async (userId, pointsToAdd, sessionCookie) => {
  try {
    const response = await fetch(`${process.env.BETTER_AUTH_URL || 'http://localhost:5000'}/api/auth/update-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': sessionCookie || '',
      },
      body: JSON.stringify({
        points: pointsToAdd
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update user points');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error updating user points:', error);
    throw error;
  }
};

const getUserSession = async (sessionCookie) => {
  try {
    const response = await fetch(`${process.env.BETTER_AUTH_URL || 'http://localhost:5000'}/api/auth/get-session`, {
      headers: {
        'Cookie': sessionCookie || '',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get user session');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error getting user session:', error);
    throw error;
  }
};

const calculateMembershipLevel = (points) => {
  if (points >= 200) return 'Diamond';
  if (points >= 80) return 'Gold';
  if (points >= 30) return 'Silver';
  return 'Bronze';
};

module.exports = {
  updateUserPoints,
  getUserSession,
  calculateMembershipLevel
};


