.\backend\node_modules\.bin\sequelize migration:generate --name migration_name
docker exec ticketing_app_1 npm run migrate
./backend/node_modules/.bin/sequelize seed:generate --name seed_name
docker-volume-watcher -e "*.git*" "*build*" "*node_modules*"