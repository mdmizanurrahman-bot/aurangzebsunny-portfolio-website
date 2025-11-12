
  # Personal Portfolio Website

  This is a code bundle for Personal Portfolio Website. The original project is available at https://www.figma.com/design/eFFfpYUtsaaG3atP7gos64/Personal-Portfolio-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
## Environment variables

This project requires a MongoDB connection string and optional admin password for initialization. Create a `.env` file (or use Vercel project environment variables) with the following keys:

- `MONGODB_URI` — MongoDB connection string (do NOT commit this to the repo)
- `MONGODB_DB` — database name (defaults to `portfolio`)
- `DEFAULT_ADMIN_PASSWORD` — (optional) if provided, the initial admin user will be created during initialization

See `.env.example` for a template. When deploying to Vercel, add these variables in the Vercel dashboard (Project Settings → Environment Variables) rather than committing them.

## Deploying to Vercel

1. Create a new Vercel project and link it to this GitHub repository.
2. In the Vercel project settings, add `MONGODB_URI` and `MONGODB_DB` (and `DEFAULT_ADMIN_PASSWORD` if you want the initial admin created).
3. Vercel will detect the project and run `npm run build` (the `build` script uses Vite).
4. Verify logs in the Vercel dashboard and open the deployed URL.

Security note: this repository previously contained a committed MongoDB connection string. Make sure to rotate any exposed credentials immediately and do not push secrets to Git.
  