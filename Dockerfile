# Minimal runtime image that serves a pre-built Vite output (dist)
# CI must produce ./dist before running `docker build .`
FROM nginx:stable-alpine

# Clear default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output produced by CI into nginx web root
COPY dist /usr/share/nginx/html

# Expose container port 3000 to match your docker-compose mapping (host 6020 -> container 3000)
EXPOSE 3000

# Simple healthcheck probing the container's HTTP root
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- --timeout=2 http://127.0.0.1:3001/ || exit 1

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
