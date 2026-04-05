FROM oven/bun:latest AS builder
WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile
RUN bun run build



FROM oven/bun:slim
WORKDIR /app

COPY --from=builder /app/build/ /app/

CMD ["bun", "run", "."]