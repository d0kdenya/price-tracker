import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { ConfigModule } from '@nestjs/config';
import { PriceHistoryModule } from '../price-history/price-history.module';

@Module({
  imports: [PriceHistoryModule, ConfigModule],
  providers: [BotService],
})
export class BotModule {}
