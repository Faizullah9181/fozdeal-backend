FROM node:12 as builder
RUN npm install -g typescript
RUN mkdir -p /app/server
ARG GITHUB_TOKEN
WORKDIR /app/server
COPY . /app/server

RUN npm install
RUN npm install git+https://$GITHUB_TOKEN:x-oauth-basic@github.com/Orca-Brand/Base-Packages.git#test/locals --save
RUN npm run build

ARG ENABLE_RAPYD_CONSUMER=0
ARG ENABLE_TAZAPAY_CONSUMER=0
ARG ENABLE_REFUND_CONSUMER=0
ARG ENABLE_CRON=0
ARG DEPLOYMENT_TYPE

FROM node:12-alpine
ARG ENABLE_RAPYD_CONSUMER=0
ARG ENABLE_TAZAPAY_CONSUMER=0
ARG ENABLE_REFUND_CONSUMER=0
ARG ENABLE_CRON=0
ARG DEPLOYMENT_TYPE

WORKDIR /app/server
COPY --from=builder /app/server/package.json ./package.json
COPY --from=builder /app/server/node_modules node_modules
COPY --from=builder /app/server/logs logs
COPY --from=builder /app/server/dist dist
COPY --from=builder /app/server/swagger.json ./swagger.json
COPY --from=builder /app/server/env.sh ./env.sh
COPY --from=builder /app/server/countryData.json  ./countryData.json
ENV ENABLE_RAPYD_CONSUMER=${ENABLE_RAPYD_CONSUMER}
ENV ENABLE_TAZAPAY_CONSUMER=${ENABLE_TAZAPAY_CONSUMER}
ENV ENABLE_REFUND_CONSUMER=${ENABLE_REFUND_CONSUMER}
ENV ENABLE_CRON=${ENABLE_CRON}

ENV DEPLOYMENT_TYPE=${DEPLOYMENT_TYPE}

RUN chmod +x /app/server/env.sh
RUN chmod +x /app/server/countryData.json

EXPOSE 8080
CMD ["echo ${DEPLOYMENT_TYPE}"]
CMD [ "sh","-c",". ./env.sh && npm run ${DEPLOYMENT_TYPE}" ]
