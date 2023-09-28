init: docker-down-clear docker-up
up: docker-up
down: docker-down
restart: down up

docker-up:
	docker-compose up -d --build
docker-down:
	docker-compose down --remove-orphans
docker-down-clear:
	docker-compose down -v --remove-orphans