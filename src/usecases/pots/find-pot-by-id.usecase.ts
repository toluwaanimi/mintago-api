import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { ISearchedPensionRepository } from '../../domain/repositories/searched-pension-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';

export class FindPotByIdUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly searchedPensionRepository: ISearchedPensionRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Find pension pot by the given id
   * @param id
   */
  async findPotById(id: string) {
    const pot = await this.findPensionPotById(id);
    if (!pot) {
      throw new NotFoundException('Cannot find pot with the given id');
    }
    return {
      data: pot,
    };
  }

  private async findPensionPotById(id: string) {
    const [pensionPot, searchedPension] = await Promise.all([
      this.pensionPotRepository.findById(id),
      this.searchedPensionRepository.findById(id),
    ]);

    return pensionPot || searchedPension;
  }
}
