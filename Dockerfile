# --- build the React client ---
FROM node:20-alpine AS client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client ./
COPY shared ../shared
RUN npm run build

# --- run the API (also serves the built client) ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev
COPY server ./server
COPY shared ./shared
COPY --from=client /app/client/dist ./client/dist
USER node
EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://localhost:5000/api/health || exit 1
CMD ["node", "server/src/index.js"]
