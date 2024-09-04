import {
  mockPensionPotRepository,
  mockSearchedPensionRepository,
} from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../../domain/models/searched-pension.model';
import { NotFoundException } from '@nestjs/common';
import { FindPotByIdUseCase } from '../find-pot-by-id.usecase';

describe('FindPotByIdUseCase', () => {
  let findPotByIdUseCase: FindPotByIdUseCase;

  beforeEach(() => {
    findPotByIdUseCase = new FindPotByIdUseCase(
      mockPensionPotRepository,
      mockSearchedPensionRepository,
      mockLogger,
    );
  });

  it('should return a pot when found by ID in pension pots', async () => {
    const mockPensionPot: PensionPotModel = {
      id: '1',
      potName: 'Pot 1',
      amount: 10000,
      monthlyPayment: 100,
      annualInterestRate: 5,
      defaultAnnualInterestRate: 5,
      employer: 'Employer 1',
      lastUpdatedAt: '2024-01-01T00:00:00.000Z',
      isWorkplacePension: true,
      pensionProvider: { name: 'Provider 1', value: 'PROVIDER_1' },
    };

    mockPensionPotRepository.findById.mockResolvedValue(mockPensionPot);
    mockSearchedPensionRepository.findById.mockResolvedValue(null);

    const result = await findPotByIdUseCase.findPotById('1');

    expect(mockPensionPotRepository.findById).toHaveBeenCalledWith('1');
    expect(result.data).toEqual(mockPensionPot);
  });

  it('should return a pot when found by ID in searched pensions', async () => {
    const mockSearchedPension: SearchedPensionModel = {
      annualFee: 0,
      policyNumber: '',
      id: '2',
      potName: 'Searched Pot 1',
      amount: 5000,
      annualInterestRate: 3,
      defaultAnnualInterestRate: 3,
      employer: 'Employer 2',
      lastUpdatedAt: '2024-01-01T00:00:00.000Z',
      pensionProvider: { name: 'Provider 2', value: 'PROVIDER_2' },
      status: 'FOUND',
      foundOn: '2024-01-01T00:00:00.000Z',
      isDraft: false,
      previousName: null,
      previousAddress: 'Some Address',
    };

    mockPensionPotRepository.findById.mockResolvedValue(null);
    mockSearchedPensionRepository.findById.mockResolvedValue(
      mockSearchedPension,
    );

    const result = await findPotByIdUseCase.findPotById('2');

    expect(mockSearchedPensionRepository.findById).toHaveBeenCalledWith('2');
    expect(result.data).toEqual(mockSearchedPension);
  });

  it('should throw NotFoundException if no pot is found with the given ID', async () => {
    mockPensionPotRepository.findById.mockResolvedValue(null);
    mockSearchedPensionRepository.findById.mockResolvedValue(null);

    await expect(findPotByIdUseCase.findPotById('3')).rejects.toThrow(
      NotFoundException,
    );
  });
});
