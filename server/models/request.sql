CREATE TABLE ride_request (
    id SERIAL PRIMARY KEY,
    rider_name VARCHAR(255) NOT NULL,
    request_status BOOLEAN NOT NULL,
    userId INTEGER REFERENCES users(id),
    rideId INTEGER REFERENCES rides(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
)