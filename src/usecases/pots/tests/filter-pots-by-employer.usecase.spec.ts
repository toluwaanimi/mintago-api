import { FilterPotsByEmployerUseCase } from '../filter-pots-by-employer.usecase';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../../domain/models/searched-pension.model';
import { NotFoundException } from '@nestjs/common';
import {
  mockPensionPotRepository,
  mockSearchedPensionRepository,
} from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';

describe('FilterPotsByEmployerUseCase', () => {
  let filterPotsByEmployerUseCase: FilterPotsByEmployerUseCase;

  beforeEach(() => {
    filterPotsByEmployerUseCase = new FilterPotsByEmployerUseCase(
      mockPensionPotRepository,
      mockSearchedPensionRepository,
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
    mockSearchedPensionRepository.findByEmployer.mockResolvedValue(null);

    const result =
      await filterPotsByEmployerUseCase.filterPotsByEmployer('Test Employer');

    expect(mockPensionPotRepository.findByEmployer).toHaveBeenCalledWith(
      'Test Employer',
    );
    expect(result.data).toEqual([mockPensionPot]);
  });

  it('should return a pot when found by employer in searched pensions', async () => {
    const mockSearchedPension: SearchedPensionModel = {
      annualFee: 0,
      policyNumber: '',
      id: '2',
      potName: 'Searched Pot 1',
      amount: 5000,
      annualInterestRate: 3,
      defaultAnnualInterestRate: 3,
      employer: 'Test Employer',
      lastUpdatedAt: '2024-01-01T00:00:00.000Z',
      pensionProvider: { name: 'Provider 2', value: 'PROVIDER_2' },
      status: 'FOUND',
      foundOn: '2024-01-01T00:00:00.000Z',
      isDraft: false,
      previousName: null,
      previousAddress: 'Some Address',
    };

    mockPensionPotRepository.findByEmployer.mockResolvedValue(null);
    mockSearchedPensionRepository.findByEmployer.mockResolvedValue([
      mockSearchedPension,
    ]);

    const result =
      await filterPotsByEmployerUseCase.filterPotsByEmployer('Test Employer');

    expect(mockSearchedPensionRepository.findByEmployer).toHaveBeenCalledWith(
      'Test Employer',
    );
    expect(result.data).toEqual([mockSearchedPension]);
  });

  it('should throw NotFoundException if no pot is found with the given employer', async () => {
    mockPensionPotRepository.findByEmployer.mockResolvedValue(null);
    mockSearchedPensionRepository.findByEmployer.mockResolvedValue(null);

    await expect(
      filterPotsByEmployerUseCase.filterPotsByEmployer('Nonexistent Employer'),
    ).rejects.toThrow(NotFoundException);
  });
});
