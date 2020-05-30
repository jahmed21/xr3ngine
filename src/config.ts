/* eslint-disable @typescript-eslint/restrict-template-expressions */
import path from 'path'
import url from 'url'
import { inspect } from 'util'
// Load all the ENV variables from `.env`, then `.env.local`, into process.env
import dotenv from 'dotenv-flow'
dotenv.config()

/**
 * Database configuration
 */
const db: any = {
  username: process.env.MYSQL_USER ?? 'server',
  password: process.env.MYSQL_PASSWORD ?? 'password',
  database: process.env.MYSQL_DATABASE ?? 'xrchat',
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: process.env.MYSQL_PORT ?? 3306,
  dialect: 'mysql',
  forceRefresh: process.env.FORCE_DB_REFRESH === 'true'
}
db.url = process.env.MYSQL_URL ??
  `mysql://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}`

/**
 * Server / backend configuration
 */
const server: any = {
  hostname: process.env.SERVER_HOSTNAME ?? 'localhost',
  port: process.env.SERVER_PORT ?? 3030,
  // Public directory (used for favicon.ico, logo, etc)
  publicDir: process.env.SERVER_PUBLIC_DIR ?? path.resolve(__dirname, '..', 'public'),
  // Used for CI/tests to force Sequelize init an empty database
  performDryRun: process.env.PERFORM_DRY_RUN ?? false
}
server.url = process.env.SERVER_URL ??
  url.format({ protocol: 'https', ...server })

/**
 * Client / frontend configuration
 */
const client: any = {
  url: process.env.APP_URL ??
    process.env.APP_HOST ?? // Legacy env var, to deprecate
    'http://localhost:3000'
}

/**
 * Email / SMTP configuration
 */

const email: any = {
  from: `${process.env.SMTP_FROM_NAME ?? 'MyXR.Social'}` +
    ` <${process.env.SMTP_FROM_EMAIL ?? 'noreply@myxr.email'}>`
}

/**
 * Full config
 */
const config: any = {
  db,
  server,
  client,
  email
}

console.log(inspect(config))

export default config