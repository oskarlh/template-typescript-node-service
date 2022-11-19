# syntax=docker/dockerfile:1

FROM node:18-alpine AS ci-verifier
WORKDIR /app
COPY . .
ENV NODE_ENV=development
CMD ["npm", "run", "ci-install-and-verify"]



FROM node:18-alpine as builder
WORKDIR /app
COPY . .
ENV NODE_ENV=development
RUN npm install
RUN npm run build-with-typechecking



FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package.lock ./package.lock

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/suppressExperimentalWarnings.cjs ./suppressExperimentalWarnings.cjs
ENV NODE_ENV production

# EXPOSE 5000
ENTRYPOINT ["npm", "run", "start"]
