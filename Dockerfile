FROM oven/bun:latest AS builder
WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile
RUN bun run build



FROM oven/bun:slim
WORKDIR /app

COPY --from=builder /app/build/ /app/
COPY package.json bun.lock /app/
COPY patches/ /app/patches

RUN bun install --production

CMD ["bun", "run", "."]