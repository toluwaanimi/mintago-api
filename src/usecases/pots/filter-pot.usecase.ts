import { IPensionPotRepository } from '../../domain/repositories/pension-pot-repository.interface';
import { ISearchedPensionRepository } from '../../domain/repositories/searched-pension-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { IUseCaseResponse } from '../../domain/adapters/use-case-response.interface';
import { PensionPotModel } from '../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../domain/models/searched-pension.model';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { GetPotsDto } from '../../infrastructure/common/dto/pot.dto';

export class FilterPotUseCase {
  constructor(
    private readonly pensionPotRepository: IPensionPotRepository,
    private readonly searchedPensionRepository: ISearchedPensionRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Filter pension pots based on the given criteria
   * @param filter Filter criteria to apply on the pension pots
   */
  async filterPots(
    filter?: GetPotsDto,
  ): Promise<IUseCaseResponse<(PensionPotModel | SearchedPensionModel)[]>> {
    try {
      let pots: (PensionPotModel | SearchedPensionModel)[] = [];

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

  private async findPotByName(
    name: string,
  ): Promise<(PensionPotModel | SearchedPensionModel)[]> {
    const [pensionPot, searchedPension] = await Promise.all([
      this.pensionPotRepository.findByName(name),
      this.searchedPensionRepository.findByName(name),
    ]);
    return pensionPot ? [pensionPot] : searchedPension ? [searchedPension] : [];
  }

  private async filterPotsByEmployer(
    employer: string,
  ): Promise<(PensionPotModel | SearchedPensionModel)[]> {
    const [pensionPots, searchedPensions] = await Promise.all([
      this.pensionPotRepository.findByEmployer(employer),
      this.searchedPensionRepository.findByEmployer(employer),
    ]);

    return [...pensionPots, ...searchedPensions];
  }

  private async filterPotsByPensionProvider(
    provider: string,
  ): Promise<(PensionPotModel | SearchedPensionModel)[]> {
    const [pensionPots, searchedPensions] = await Promise.all([
      this.pensionPotRepository.findByProvider(provider),
      this.searchedPensionRepository.findByProvider(provider),
    ]);
    return [...pensionPots, ...searchedPensions];
  }

  private async filterPotByAmount(
    amount: number,
    direction: 'less' | 'greater',
  ): Promise<(PensionPotModel | SearchedPensionModel)[]> {
    const [pensionPots, searchedPensions] = await Promise.all([
      direction === 'greater'
        ? this.pensionPotRepository.findByAmountOver(amount)
        : this.pensionPotRepository.findByAmountUnder(amount),
      direction === 'greater'
        ? this.searchedPensionRepository.findByAmountOver(amount)
        : this.searchedPensionRepository.findByAmountUnder(amount),
    ]);
    return [...pensionPots, ...searchedPensions];
  }

  private async getAllPots(): Promise<
    (PensionPotModel | SearchedPensionModel)[]
  > {
    const [pensionPots, searchedPensions] = await Promise.all([
      this.pensionPotRepository.findAll(),
      this.searchedPensionRepository.findAll(),
    ]);
    return [...pensionPots, ...searchedPensions];
  }

  private combineFilterResults(
    results: (PensionPotModel | SearchedPensionModel)[][],
  ): (PensionPotModel | SearchedPensionModel)[] {
    const potMap: Map<string, PensionPotModel | SearchedPensionModel> =
      new Map();

    results.forEach((resultSet) => {
      resultSet.forEach((pot) => {
        potMap.set(pot.id, pot);
      });
    });

    return Array.from(potMap.values());
  }
}
