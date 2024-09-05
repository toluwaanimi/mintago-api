import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { BadRequestException } from '@nestjs/common';
import { IUseCaseResponse } from '../../domain/adapters/use-case-response.interface';
import { PensionPotModel } from '../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../domain/models/searched-pension.model';

export class FilterPotsByPensionProviderUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
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
      const pensionPots =
        await this.pensionPotRepository.findByProvider(provider);
      return {
        data: [...pensionPots],
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
