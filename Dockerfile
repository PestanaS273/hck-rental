# syntax=docker/dockerfile:1

# ── Build ─────────────────────────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Variables de build (Coolify: marcar como "Build Variable"). Ver scripts/prerender.mjs.
ARG VITE_SITE_URL=https://hckrental.spestanam.com
ARG VITE_GA_ID=
ARG VITE_GSC_VERIFICATION=
ENV VITE_SITE_URL=$VITE_SITE_URL \
    VITE_GA_ID=$VITE_GA_ID \
    VITE_GSC_VERIFICATION=$VITE_GSC_VERIFICATION
RUN npm run build

# ── Serve ─────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/healthz || exit 1
