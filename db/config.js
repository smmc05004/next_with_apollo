const config = {
    username: process.env.NEXT_PUBLIC_USER,
    password: process.env.NEXT_PUBLIC_PASSWORD,
    database: process.env.NEXT_PUBLIC_DB,
    host: process.env.NEXT_PUBLIC_HOST,
    port: Number(process.env.NEXT_PUBLIC_PORT),
}

export default config;