# REACT B2

Application react réalisée dans le cadre du cours ESGI B2.

## docker-compose

1. Cloner le repo
2. Lancer le stack
`docker compose up`
3. Par défaut accessible sur `http://localhost:8080`

## Configuration

Dans le .env à la racine du repo

```
NGINX_HOST="localhost" # Hostname de l'application
NGINX_PORT="80" # Port par défaut nginx
EXPOSED_PORT="8080" # Port exposé de l'application
REACT_APP_API_HOST="http://localhost:8080/api/v1" # Url de l'api, format : http://{NGINX_HOST}:{EXPOSED_PORT}/api/v1
```
