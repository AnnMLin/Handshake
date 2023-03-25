# Handshake

## Getting Started

```
npm install

cd server
npm install

cd ../app
npm install

cd ..
npm start
```

## Frontend

The frontend is a very simple React application, written in Typescript. It has a Student Activity page that displays all students activity information in a table.

## Backend

The backend is an Express API. It has one endpoint:

```http
GET /index
Content-Type: application/json

{ 
    "id": "student.id",
    "first_name": "student_first_name",
    "last_name": "student_last_name",
    "check_in_time": "2022-03-04 05:06:07",
}
```

## Database

The SQLite database currently has one table 'students' with columns id(primary key), first_name, last_name and check_in_time.

To access the database from terminal:

```
cd server
sqlite3 db.sqlite
```

## Testing

```
cd server
npm run test

cd ../app
npm run test
```