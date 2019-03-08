module.exports = {
    port: process.env.PORT,
    env: process.env.NODE_ENV || 'production',
    database: {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    logging: {
        rollbarToken: process.env.ROLLBAR_TOKEN
    },
    disableSignup: process.env.DISABLE_SIGNUP === 'true',
    jwtSecret: process.env.JWT_SECRET,
    bingGeolocationKey: process.env.BING_GEOLOCATION_KEY,
    sharedUsers: process.env.SHARE_USERS === true || process.env.SHARE_USERS === 'true' //For in house deploys. All users can access other users data
}
