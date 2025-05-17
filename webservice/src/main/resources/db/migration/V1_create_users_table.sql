CREATE SCHEMA IF NOT EXISTS application;

CREATE TABLE application.users (
    id UUID not null,
    name varchar(250) not null,
    username varchar(250) not null,
    email varchar(250) not null,
    password varchar not null,
    created_at timestamp not null,
    primary key (id)
);

ALTER TABLE application.users ADD CONSTRAINT uc_username UNIQUE(username);

INSERT INTO application.users (id, name, username, email, password, created_at)
    VALUES ('9271c098-cda7-489b-b733-3ea73ac65d73',
            'Administrator user',
            'admin',
            'admin@admin.com',
            '123456',
            '2025-05-16 00:00:00');