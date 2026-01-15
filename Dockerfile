# Install
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./
COPY drizzle.config.ts ./
RUN npm ci
COPY app ./app
COPY scripts ./scripts
RUN npm run build

# Run
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=builder /app/.next ./.next
COPY drizzle.config.ts ./
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
CMD ["npm", "start"]
