# ---- Builder Stage ----
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source & generate data
COPY . .
RUN npm run generate-data

# ---- Runtime Stage ----
FROM node:18-alpine

WORKDIR /app

# Copy only what's needed
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY package*.json ./

# Expose port and default to production
ENV NODE_ENV=production
EXPOSE 8000

CMD ["node", "src/server.js"]
