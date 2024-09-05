import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';

export class FilterPotsByEmployerUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Filter pension pots based on the given employer
   * @param employer Employer to filter the pension pots by
   */
  async filterPotsByEmployer(employer: string) {
    const pot = await this.filterPensionPotByEmployer(employer);
    if (pot.length === 0) {
      throw new NotFoundException('Cannot find pot with the given employer');
    }
    return {
      data: pot,
    };
  }

  private async filterPensionPotByEmployer(employer: string) {
    const pensionPot = await this.pensionPotRepository.findByEmployer(employer);
    const validPensionPot = Array.isArray(pensionPot) ? pensionPot : [];
    return [...validPensionPot];
  }
}
