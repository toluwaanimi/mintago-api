import { Injectable, Logger } from '@nestjs/common';
import { envConfig } from '../config/environment-config/environment.config';
import { ILogger } from '../../domain/logger/logger.interface';

@Injectable()
export class LoggerService extends Logger implements ILogger {
  // Logs debug level messages
  debug(context: string, message: string) {
    // Check if environment is not production
    if (envConfig.getEnvironment() !== 'production') {
      // Call debug method of Logger with a prefixed message
      super.debug(`[DEBUG] ${message}, context`);
    }
  }

  // Logs info level messages
  log(context: string, message: string) {
    // Call log method of Logger with a prefixed message
    super.log(`[INFO] ${message}, ${context}`);
  }

  // Logs error level messages
  error(context: string, message: string, trace?: string) {
    // Call error method of Logger with a prefixed message and optional trace
    super.error(`[ERROR] ${message}, ${trace}, ${context}`);
  }

  // Logs warning level messages
  warn(context: string, message: string) {
    // Call warn method of Logger with a prefixed message
    super.warn(`[WARN] ${message}, ${context}`);
  }

  // Logs verbose level messages
  verbose(context: string, message: string) {
    // Check if environment is not production
    if (envConfig.getEnvironment() !== 'production') {
      // Call verbose method of Logger with a prefixed message
      super.verbose(`[VERBOSE] ${message}, ${context}`);
    }
  }
}
