# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build the server-side bundle
RUN npm run build

# Stage 2: Serve
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY --from=builder /app/dist /app/dist

EXPOSE 3000

CMD ["npm", "start"]