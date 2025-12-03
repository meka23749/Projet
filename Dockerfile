FROM nginx:alpine

# On remplace la config par défaut de Nginx par la tienne
COPY default.conf /etc/nginx/conf.d/default.conf

# On copie le build Vite
COPY dist /usr/share/nginx/html