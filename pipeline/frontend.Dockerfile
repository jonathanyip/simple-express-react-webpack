FROM nginx:alpine

RUN mkdir -p /etc/nginx/templates
COPY pipeline/templates/default.conf.template /etc/nginx/templates

# You MUST build assets first, before building this dockerfile
COPY build/prod/frontend /usr/share/nginx/html
