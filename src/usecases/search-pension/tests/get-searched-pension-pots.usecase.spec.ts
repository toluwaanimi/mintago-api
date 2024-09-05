import { GetSearchedPensionPotsUseCase } from '../get-searched-pension-pots.usecase';
import { mockSearchedPensionRepository } from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';
import { PensionPotModel } from '../../../domain/models/pension-pot.model';

describe('GetSearchedPensionPotsUseCase', () => {
  let getSearchedPensionPotsUseCase: GetSearchedPensionPotsUseCase;

  beforeEach(() => {
    getSearchedPensionPotsUseCase = new GetSearchedPensionPotsUseCase(
      mockSearchedPensionRepository,
      mockLogger,
    );
  });

  it('should return all searched pension pots', async () => {
    const mockSearchedPensions: PensionPotModel[] = [
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

    mockSearchedPensionRepository.findSearchPension.mockResolvedValue(
      mockSearchedPensions,
    );

    const result = await getSearchedPensionPotsUseCase.getSearchedPensionPots();

    expect(mockSearchedPensionRepository.findSearchPension).toHaveBeenCalled();
    expect(result.data).toEqual(mockSearchedPensions);
  });
});
