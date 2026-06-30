FROM node:20-slim

WORKDIR /app

# Install dependencies first (layer caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy project
COPY . .

EXPOSE 5173

# --host makes Vite listen on 0.0.0.0 so Docker can forward the port
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]