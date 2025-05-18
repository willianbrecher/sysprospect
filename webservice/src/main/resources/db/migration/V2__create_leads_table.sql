CREATE TABLE application.leads (
    id UUID not null,
    name varchar(250) not null,
    phone varchar(50) not null,
    email varchar(100) not null,
    amount int not null,
    know_about varchar(20) not null,
    created_at timestamp not null,
    primary key (id)
);

ALTER TABLE application.leads ADD CONSTRAINT uc_name_phone_email UNIQUE(name, phone,email);