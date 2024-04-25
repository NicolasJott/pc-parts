# PC Parts API

by Nicolas Ott

## Installation

**Prerequisites**

To run this project, you will need to have the following installed:

-   [PHP 8.2](https://www.php.net/downloads.php#gpg-8.2)
-   [MySQL Community Server 8.0](https://dev.mysql.com/downloads/mysql/)
-   [Composer](https://getcomposer.org/download/)

---

### Development Database

Database connection is setup to use environment variables in a .env file. A example.env is provided that uses database and initial data variables for the following setup:

**Creating the database**

```sql
CREATE DATABASE pc_parts_db;
```

**Creating the user**

```sql
CREATE USER 'pc_parts'@'localhost' IDENTIFIED BY 'pc_parts';
```

**Grant superuser privilege**

```sql
GRANT ALL PRIVILEGES ON *.* TO 'pc_parts'@'localhost' WITH GRANT OPTION;
```

---

### Setup API

To setup PC Parts api, first clone the project and change the directory.

```sh
git clone https://github.com/NicolasJott/pc-parts.git
cd pc-parts-api
```

1. Copy `.env.example` to `.env`:

    ```shell
    cp .env.example .env
    ```

2. Install the dependencies:

    ```shell
    composer install
    ```

3. Generate application key:

    ```shell
    php artisan key:generate
    ```

4. Run database migration with seeder:

    ```shell
    php artisan migrate --seed
    ```

5. Start the local server:

    ```shell
    php artisan serve
    ```

### Viewing the Interactive API Docs

**For Swagger UI**

-   http://localhost:8000/swagger-ui

**For ReDoc**

-   http://localhost:8000/redoc
