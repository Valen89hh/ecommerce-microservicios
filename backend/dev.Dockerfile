# dev.Dockerfile (Laravel)
FROM php:8.2-fpm-alpine AS base

# 1. Instala extensiones y utilidades del sistema
RUN apk add --no-cache \
      bash \
      git \
      oniguruma-dev \
      libpng-dev \
      libjpeg-turbo-dev \
      freetype-dev \
      zip \
      unzip \
    && docker-php-ext-configure gd \
         --with-freetype \
         --with-jpeg \
    && docker-php-ext-install \
         pdo_mysql mbstring exif pcntl bcmath gd

# 2. Copia Composer (desde la imagen oficial) y añade al PATH
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# 3. Etapa de dependencias: copia solo composer.json y lock para cachear instalación
FROM base AS deps
COPY composer.json composer.lock ./
RUN composer install \
      --prefer-dist \
      --no-interaction \
      --no-scripts \
      --no-progress \
      --ignore-platform-reqs

# 4. Etapa de desarrollo: copia el resto del código y configura el servidor de dev
FROM base AS dev
WORKDIR /var/www/html

# Copiamos las dependencias ya instaladas
COPY --from=deps /var/www/html/vendor ./vendor

# Copiamos todo el proyecto
COPY . .

# Permisos (importante si montas volúmenes desde Windows/macOS)
RUN chown -R www-data:www-data storage bootstrap/cache

# Expone el puerto de artisan serve
EXPOSE 8000

# En desarrollo usamos artisan serve
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
