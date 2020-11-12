# WAS THIS
# ---------
# FROM nginx:alpine
# WORKDIR /usr/share/nginx/html
# COPY build /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/nginx.conf

# Install Node Image
FROM node:14-alpine as client

# Working directory inside the container
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ENV REACT_APP_GA_MEASUREMENT_ID G-44T7WRKVR0

# Copy over the package.json files
COPY ./package*.json /app/

# Install dependencies
RUN npm install --silent

RUN npm install react-scripts -g --silent

# Copy everything
COPY . .

# Build the application
RUN npm run build

# Build nginx server
FROM nginx:latest

EXPOSE 80

# Copy all the contents from the build directory into the web root
COPY --from=client /app/build/ /var/www/html

COPY ./nginx/default.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]