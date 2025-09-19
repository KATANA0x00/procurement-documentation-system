# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

# Copy only package files first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the whole project
COPY . ./

# Build
RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine
WORKDIR /app

# Copy only build output
COPY --from=build /app/.output ./.output

# Copy fonts (keep public/fonts for runtime)
COPY --from=build /app/public ./public

CMD ["node", ".output/server/index.mjs"]

