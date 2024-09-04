import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CalculatePensionPotBalanceDto {
  @ApiProperty({
    description:
      'The number of years for which the pension pot balance should be forecasted for',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;
}

export class GetPotsDto {
  @ApiPropertyOptional({
    description: 'The amount to filter pots by',
    example: 1000,
  })
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({
    description: 'Direction of filtering, either less or greater',
    example: 'greater',
  })
  @IsEnum(['less', 'greater'])
  @IsOptional()
  direction?: 'less' | 'greater';

  @ApiPropertyOptional({
    description: 'The employer to filter pots by',
    example: 'Acme Corp',
  })
  @IsString()
  @IsOptional()
  employer?: string;

  @ApiPropertyOptional({
    description: 'The pension provider to filter pots by',
    example: 'PensionProvider Inc.',
  })
  @IsString()
  @IsOptional()
  provider?: string;

  @ApiPropertyOptional({
    description: 'The name of the pension pot',
    example: 'Retirement Fund',
  })
  @IsOptional()
  name?: string;
}
