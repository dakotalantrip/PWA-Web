FROM node:20 as build

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Remove the Alpine image's built-in default.conf
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist/pwa-web/browser /usr/share/nginx/html

# Expose the default nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]