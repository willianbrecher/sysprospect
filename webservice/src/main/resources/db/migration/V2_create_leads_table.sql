CREATE TABLE application.leads (
    id UUID not null,
    name varchar(250) not null,
    phone varchar(50) not null,
    email varchar(100) not null,
    amount int not null,
    know_about varchar(20) not null,
    about varchar(250)
    created_at timestamp not null,
    primary key (id)
);