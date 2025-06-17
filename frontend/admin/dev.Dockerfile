# **********
# base stage
# **********
FROM node:20-slim AS base

WORKDIR /app

# **********
# deps stage
# **********
FROM base AS deps

COPY package.json ./
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN if [ -f "pnpm-lock.yaml" ]; then \
        npm install -g pnpm && \
        pnpm install; \
    elif [ -f "yarn.lock" ]; then \
        npm install -g yarn && \
        yarn install; \
    elif [ -f "package-lock.json" ]; then \
        npm install; \
    else \
        npm install; \
    fi

# ***********
# inter stage
# ***********
FROM deps AS inter

COPY . .

EXPOSE 5173

# **********
# prod stage
# **********
FROM inter AS prod

RUN npm run build

# Usamos un servidor estático simple como serve
RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "5173"]

# **********
# dev stage
# **********
FROM inter AS dev

CMD ["npm", "run", "dev", "--", "--host"]
