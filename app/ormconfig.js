module.exports = {
    type: 'sqlite',
    database: '/app/price_history.db',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
};