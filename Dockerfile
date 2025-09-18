# Stage 1: Build Nuxt app
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the Nuxt app
RUN npx nuxi build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

# Copy built output from builder
COPY --from=builder /app/.output ./
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Expose port
EXPOSE 3000

# Start the Nuxt app
CMD ["node", ".output/server/index.mjs"]
