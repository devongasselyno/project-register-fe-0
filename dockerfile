# install environment
FROM node:14.15.1 as install

# ARG APP_VERSION_ACCESS=0

# ENV REACT_APP_VERSION_ACCESS=$REACT_APP_VERSION_ACCESS

# ENV REACT_APP_NAME=$REACT_APP_NAME

WORKDIR /usr/app

# COPY package*.json ./

# RUN npm ci --silent 

#COPY build /usr/app/build

#COPY default.conf /usr/app/default.conf 

# COPY custom_modules/webpack.config.js ./node_modules/react-scripts/config/webpack.config.js

COPY . .

RUN npm install

RUN npm run build

FROM nginx:stable-alpine
 
COPY --from=install /usr/app/build /usr/share/nginx/html

COPY --from=install /usr/app/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# COPY generate_config_js.sh ./
# COPY template-env.txt ./
COPY .env .env

# RUN apk add --no-cache bash && \
#   chmod +x generate_config_js.sh

# RUN apk add --no-cache bash

EXPOSE 80

# CMD ["/bin/bash", "-c", "/usr/share/nginx/html/generate_config_js.sh && nginx -g \"daemon off;\""]