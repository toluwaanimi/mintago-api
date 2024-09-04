import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { ISearchedPensionRepository } from '../../domain/repositories/searched-pension-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { BadRequestException } from '@nestjs/common';
import { IUseCaseResponse } from '../../domain/adapters/use-case-response.interface';
import { PensionPotModel } from '../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../domain/models/searched-pension.model';

export class FilterPotsByPensionProviderUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly searchedPensionRepository: ISearchedPensionRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Filter pension pots based on the given pension provider
   * @param provider Pension provider to filter the pension pots by
   */
  async filterPotsByPensionProvider(
    provider: string,
  ): Promise<IUseCaseResponse<(PensionPotModel | SearchedPensionModel)[]>> {
    try {
      const [pensionPots, searchedPensions] = await Promise.all([
        this.pensionPotRepository.findByProvider(provider),
        this.searchedPensionRepository.findByProvider(provider),
      ]);

      return {
        data: [...pensionPots, ...searchedPensions],
      };
    } catch (e) {
      this.logger.error(
        FilterPotsByPensionProviderUseCase.name,
        'filterPotsByPensionProvider',
        e.message,
      );
      throw new BadRequestException('Cannot retrieve pots at the moment');
    }
  }
}
