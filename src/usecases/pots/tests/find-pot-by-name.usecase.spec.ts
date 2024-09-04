import { FindPotByNameUseCase } from '../find-pot-by-name.usecase';
import {
  mockPensionPotRepository,
  mockSearchedPensionRepository,
} from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../../domain/models/searched-pension.model';
import { NotFoundException } from '@nestjs/common';

describe('FindPotByNameUseCase', () => {
  let findPotByNameUseCase: FindPotByNameUseCase;

  beforeEach(() => {
    findPotByNameUseCase = new FindPotByNameUseCase(
      mockPensionPotRepository,
      mockSearchedPensionRepository,
      mockLogger,
    );
  });

  it('should return a pot when found by name in pension pots', async () => {
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

    mockPensionPotRepository.findByName.mockResolvedValue(mockPensionPot);
    mockSearchedPensionRepository.findByName.mockResolvedValue(null);

    const result = await findPotByNameUseCase.findPotByName('Pot 1');

    expect(mockPensionPotRepository.findByName).toHaveBeenCalledWith('Pot 1');
    expect(result.data).toEqual(mockPensionPot);
  });

  it('should return a pot when found by name in searched pensions', async () => {
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

    mockPensionPotRepository.findByName.mockResolvedValue(null);
    mockSearchedPensionRepository.findByName.mockResolvedValue(
      mockSearchedPension,
    );

    const result = await findPotByNameUseCase.findPotByName('Searched Pot 1');

    expect(mockSearchedPensionRepository.findByName).toHaveBeenCalledWith(
      'Searched Pot 1',
    );
    expect(result.data).toEqual(mockSearchedPension);
  });

  it('should throw NotFoundException if no pot is found with the given name', async () => {
    mockPensionPotRepository.findByName.mockResolvedValue(null);
    mockSearchedPensionRepository.findByName.mockResolvedValue(null);

    await expect(
      findPotByNameUseCase.findPotByName('Nonexistent Pot'),
    ).rejects.toThrow(NotFoundException);
  });
});
