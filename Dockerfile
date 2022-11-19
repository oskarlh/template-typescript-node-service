# syntax=docker/dockerfile:1

FROM node:18-alpine as pre-build
WORKDIR /app
COPY . .
ENV NODE_ENV=development
RUN npm install

FROM pre-build AS ci-verifier
RUN npm install
CMD ["npm", "run", "build-and-verify"]



FROM pre-build as build
RUN npm run build-with-typechecking



FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package.lock ./package.lock

COPY --from=build /app/dist ./dist
COPY --from=build /app/suppressExperimentalWarnings.cjs ./suppressExperimentalWarnings.cjs
ENV NODE_ENV production

# EXPOSE 5000
ENTRYPOINT ["npm", "run", "start"]
