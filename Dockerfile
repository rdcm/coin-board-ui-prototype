# Stage 1: Install dependencies and build the app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image to run the app
FROM node:18-alpine AS runner
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port on which the app will run
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
