FROM php:8.3-fpm

WORKDIR /var/www/html


# Dépendances système
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    && docker-php-ext-install \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définir le dossier de travail
WORKDIR /var/www

# Copier uniquement les fichiers composer (optimisation cache Docker)
COPY backend/composer.json backend/composer.lock ./

# Installer les dépendances PHP avant de copier le code, sans scripts Laravel
RUN composer install --no-dev --no-scripts --optimize-autoloader

# Copier le reste du projet
COPY backend .

# Les scripts Laravel nécessitent artisan, copié avec l'application
RUN composer dump-autoload --optimize

# Permissions Laravel (important)
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Exposer le port PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]