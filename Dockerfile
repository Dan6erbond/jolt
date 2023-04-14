FROM golang:1.18 as backend-builder

WORKDIR /build

COPY ./server/go.mod .
COPY ./server/go.sum .

RUN go mod download

COPY ./server .

RUN CGO_ENABLED=0 GOOS=linux go build -o ./jolt

FROM node:18 as frontend-builder

WORKDIR /build

ENV DOCKER_BUILD=true

COPY ./frontend/package.json package.json
COPY ./frontend/yarn.lock yarn.lock

RUN yarn

COPY ./frontend .
COPY --from=backend-builder /build/graph ./schema

RUN yarn build

FROM alpine:3.17

ENV GO_ENV=production
ENV JOLT_FRONTEND=/jolt/frontend

WORKDIR /jolt

COPY --from=frontend-builder /build/dist ./frontend
COPY --from=backend-builder /build/jolt ./jolt

EXPOSE 5001

ENTRYPOINT [ "./jolt" ]
CMD [ "server" ]
