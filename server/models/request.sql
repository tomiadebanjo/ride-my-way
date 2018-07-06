CREATE TYPE request_status_allowed AS ENUM (
    'accepted',
    'pending',
    'rejected'
);

CREATE TABLE IF NOT EXISTS ride_request (
    id SERIAL PRIMARY KEY,
    request_status request_status_allowed NOT NULL,
    userId INTEGER REFERENCES users(id),
    rideId INTEGER REFERENCES rides(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE(userId,rideId)
);
