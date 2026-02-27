# Deployment

This guide explains how to deploy this Docusaurus project to [Coolify](https://coolify.io/).

## Prerequisites

- A Coolify instance (self-hosted or cloud)
- Your Docusaurus project pushed to a Git repository (GitHub, GitLab, etc.)
- A domain configured in your DNS pointing to your Coolify server

## Deployment Steps

### 1. Create a New Application

1. Log in to your Coolify dashboard
2. Click **"Create a new Application"**
3. Connect your GitHub account if not already connected
4. Select your repository

### 2. Initial Configuration

| Setting                  | Value                                              |
| ------------------------ | -------------------------------------------------- |
| **Branch**               | `main` (or your default branch)                    |
| **Base Directory**       | `/` (or subdirectory if Docusaurus is not at root) |
| **Build Pack**           | `Nixpacks`                                         |
| **Is it a static site?** | ☑️ Checked                                         |

### 3. Build Configuration

| Setting               | Value                            |
| --------------------- | -------------------------------- |
| **Install Command**   | `pnpm install --frozen-lockfile` |
| **Build Command**     | `pnpm run build`                 |
| **Publish Directory** | `build`                          |

### 4. Domain Configuration

1. In the **Domains** field, enter your desired domain (e.g., `https://your-domain.com`)
2. Click **"Set Direction"** to configure www/non-www preferences
3. Coolify will automatically handle SSL certificates via Let's Encrypt

### 5. Network Settings

| Setting           | Value       |
| ----------------- | ----------- |
| **Ports Exposes** | `80`        |
| **Port Mappings** | Leave empty |

### 6. Deploy

1. Click the **"Deploy"** button in the top right
2. Monitor the build progress in the **"Deployments"** tab
3. Check the logs if any issues occur

## Updating `docusaurus.config.js`

Ensure your `docusaurus.config.js` has the correct URL settings for your deployment:

```javascript
export default {
  url: 'https://your-domain.com',
  baseUrl: '/',
  // ... rest of your config
};
```

## Automatic Deployments

Coolify automatically redeploys your site when you push changes to the configured branch. You can also:

- Trigger manual deployments from the dashboard
- Configure webhooks for more control
- Set up preview deployments for pull requests

## Additional Resources

- [Coolify Documentation](https://coolify.io/docs)
- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
- [Nixpacks Documentation](https://nixpacks.com/docs)
