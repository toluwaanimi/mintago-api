import { Module, Provider } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PensionPotSupabaseRepository } from './supabase/pension-pot-supabase.repository';
import { PensionPotJsonRepository } from './json/pension-pot-json.repository';
import { SearchedPensionSupabaseRepository } from './supabase/searched-pension-supabase.repository';
import { SearchedPensionJsonRepository } from './json/searched-pension-json.repository';
import { SupabaseModule } from '../config/supabase/supabase.module';
const pensionPotRepositoryProvider: Provider = {
  provide: 'PensionPotRepository',
  useFactory: (supabaseClient: SupabaseClient) => {
    return process.env.DATASTORE === 'supabase'
      ? new PensionPotSupabaseRepository(supabaseClient)
      : new PensionPotJsonRepository();
  },
  inject: [SupabaseClient],
};

const searchedPensionRepositoryProvider: Provider = {
  provide: 'SearchedPensionRepository',
  useFactory: (supabaseClient: SupabaseClient) => {
    return process.env.DATASTORE === 'supabase'
      ? new SearchedPensionSupabaseRepository(supabaseClient)
      : new SearchedPensionJsonRepository();
  },
  inject: [SupabaseClient],
};

@Module({
  imports: [SupabaseModule],
  providers: [pensionPotRepositoryProvider, searchedPensionRepositoryProvider],
  exports: [pensionPotRepositoryProvider, searchedPensionRepositoryProvider],
})
export class RepositoriesModule {}
