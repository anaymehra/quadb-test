CREATE DATABASE quadb;

CREATE TABLE hodlinfo(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    last NUMERIC(50,10),
    buy NUMERIC(50,10),
    Sell NUMERIC(50,10),
    volume INT,
    base_unit VARCHAR(255)
);