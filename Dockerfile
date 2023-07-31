# syntax=docker/dockerfile:1

FROM node:20-alpine as pre-build
WORKDIR /app
COPY . .
ENV NODE_ENV=development
RUN npm install --production=false

FROM pre-build AS ci-verifier
CMD ["npm", "run", "build-and-verify"]



FROM pre-build as build
RUN npm run build



FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package.lock ./package.lock
RUN npm install --production

COPY --from=build /app/dist ./dist
COPY --from=build /app/suppressExperimentalWarnings.cjs ./suppressExperimentalWarnings.cjs
ENV NODE_ENV production

ENTRYPOINT ["npm", "run", "start"]
