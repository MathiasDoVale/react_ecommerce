# Sneaker E-Commerce


###### This is a shoes e-commerce made it with django, drf (django rest framework) and React. Postgresql was used as the database. The project is not finished, feel free to create a pull request to add functionality or testing.

## Architecture diagram
![architecture_diagram](https://github.com/MathiasDoVale/react_ecommerce/assets/25461133/d200a938-e716-4489-acc5-aa6c3d54f35a)

### Steps to run it
#### 1. Requirements: docker, docker-compose
#### 2. Create a .env file(django_ecommerce/ecommerce/ecommerce/.env) with the following personal info to run it succesfully.


```python
SECRET_KEY='' (defined automatically in settings.py when the project was created, you can use anything)

POSTGRESQL_NAME='' (name of your database)

POSTGRESQL_USER='' (user to access)

POSTGRESQL_PASS='' (user pass)

POSTGRESQL_HOST='db'

POSTGRESQL_PORT=5432 (selected in postgreSQL setup)

DEBUG=True
```

#### 3. Run ```docker-compose build ```
#### 4. Run ```docker-compose up```

