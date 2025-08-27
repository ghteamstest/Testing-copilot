export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.example.com' 
  : 'http://localhost:3000/api'

export const APP_CONFIG = {
  name: 'Turborepo Monorepo',
  version: '1.0.0',
  description: 'A modern monorepo built with Turborepo and Next.js',
}

export const DATABASE_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  name: process.env.DB_NAME || 'monorepo_db',
}

export const CACHE_CONFIG = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
  ttl: 3600, // 1 hour in seconds
}