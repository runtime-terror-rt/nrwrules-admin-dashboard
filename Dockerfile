# ============================================================
# Stage 1 — Install Dependencies
# ============================================================
FROM node:22-alpine AS deps

WORKDIR /admin

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN \
  if [ -f package-lock.json ]; then npm ci --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "❌ No lockfile found." && exit 1; \
  fi


# ============================================================
# Stage 2 — Build React / Vite App
# ============================================================
FROM node:22-alpine AS builder

WORKDIR /admin

COPY --from=deps /admin/node_modules ./node_modules
COPY . .

# Build-time env vars (non-secret only — baked into the JS bundle)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build


# ============================================================
# Stage 3 — Serve with Nginx (production)
# ============================================================
FROM nginx:1.27-alpine AS runner

# Remove default Nginx page & config
RUN rm -rf /usr/share/nginx/html/* \
 && rm -f /etc/nginx/conf.d/default.conf

# Our custom SPA-aware Nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy Vite build output from builder stage
COPY --from=builder /admin/dist /usr/share/nginx/html

# Fix runtime permissions for the built-in nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html \
 && chown -R nginx:nginx /var/cache/nginx \
 && chown -R nginx:nginx /var/log/nginx \
 && chown -R nginx:nginx /etc/nginx/conf.d \
 && touch /var/run/nginx.pid \
 && chown nginx:nginx /var/run/nginx.pid

#USER nginx

# Nginx listens on 80 — host maps whatever port it wants to this
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
