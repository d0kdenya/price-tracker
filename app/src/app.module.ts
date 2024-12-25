import { Module } from '@nestjs/common';
import { PriceHistoryModule } from './price-history/price-history.module';
import { PriceHistory } from './price-history/entities/price-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'sqlite',
        database: '/app/price_history.db',
        entities: [PriceHistory],
        synchronize: false,
        migrations: ['dist/migrations/*{.ts,.js}'],
      }),
      dataSourceFactory: async () => AppDataSource,
    }),
    PriceHistoryModule,
    BotModule,
  ],
})
export class AppModule {}
