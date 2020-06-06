FROM node:14-alpine

# Create directories
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set working directory to app folder, and switch to node user
WORKDIR /home/node/app
USER node

# Copy parent directory resources to app folder, and install node dependencies
COPY --chown=node:node src ./src
COPY --chown=node:node package.json .
RUN npm install -only=production

ENTRYPOINT ["node", "src/server/app.js"]
