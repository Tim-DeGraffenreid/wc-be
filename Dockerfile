# Use official Node.js image as base
FROM node:20-alpine

# Install build dependencies
# RUN apk update && \
#     apk add --no-cache \
#         build-base \
#         python3 \
#         python3-dev \
#         py3-pip
RUN mkdir -p /usr/src/wecode

# Create wecode directory
WORKDIR /usr/src/wecode

# Install Prisma globally
RUN npm install -g prisma

# Copy only package.json to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Run build script
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]
