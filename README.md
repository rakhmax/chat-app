# reallab-opigi

## Prerequirements

Prepare application
```bash
$ ./prerequirements
```

## Development

See [client instruction](client/README.md)

See [server instruction](server/README.md)

## Production
Install [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)

Start application in docker containers
```bash
$ docker-compose -f "docker-compose.yml" up -d --build
```
