import * as env from 'env-var';
import { config } from 'dotenv';
import { IEnvironmentInterface } from '../../../domain/config/environment.interface';

config();

class EnvironmentConfig implements IEnvironmentInterface {
  getPort(): number {
    return env.get('PORT').asInt() || 3000;
  }

  getEnvironment(): string {
    return env.get('NODE_ENV').asString();
  }

  getDatastore(): string {
    return env.get('DATASTORE').asString();
  }

  getSupabaseUrl(): string {
    return env.get('SUPABASE_URL').asString();
  }

  getSupabaseKey(): string {
    return env.get('SUPABASE_KEY').asString();
  }
}

export const envConfig = new EnvironmentConfig();
