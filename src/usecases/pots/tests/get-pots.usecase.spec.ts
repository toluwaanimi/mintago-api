import { GetPotsUseCase } from '../get-pots.usecase';
import { mockPensionPotRepository } from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';
import { BadRequestException } from '@nestjs/common';

describe('GetPotsUseCase', () => {
  let getPotsUseCase: GetPotsUseCase;

  beforeEach(() => {
    getPotsUseCase = new GetPotsUseCase(mockPensionPotRepository, mockLogger);
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
      {
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
      },
    ];

    mockPensionPotRepository.findAll.mockResolvedValue(mockPensionPots);

    const result = await getPotsUseCase.getPots();

    expect(mockPensionPotRepository.findAll).toHaveBeenCalled();
    expect(result.data).toEqual([...mockPensionPots]);
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
