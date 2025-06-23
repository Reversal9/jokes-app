# ---------- Base stage (shared) ----------
FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY ./prisma ./prisma

# ---------- Dev stage ----------
FROM base AS dev
ENV NODE_ENV=development

# Install all dependencies including dev
RUN npm install

COPY . .

RUN npx prisma generate

# Install nodemon
RUN npm install -g nodemon

EXPOSE 3000

CMD ["nodemon", "src/index.js"]

# ---------- Production stage ----------
FROM base AS prod
ENV NODE_ENV=production

# Install only production dependencies
RUN npm install --production

# Copy source code
COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "src/index.js"]
