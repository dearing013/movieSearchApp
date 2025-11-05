# FROM node:18.20.2-alpine

# WORKDIR /frontend

# COPY public/ /frontend/public
# COPY src/ /frontend/src
# COPY package.json /frontend/

# RUN npm install --force

# CMD ["npm", "start"]


# FROM node:18-alpine
 
# # Set the working directory inside the container
# WORKDIR /frontend
 
# # Copy package.json and package-lock.json
# COPY package*.json ./
 
# # Install dependencies
# RUN npm install
 
# # Copy the rest of your application files
# COPY . .
 
# # Expose the port your app runs on
# EXPOSE 3000
 
# # Define the command to run your app
# CMD ["npm", "start"]


FROM node:18-alpine AS build
WORKDIR /frontend
COPY package*.json ./
RUN npm install --force
COPY . .

ENV PUBLIC_URL=.
RUN npm run build
CMD ["npm", "start"]
 
# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]