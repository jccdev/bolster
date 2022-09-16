# bolster
Tested and ran with Node version 16.

### UI Instructions

`cd ./ui`

`yarn install`

or 

`npm install`

Start the ui dev server

`yarn dev`


### API Instructions

`cd ./ui`

`yarn install`

or

`npm install`

Start the api server

`yarn api-start`

or

`npm run api-start`


### DB Setup

Run the following commands in psql

`create database bolster;`

```
create table scans
(
    id integer generated always as identity constraint scans_pk primary key,
    source_url text not null,
    snapshot text,
    created_at timestamp not null,
    updated_at timestamp not null,
    deleted boolean not null,
    destination_url text,
    ip_address text,
    ssl_info jsonb,
    html_content text,
    natural_language_content text
);
```
