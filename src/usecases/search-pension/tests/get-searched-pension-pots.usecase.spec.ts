import { GetSearchedPensionPotsUseCase } from '../get-searched-pension-pots.usecase';
import { mockSearchedPensionRepository } from '../../../infrastructure/common/tests/mock/repository.mock';
import { mockLogger } from '../../../infrastructure/common/tests/mock/logger.mock';
import { SearchedPensionModel } from '../../../domain/models/searched-pension.model';

describe('GetSearchedPensionPotsUseCase', () => {
  let getSearchedPensionPotsUseCase: GetSearchedPensionPotsUseCase;

  beforeEach(() => {
    getSearchedPensionPotsUseCase = new GetSearchedPensionPotsUseCase(
      mockSearchedPensionRepository,
      mockLogger,
    );
  });

  it('should return all searched pension pots', async () => {
    const mockSearchedPensions: SearchedPensionModel[] = [
      {
        id: '1',
        potName: 'Searched Pot 1',
        amount: 5000,
        annualInterestRate: 3,
        defaultAnnualInterestRate: 3,
        employer: 'Employer 1',
        lastUpdatedAt: '2024-01-01T00:00:00.000Z',
        pensionProvider: { name: 'Provider 1', value: 'PROVIDER_1' },
        status: 'FOUND',
        foundOn: '2024-01-01T00:00:00.000Z',
        isDraft: false,
        previousName: null,
        previousAddress: 'Some Address',
        policyNumber: '',
        annualFee: 0,
      },
    ];

    mockSearchedPensionRepository.findAll.mockResolvedValue(
      mockSearchedPensions,
    );

    const result = await getSearchedPensionPotsUseCase.getSearchedPensionPots();

    expect(mockSearchedPensionRepository.findAll).toHaveBeenCalled();
    expect(result.data).toEqual(mockSearchedPensions);
  });
});
