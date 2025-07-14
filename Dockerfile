FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start Vite development server
CMD ["npm", "run", "dev","--","--host"]