import { Module, Global } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { envConfig } from '../environment-config/environment.config';

@Global()
@Module({
  providers: [
    {
      provide: SupabaseClient,
      useFactory: (): SupabaseClient | null => {
        const supabaseUrl = envConfig.getSupabaseUrl();
        const supabaseKey = envConfig.getSupabaseKey();

        if (!supabaseUrl || !supabaseKey) {
          console.warn(
            'Supabase URL or Key not found, skipping Supabase client initialization.',
          );
          return null;
        }

        return createClient(supabaseUrl, supabaseKey);
      },
    },
  ],
  exports: [SupabaseClient],
})
export class SupabaseModule {}
