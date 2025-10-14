# Stage 1 — Build Angular App
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --prod

# Stage 2 — Serve built app
FROM node:18
RUN npm install -g serve

WORKDIR /app
COPY --from=build /app/dist /app/dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
