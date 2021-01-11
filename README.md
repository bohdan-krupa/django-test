# Test task deploying


First of all you need to install docker on your machine: https://docs.docker.com/get-docker/

Simply clone the repository:

```sh
git clone https://github.com/bohdan-krupa/django-test
cd django-test/
```


After that you need to set the secret key to the enviroments:

```sh
echo "SECRET_KEY = '<YOUR_SECRET_KEY>'" > .env
```
or you can do it manually by creating .env file and filling it as in .env.example file


Then run docker compose:

```sh
docker-compose up -d
```

Test task will then run in the background and across server restarts.

Notes:

- The `docker-compose.yaml` file currently depends on configuration files which live in the repository, as such you must have the repository cloned onto your server.
- Data for all services will be stored as docker volumes.
- Use `docker ps` to inspect the test task containers, and `docker-compose down` to teardown the deployment.