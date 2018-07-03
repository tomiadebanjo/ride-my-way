CREATE TABLE rides(
    id serial PRIMARY KEY,
    driver_name VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    departure_time TIME WITHOUT TIME ZONE NOT NULL,
    departure_date date NOT NULL,
    seats_available INTEGER NOT NULL,
    userId INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() 
)

