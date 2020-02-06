# NgNestChat

A simple chat app developed using Angular and NestJS supported by MongoDB. It has some basic authentication
using JWTs, but is in NO WAY production-ready.

## Running the Application

Start by copying `.env.template` to `.env` and filling in the values as needed. If you have Docker installed,
run `npm run db` to start the Mongo server. Then, run `npm run api` and `npm run client` to start the API
and UI, respectively. The app will start at http://localhost:4200
