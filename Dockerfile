# Stage 1: Build
FROM node:19-alpine as build

# Define the working directory
WORKDIR /app

# Copy dependency files first to take advantage of caching
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Run necessary build steps (e.g., Swagger generation)
RUN npm run swagger

# Stage 2: Runtime
FROM node:19-alpine as runtime

# Create a non-root user
RUN adduser -D tech

# Define the working directory
WORKDIR /app

# Set the HOME environment variable to the user's home directory
ENV HOME=/home/tech
ENV NPM_CONFIG_CACHE=$HOME/.npm

# Copy necessary artifacts from the build stage
COPY --from=build /app /app

# Ensure the non-root user has access to the app directory
RUN chown -R tech:tech /app $HOME

# Switch to the non-root user
USER tech

# Expose the port where your app will run
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
