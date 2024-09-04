import { GetPotsUseCase } from '../get-pots.usecase';
import {
  mockPensionPotRepository,
  mockSearchedPensionRepository,
} from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { SearchedPensionModel } from '../../../domain/models/searched-pension.model';
import { BadRequestException } from '@nestjs/common';

describe('GetPotsUseCase', () => {
  let getPotsUseCase: GetPotsUseCase;

  beforeEach(() => {
    getPotsUseCase = new GetPotsUseCase(
      mockPensionPotRepository,
      mockSearchedPensionRepository,
      mockLogger,
    );
  });

  it('should return all pension pots and searched pensions', async () => {
    const mockPensionPots: PensionPotModel[] = [
      {
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
      },
    ];

    const mockSearchedPensions: SearchedPensionModel[] = [
      {
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
        policyNumber: '',
        annualFee: 0,
      },
    ];

    mockPensionPotRepository.findAll.mockResolvedValue(mockPensionPots);
    mockSearchedPensionRepository.findAll.mockResolvedValue(
      mockSearchedPensions,
    );

    const result = await getPotsUseCase.getPots();

    expect(mockPensionPotRepository.findAll).toHaveBeenCalled();
    expect(mockSearchedPensionRepository.findAll).toHaveBeenCalled();
    expect(result.data).toEqual([...mockPensionPots, ...mockSearchedPensions]);
  });

  it('should throw BadRequestException if an error occurs', async () => {
    mockPensionPotRepository.findAll.mockRejectedValue(
      new Error('Database error'),
    );

    await expect(getPotsUseCase.getPots()).rejects.toThrow(BadRequestException);

    expect(mockLogger.error).toHaveBeenCalledWith(
      GetPotsUseCase.name,
      'getPots',
      expect.any(String),
    );
  });
});
