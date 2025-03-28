# Build commmand template:
# podman build --build-arg API_ENDPOINT=<api_endpoint> ... --no-cache -f Dockerfile -t murfey-frontend:<version> ./

FROM docker.io/library/node:22.13.0-alpine3.20 as build
# FROM docker.io/library/node:20.11.0-alpine3.19 as build

# Set arguments and environment variables
ARG DEPLOY_TYPE="production"
ARG API_ENDPOINT="http://localhost:8000/"
ARG DEV_CONTACT="daniel.hatton@diamond.ac.uk"
ARG VERSION=0.0.1
ARG FEEDBACK_URL="http://localhost:8080/"

ENV REACT_APP_DEPLOY_TYPE=${DEPLOY_TYPE}
ENV REACT_APP_HUB_ENDPOINT=${API_ENDPOINT}
ENV REACT_APP_VERSION=${VERSION}
ENV REACT_APP_DEV_CONTACT=${DEV_CONTACT}
ENV REACT_APP_AUTH_TYPE="oidc"
ENV REACT_APP_FEEDBACK_URL=${FEEDBACK_URL}

# Set working directory to build installation in
WORKDIR /usr/src/app

# Install all Yarn dependencies listed in package.json using versions listed in
# .lock file as unless they are not sufficient to satisfy package requirements
COPY ./package.json ./yarn.lock ./
RUN yarn install --immutable --check-cache

# Copy across files needed to build the app and build it
COPY ./ ./
RUN yarn build

# Start second stage of build(?)
FROM docker.io/nginxinc/nginx-unprivileged:alpine3.20-slim
# FROM docker.io/nginxinc/nginx-unprivileged:alpine3.18-slim
COPY --from=build --chown=nginx /usr/src/app/build /usr/share/nginx/html

EXPOSE 8080
CMD [ \
    "nginx", \
        "-g", \
        "daemon off;" \
]
