FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine AS server
WORKDIR /app
COPY package* ./
RUN npm ci
COPY --from=builder ./app/dist ./dist
EXPOSE 8000
CMD ["npm", "run", "start-prod"]