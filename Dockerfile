# syntax=docker/dockerfile:1

FROM node:17-alpine as builder
WORKDIR /app
COPY . .
RUN cd /app

ENV NODE_ENV=production
RUN yarn run build


FROM node:17-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/.pnp.loader.mjs ./.pnp.loader.mjs
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/suppressExperimentalWarnings.cjs ./suppressExperimentalWarnings.cjs
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

# EXPOSE 5000
ENV NODE_ENV production
CMD ["yarn", "run", "start"]
