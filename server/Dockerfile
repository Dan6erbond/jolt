FROM golang:1.18-alpine

ENV JOLT_ENABLE_FRONTEND=false

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY ./ ./

RUN go build -o ./jolt

EXPOSE 5001

ENTRYPOINT [ "./jolt" ]
CMD [ "server" ]
