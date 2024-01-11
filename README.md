## Summary
A simple wishlist app which allows you to save wishlist items. You can give each item a description and a price.
Items are persisted against a user ID in a MongoDB database.

## Development
1. Install the required packages using your favoured package manager, like `npm` or `yarn`.
2. Set up a MongoDB database (for example an Atlas cluster) and a user, in order to provide the MONGO_DB_URL, MONGO_DB_USER and MONGO_DB_PASSWORD environment variables.
3. Create a NEXTAUTH_SECRET (you can generate this yourself - such as running the following command:
```$ openssl rand -base64 32```
4. Configure your NextAuth login provider for Google, in the Google Cloud Dashboard (you can refer to the NextAuth docs for how to do this).

## Deployment
You can deploy this on Vercel. Once you have linked the Vercel project to your forked repository...
1. Configure the Google OAuth login provider for production, using the redirect URL associated with your Vercel project.
2. Set up the evironment variables within the Vercel project settings.
