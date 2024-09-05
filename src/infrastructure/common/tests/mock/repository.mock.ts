import { IPensionPotRepository } from '../../../../domain/repositories/pension-pot-repository.interface';
import { ISearchedPensionRepository } from '../../../../domain/repositories/searched-pension-repository.interface';

export const mockPensionPotRepository: jest.Mocked<IPensionPotRepository> = {
  findPensionPots: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  findByAmountOver: jest.fn(),
  findByAmountUnder: jest.fn(),
  findByEmployer: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
  findByProvider: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
};

export const mockSearchedPensionRepository: jest.Mocked<ISearchedPensionRepository> =
  {
    findSearchPension: jest.fn(),
    findByStatus: jest.fn(),
    findByAmountOver: jest.fn(),
    findByAmountUnder: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmployer: jest.fn(),
    findByName: jest.fn(),
    findByProvider: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
