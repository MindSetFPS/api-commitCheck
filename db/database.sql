-- Crear la base de datos
CREATE DATABASE commitcheck_db;

-- Crear la tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla de análisis de commits
CREATE TABLE commit_analyses (
    id SERIAL PRIMARY KEY,
    commit_hash VARCHAR(40) NOT NULL UNIQUE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
    lines_added INTEGER DEFAULT 0,
    lines_deleted INTEGER DEFAULT 0,
    files_modified INTEGER DEFAULT 0,
    tests_modified BOOLEAN DEFAULT FALSE,
    complex_sql_added BOOLEAN DEFAULT FALSE,
    analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);