FROM node:14.15.1 as install

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run build

# ARG REACT_APP_HOST_IP_ADDRESS

# ENV REACT_APP_HOST_IP_ADDRESS $REACT_APP_HOST_IP_ADDRESS

# COPY build /usr/app/build

# COPY default.conf /usr/app/default.conf

# FROM nginx:stable-alpine

# COPY --from=install /usr/app/build /usr/share/nginx/html

# COPY --from=install /usr/app/default.conf /etc/nginx/conf.d/default.conf

# WORKDIR /usr/share/nginx/html

# COPY generate_config_js.sh ./
# COPY template-env.txt ./

# RUN apk add --no-cache bash && \
#   chmod +x generate_config_js.sh

# RUN apk add --no-cache bash

# EXPOSE 80

# CMD ["/bin/bash", "-c", "/usr/share/nginx/html/generate_config_js.sh && nginx -g \"daemon off;\""]

FROM nginx:stable-alpine

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

RUN python3 -m ensurepip

RUN pip3 install --no-cache --upgrade pip setuptools

RUN pip3 install python-dotenv

COPY default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=install /usr/app/build .

COPY env.py .

COPY config ./config

COPY change_asset.py .

# COPY generate_config_js.sh .

# COPY template-env.txt .

# RUN apk add --no-cache bash && \
#   chmod +x generate_config_js.sh

# RUN apk add --no-cache bash

EXPOSE 80

ENTRYPOINT [ "python", "change_asset.py" ]

CMD ["wakafplus"]
