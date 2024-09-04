import { ILogger } from '../../../../domain/logger/logger.interface';

export const mockLogger: jest.Mocked<ILogger> = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
};
