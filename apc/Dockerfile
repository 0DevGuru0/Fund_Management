FROM node:14.17.6-alpine as build

# add node-gyp build dependencies & upgrade npm
RUN apk update && \
    apk add --no-cache python make g++ curl git

WORKDIR /app
ENV NODE_ENV=development

# prisma prevent post install generation
ENV PRISMA_GENERATE_SKIP_AUTOINSTALL=true

ARG NEXT_PUBLIC_FUND_APPLICATION_PROCESS
ARG NEXT_PUBLIC_REPO_SERVER_ADDRESS
ARG NEXT_PUBLIC_API_SERVER_ADDRESS
ARG NEXT_PUBLIC_SERVER_ADDRESS
ARG NEXT_PUBLIC_APP_TITLE

# install dependencies
COPY apc/.npmrc ./apc/
COPY apc/package.json apc/package-lock.json ./apc/
RUN cd ./apc && npm install

WORKDIR /app/apc

ENV NODE_ENV=production

# https://iknito.atlassian.net/browse/LE-137?atlOrigin=eyJpIjoiODBjMTJmNjM4YWEwNGU3NzgwYzhjNzQyMzMxMjc4MjgiLCJwIjoiaiJ9
# ARG DRONE_COMMIT_SHA
# ARG DRONE_COMMIT_MESSAGE
# ARG DRONE_BUILD_STARTED

COPY apc/mergeWebpackConfig.js apc/babel.config.js apc/next.config.js apc/next-env.d.ts \
     apc/graphql.config.yml apc/orval.config.js \
     apc/sentry.client.config.js apc/sentry.server.config.js apc/.sentryclirc apc/sentry.properties apc/.env ./
COPY apc/tsconfig.json ./
COPY apc/typings ./typings
COPY apc/public ./public
COPY apc/src ./src

# we need prisma config to generate the prisma client in prebuild script
COPY apc/prisma ./prisma

RUN npm run build && npm prune

# ---- production stage ----
FROM node:14.17.6-alpine
ENV NODE_ENV=production

# Add tiny init process to wrap main app in production
RUN apk add --no-cache tini~=0.18
ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /app

COPY --chown=node:node --from=build /app/apc/public ./apc/public
COPY --chown=node:node --from=build /app/apc/next.config.js /app/apc/mergeWebpackConfig.js ./apc/
COPY --chown=node:node --from=build /app/apc/package.json ./apc/
COPY --chown=node:node --from=build /app/apc/node_modules ./apc/node_modules
COPY --chown=node:node --from=build /app/apc/.next ./apc/.next

# Image metadata:
ARG CI_COMMIT_SHORT_SHA
ARG CI_PIPELINE_CREATED_AT
ARG CI_PIPELINE_URL

# https://github.com/opencontainers/image-spec/blob/main/annotations.md#back-compatibility-with-label-schema
LABEL org.opencontainers.image.vendor="Avid"
LABEL org.opencontainers.image.revision=${CI_COMMIT_SHORT_SHA}
LABEL org.opencontainers.image.created=${CI_PIPELINE_CREATED_AT}
LABEL org.opencontainers.image.source=${CI_PIPELINE_URL}

# preserve metadata (build time ARGs) at runtime too.
ENV CI_COMMIT_SHORT_SHA ${CI_COMMIT_SHORT_SHA}
ENV CI_PIPELINE_CREATED_AT ${CI_PIPELINE_CREATED_AT}
ENV CI_PIPELINE_URL ${CI_PIPELINE_URL}

WORKDIR /app/apc
USER node

EXPOSE 3000
CMD [ "npm", "run", "start:production" ]
