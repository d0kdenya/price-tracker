import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePriceHistoryTable1735163095159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
      `CREATE TABLE "price_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "product" varchar NOT NULL, "seller" varchar NOT NULL, "link" varchar NOT NULL, "price" real NOT NULL, "date" varchar NOT NULL)`,
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "price_history"`);
    }
}
