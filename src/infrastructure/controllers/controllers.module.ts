import { Module } from '@nestjs/common';
import { PotController } from './pot.controller';
import { PensionPotController } from './pension-pot.controller';
import { SearchPensionController } from './search-pension.controller';
import { GeneralUsecaseProxyModule } from '../usecase-proxy/general-usecase-proxy.module';

@Module({
  imports: [GeneralUsecaseProxyModule.register()],
  controllers: [PotController, PensionPotController, SearchPensionController],
  providers: [],
})
export class ControllersModule {}
