import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePriceHistoryDto } from '../price-history/dto/create.price-history.dto';
import { Context, Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { PriceHistoryService } from '../price-history/price-history.service';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: Telegraf<Context>;

  constructor(
    private readonly priceHistoryService: PriceHistoryService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (!token) {
      throw new Error(
        'TELEGRAM_BOT_TOKEN не установлен в переменных окружения.',
      );
    }

    this.bot = new Telegraf(token);

    this.bot.start((ctx) =>
      ctx.reply(
        'Добро пожаловать! Используйте /add для добавления данных или /get для получения данных.',
      ),
    );

    this.bot.command('add', (ctx) => {
      ctx.reply(
        'Отправьте данные в формате JSON:\n{ "product": "Товар", "seller": "Продавец", "link": "Ссылка", "price": 100, "date": "2024-04-27" }',
      );
    });

    this.bot.command('get', async (ctx) => {
      try {
        const histories = await this.priceHistoryService.findAll();
        if (histories.length === 0) {
          await ctx.reply('История цен пуста.');
          return;
        }
        let response = 'История цен:';
        histories.forEach((item) => {
          response += `\n\nID: ${item.id}\nТовар: ${item.product}\nПродавец: ${item.seller}\nЦена: ${item.price}\nДата: ${item.date}\nСсылка: ${item.link}`;
        });
        await ctx.reply(response);
      } catch (error) {
        console.error('Ошибка при выполнении команды /get:', error);
        await ctx.reply('Произошла ошибка при получении данных.');
      }
    });

    this.bot.on('text', async (ctx) => {
      const message = ctx.message.text;
      try {
        const data: CreatePriceHistoryDto = JSON.parse(message);
        await this.priceHistoryService.create(data);
        ctx.reply('Данные успешно добавлены.');
      } catch (error) {
        console.error(error);
        ctx.reply(
          'Ошибка при добавлении данных. Убедитесь, что формат JSON верный и все поля присутствуют.',
        );
      }
    });

    this.bot.launch();
    console.log('Telegram-бот запущен.');
  }
}
