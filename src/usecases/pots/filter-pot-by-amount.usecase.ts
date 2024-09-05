import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IUseCaseResponse } from '../../domain/adapters/use-case-response.interface';
import { PensionPotModel } from '../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../domain/models/searched-pension.model';
import { BadRequestException } from '@nestjs/common';

export class FilterPotByAmountUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Filter pension pots based on the given amount and direction
   * @param amount Amount to filter the pension pots by
   * @param direction Direction to filter the pension pots by
   */
  async filterPotByAmount(
    amount: number,
    direction: 'less' | 'greater',
  ): Promise<IUseCaseResponse<(PensionPotModel | SearchedPensionModel)[]>> {
    try {
      const pensionPots = await this.getPensionPotsByAmount(amount, direction);
      return { data: [...pensionPots] };
    } catch (error) {
      this.logger.error('Error filtering pension pots by amount', error);
      throw new BadRequestException(
        'Cannot retrieve pots by amount at the moment',
      );
    }
  }

  private getPensionPotsByAmount(
    amount: number,
    direction: 'less' | 'greater',
  ) {
    return direction === 'greater'
      ? this.pensionPotRepository.findByAmountOver(amount)
      : this.pensionPotRepository.findByAmountUnder(amount);
  }
}
