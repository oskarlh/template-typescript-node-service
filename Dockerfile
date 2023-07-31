# syntax=docker/dockerfile:1

FROM node:20-alpine as pre-build
WORKDIR /app
COPY . .
RUN NODE_ENV=development npm install

FROM pre-build AS ci-verifier
ENV NODE_ENV development
CMD ["npm", "run", "build-and-verify"]



FROM pre-build as build
RUN NODE_ENV=development npm run build



FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/suppressExperimentalWarnings.cjs ./suppressExperimentalWarnings.cjs

ENV NODE_ENV production
ENTRYPOINT ["npm", "run", "start"]
