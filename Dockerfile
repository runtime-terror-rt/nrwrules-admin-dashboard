# Stage 1 — deps (optional fast install with bun)
FROM oven/bun:1.1.29-alpine AS deps
WORKDIR .
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 2 — builder (Node to run Vite build)
FROM node:24-alpine AS builder
WORKDIR .

# Build args for public envs (pass via CI)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV NODE_ENV=production

# Copy node_modules from deps stage (if using bun)
COPY --from=deps /app/node_modules ./node_modules

# Copy source and build
COPY . .
RUN npm run build

# Stage 3 — runtime (nginx serves static files)
FROM nginx:stable-alpine AS runner
# Remove default content
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files (Vite default output is dist)
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: copy a custom nginx config if you want to override defaults
# COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- --timeout=2 http://127.0.0.1:3000/ || exit 1

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
