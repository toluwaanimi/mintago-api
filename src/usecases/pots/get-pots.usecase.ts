import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { ISearchedPensionRepository } from '../../domain/repositories/searched-pension-repository.interface';
import { IUseCaseResponse } from '../../domain/adapters/use-case-response.interface';
import { PensionPotModel } from '../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../domain/models/searched-pension.model';
import { BadRequestException } from '@nestjs/common';
import { ILogger } from '../../domain/logger/logger.interface';

export class GetPotsUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly searchedPensionRepository: ISearchedPensionRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Get all pension pots and searched pensions
   */
  async getPots(): Promise<
    IUseCaseResponse<(PensionPotModel | SearchedPensionModel)[]>
  > {
    try {
      const [pensionPots, searchedPensions] = await Promise.all([
        this.pensionPotRepository.findAll(),
        this.searchedPensionRepository.findAll(),
      ]);

      return {
        data: [...pensionPots, ...searchedPensions],
      };
    } catch (e) {
      this.logger.error(GetPotsUseCase.name, 'getPots', e.message);
      throw new BadRequestException('Cannot retrieve pots at the moment');
    }
  }
}
