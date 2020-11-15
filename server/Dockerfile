FROM node:12-alpine
WORKDIR /app
COPY ["package.json", "yarn.lock", "tsconfig.json", "/app/"]
RUN apk --no-cache add --virtual builds-deps build-base python
RUN yarn --frozen-lockfile
COPY . /app
RUN yarn build
EXPOSE 8080 
USER node
CMD ["node", "build/app.js"]
