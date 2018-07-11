CREATE TABLE IF NOT EXISTS rides(
    id serial PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    destination VARCHAR(255) NOT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    departure_time TIME WITHOUT TIME ZONE NOT NULL,
    departure_date date NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() 
)

