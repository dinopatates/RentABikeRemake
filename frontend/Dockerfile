# Set l'image de base
FROM node:22

# Dossier du frontend
WORKDIR /app

# Copier package.json pour cache
COPY frontend/package*.json ./

# Installer dépendances
RUN npm install

# Copier le reste
COPY frontend .

# Exposer port Vite
EXPOSE 5173

# Lancer Vite sur l'interface accessible depuis l'hôte
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]