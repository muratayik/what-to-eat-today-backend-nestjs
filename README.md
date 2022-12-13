## Before running the application in your local
- All the data is coming from [MealDb](https://www.themealdb.com/api.php). Please be sure that you can access to website  
    - [Category List](https://www.themealdb.com/api/json/v1/1/categories.php)
    - [Meal list](https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood)  
    - [Meal Details](https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772) 

- Application uses PostgreSQL. An instance of postgresql must up and available. A tool (e.g. PgAdmin) can be used to be sure that PostgreSql is available.
- A database with name "what-to-eat-today" must be created. If you create a DB with another name, the DB_DATABASE inside .env.stage.dev must be changed accordingly.

## Installation
- Clone Repository  
```  
https://github.com/muratayik/what-to-eat-today-backend-nestjs.git  
```  

- Install dependencies  
```
yarn
```  

- Edit environment file. Please write correct values for these fields inside .env.stage.dev file
```
DB_HOST=xxxxxxxx.eu-central-1.rds.amazonaws.com => PostgreSQL DB Host
DB_PORT=5432                                    => PostgreSQL DB Port
DB_USERNAME=xxxxxxxxxxx                         => PostgreSQL DB Username
DB_PASSWORD=yyyyyyyyyyyyyyyy                    => PostgreSQL DB Password
DB_DATABASE=what-to-eat-today                   => PostgreSQL DB Name
JWT_SECRET=qqqqqqqqqqqqqqqqqqqqq                => Secret for JWT generation
```

- Run application  
```
yarn start:dev
```  

Application will start at localhost:3000