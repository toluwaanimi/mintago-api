import { ILogger } from 'src/domain/logger/logger.interface';
import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';

export class GetPensionPotsUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Get all pension pots
   */
  async getPensionPots() {
    const pots = await this.pensionPotRepository.findAll();
    return {
      data: pots,
    };
  }
}
