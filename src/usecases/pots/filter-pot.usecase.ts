import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IUseCaseResponse } from '../../domain/adapters/use-case-response.interface';
import { PensionPotModel } from '../../domain/models/pension-pot.model';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { GetPotsDto } from '../../infrastructure/common/dto/pot.dto';

export class FilterPotUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Filter pension pots based on the given criteria
   * @param filter Filter criteria to apply on the pension pots
   */
  async filterPots(
    filter?: GetPotsDto,
  ): Promise<IUseCaseResponse<PensionPotModel[]>> {
    try {
      let pots: PensionPotModel[] = [];

      const filterPromises = [];

      if (filter && filter.name) {
        filterPromises.push(this.findPotByName(filter.name));
      }
      if (filter && filter.employer) {
        filterPromises.push(this.filterPotsByEmployer(filter.employer));
      }
      if (filter && filter.provider) {
        filterPromises.push(this.filterPotsByPensionProvider(filter.provider));
      }
      if (filter && filter.amount !== undefined && filter.direction) {
        filterPromises.push(
          this.filterPotByAmount(filter.amount, filter.direction),
        );
      }
      if (filterPromises.length === 0) {
        pots = await this.getAllPots();
      } else {
        const filterResults = await Promise.all(filterPromises);
        pots = this.combineFilterResults(filterResults);
      }

      if (pots.length === 0) {
        throw new NotFoundException('No pots found for the given criteria');
      }

      return { data: pots };
    } catch (error) {
      this.logger.error('Error in PensionPotService.getPots', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new BadRequestException('Cannot retrieve pots at the moment');
      }
    }
  }

  private async findPotByName(name: string): Promise<PensionPotModel[]> {
    const pensionPot = await this.pensionPotRepository.findByName(name);
    return pensionPot ? [pensionPot] : [];
  }

  private async filterPotsByEmployer(
    employer: string,
  ): Promise<PensionPotModel[]> {
    const pots = await this.pensionPotRepository.findByEmployer(employer);
    return [...pots];
  }

  private async filterPotsByPensionProvider(
    provider: string,
  ): Promise<PensionPotModel[]> {
    const pensionPots =
      await this.pensionPotRepository.findByProvider(provider);
    return [...pensionPots];
  }

  private async filterPotByAmount(
    amount: number,
    direction: 'less' | 'greater',
  ): Promise<PensionPotModel[]> {
    const pensionPots =
      direction === 'greater'
        ? await this.pensionPotRepository.findByAmountOver(amount)
        : await this.pensionPotRepository.findByAmountUnder(amount);
    return [...pensionPots];
  }

  private async getAllPots(): Promise<PensionPotModel[]> {
    return this.pensionPotRepository.findAll();
  }

  private combineFilterResults(
    results: PensionPotModel[][],
  ): PensionPotModel[] {
    const potMap: Map<string, PensionPotModel> = new Map();

    results.forEach((resultSet) => {
      resultSet.forEach((pot) => {
        potMap.set(pot.id, pot);
      });
    });

    return Array.from(potMap.values());
  }
}
