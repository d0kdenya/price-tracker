import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPriceHistoryData1735163443358 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO price_history (product, seller, link, price, date)
            VALUES
            ('Ноутбук', 'BestSeller', 'https://example.com/product1', 999.99, '2024-04-27'),
            ('Смартфон', 'MegaStore', 'https://example.com/product2', 499.99, '2024-04-28');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM price_history WHERE product IN ('Ноутбук', 'Смартфон');
        `);
    }
}
