import { createAuthClient } from "better-auth/react";
import { adminClient, emailOTPClient } from "better-auth/client/plugins";
import { envConfig } from './envConfig.js';

const backendUrl = envConfig.apiBaseUrl;

export const authClient = createAuthClient({
  baseURL: backendUrl,
  plugins: [
    adminClient(),
    emailOTPClient()
  ]
});

// Export auth methods for easy use
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;

// Export default client
export default authClient;