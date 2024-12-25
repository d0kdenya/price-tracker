import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePriceHistoryDto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsString()
  @IsNotEmpty()
  seller: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  date: string;
}
