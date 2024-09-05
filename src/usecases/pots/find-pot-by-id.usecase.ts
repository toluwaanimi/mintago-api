import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';

export class FindPotByIdUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Find pension pot by the given id
   * @param id
   */
  async findPotById(id: string) {
    const pot = await this.pensionPotRepository.findById(id);
    if (!pot) {
      throw new NotFoundException('Cannot find pot with the given id');
    }
    return {
      data: pot,
    };
  }
}
