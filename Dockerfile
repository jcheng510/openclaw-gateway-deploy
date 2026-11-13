FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY openclaw.mjs ./
COPY dist/ ./dist/
COPY node_modules/ ./node_modules/
COPY skills/ ./skills/
COPY docs/ ./docs/

EXPOSE 3000

CMD ["node", "openclaw.mjs", "gateway", "--port", "3000"]
