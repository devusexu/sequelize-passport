# sequelize-practice
CRUD with Sequelize & Express

## Entity Relation Diagram
```mermaid
erDiagram
    USER ||--o{ BOOK : "have"

    USER {
        int id pk
        varchar(255) name
        varchar(255) email
        varchar(255) password
    }

    BOOK {
        int id pk
        int ownerId fk "reference id in USER"
        varchar(255) title
        varchar(255) author
    }
```
## Things I practiced
### Express
- middleware
- router
- error handler
### Seuqelize
- model
- migration
- association & custom foreign key
### passport.js (authentication)
- local strategy (session)
### Notes generated during debugging
https://gist.github.com/devusexu/e8714ddd946e150aa77692b05490a0c7



