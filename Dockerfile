# ---------- Stage 1: Build Angular App ----------
FROM node:20 AS build
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Use npm install instead of npm ci (for better compatibility)
RUN npm install --legacy-peer-deps --unsafe-perm

# Copy all source files
COPY . .

# Build Angular app (for Angular 15+).
# IMPORTANT CORRECTION: Added --base-href / to ensure the application
# is configured to be served from the server root.
RUN npm run build -- --configuration production --base-href /


# ---------- Stage 2: Serve built app ----------
FROM node:20-alpine

# Install lightweight static server
RUN npm install -g serve

WORKDIR /app

# Copy build output from previous stage.
# This copies the contents of /app/dist/frontend (like index.html, main.js, etc.)
# to /app/dist in this stage.
COPY --from=build /app/dist/frontend /app/dist

EXPOSE 3000

# Serve Angular app. The -s flag enables single-page application mode (SPA),
# routing all non-file requests to index.html as the fallback.
CMD ["serve", "-s", "dist", "-l", "3000"]
