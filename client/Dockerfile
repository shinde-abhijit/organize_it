# Dockerfile.client
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy all React files
COPY . .

# Build the React app
RUN npm run build

# Serve with a lightweight server
RUN npm install -g serve

# Make entrypoint script executable
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
