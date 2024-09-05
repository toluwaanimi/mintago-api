import { FilterPotsByEmployerUseCase } from '../filter-pots-by-employer.usecase';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { NotFoundException } from '@nestjs/common';
import { mockPensionPotRepository } from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';

describe('FilterPotsByEmployerUseCase', () => {
  let filterPotsByEmployerUseCase: FilterPotsByEmployerUseCase;

  beforeEach(() => {
    filterPotsByEmployerUseCase = new FilterPotsByEmployerUseCase(
      mockPensionPotRepository,
      mockLogger,
    );
  });

  it('should return a pot when found by employer in pension pots', async () => {
    const mockPensionPot: PensionPotModel = {
      id: '1',
      potName: 'Pot 1',
      amount: 10000,
      monthlyPayment: 100,
      annualInterestRate: 5,
      defaultAnnualInterestRate: 5,
      employer: 'Test Employer',
      lastUpdatedAt: '2024-01-01T00:00:00.000Z',
      isWorkplacePension: true,
      pensionProvider: { name: 'Provider 1', value: 'PROVIDER_1' },
    };

    mockPensionPotRepository.findByEmployer.mockResolvedValue([mockPensionPot]);

    const result =
      await filterPotsByEmployerUseCase.filterPotsByEmployer('Telegraph');

    expect(mockPensionPotRepository.findByEmployer).toHaveBeenCalledWith(
      'Telegraph',
    );
    expect(result.data).toEqual([mockPensionPot]);
  });

  it('should return a pot when found by employer in searched pensions', async () => {
    const mockSearchedPension: PensionPotModel = {
      annualInterestRate: 0,
      defaultAnnualInterestRate: 0,
      isWorkplacePension: false,
      monthlyPayment: 0,
      id: '3a1a354e-c1a5-4d4c-aeff-df3b3fe4d499',
      potName: 'Pension',
      pensionProvider: {
        name: null,
        value: null,
      },
      amount: 40000,
      employer: 'Telegraph',
      lastUpdatedAt: '2024-06-11T10:52:33.819',
      searchedPension: {
        id: '3a1a354e-c1a5-4d4c-aeff-df3b3fe4d499',
        pension_pot_id: '4b6004d2-58f6-45c6-9a27-045b9571ae3e',
        lastUpdatedAt: '2024-06-11T10:52:33.819',
        policyNumber: null,
        annualFee: null,
        status: 'FOUND',
        previousName: null,
        previousAddress: '12 Something St',
        foundOn: '2024-08-11T10:52:33.819',
        isDraft: false,
      },
    };

    mockPensionPotRepository.findByEmployer.mockResolvedValue([
      mockSearchedPension,
    ]);

    const result =
      await filterPotsByEmployerUseCase.filterPotsByEmployer('Telegraph');

    expect(result.data).toEqual([mockSearchedPension]);
  });

  it('should throw NotFoundException if no pot is found with the given employer', async () => {
    mockPensionPotRepository.findByEmployer.mockResolvedValue(null);

    await expect(
      filterPotsByEmployerUseCase.filterPotsByEmployer('Nonexistent Employer'),
    ).rejects.toThrow(NotFoundException);
  });
});
