import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { ISearchedPensionRepository } from '../../domain/repositories/searched-pension-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IUseCaseResponse } from '../../domain/adapters/use-case-response.interface';
import { PensionPotModel } from '../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../domain/models/searched-pension.model';
import { BadRequestException } from '@nestjs/common';

export class FilterPotByAmountUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly searchedPensionRepository: ISearchedPensionRepository,
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
      const [pensionPots, searchedPensions] = await Promise.all([
        this.getPensionPotsByAmount(amount, direction),
        this.getSearchedPensionsByAmount(amount, direction),
      ]);

      return { data: [...pensionPots, ...searchedPensions] };
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

  private getSearchedPensionsByAmount(
    amount: number,
    direction: 'less' | 'greater',
  ) {
    return direction === 'greater'
      ? this.searchedPensionRepository.findByAmountOver(amount)
      : this.searchedPensionRepository.findByAmountUnder(amount);
  }
}
