import { ISearchedPensionRepository } from '../../domain/repositories/searched-pension-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';

export class FilterSearchPensionByStatusUsecase {
  constructor(
    private readonly searchedPensionRepository: ISearchedPensionRepository,
    private readonly logger: ILogger,
  ) {}

  /** Filter pension pots based on the given status */
  async filterPensionPotByStatus() {
    const pot = await this.searchedPensionRepository.findByStatus('FOUND');
    if (!pot) {
      throw new NotFoundException(
        'Cannot find pot with the given status FOUND',
      );
    }
    return {
      data: pot,
    };
  }
}
