version 16.8 is working

# Madinah Best

> CRUD - Create Read Update Delete  
> REST Api - обращение к серверу за данными

## REST Api

- users
- program
- topics
- notes

## Roles

- superadmin
- admin
- teacher
- user

### superadmin

Superadmin can all REST Api **CRUD**  
Another role can (Notice-1)

- **UD** he own documents and documents his users own
- **R** documents of other which **publish=true**

### admin

All Rest Api (Notice-1)  
**CR** users only with **teacher** or **user** role

### teacher

All Rest Api (Notice-1)  
Cant **CR** users

### user

Only can **R**
