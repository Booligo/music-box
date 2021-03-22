export const DB_CONFIG = {
    host        : process.env.DB_HOST,
    port        : Number(process.env.DB_EXTERNAL_PORT),
    username    : process.env.DB_USER,
    password    : process.env.DB_PASSWORD,
    database    : process.env.DB_NAME,
    synchronize : true,
};