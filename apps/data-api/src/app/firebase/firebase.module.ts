import { Module, DynamicModule } from '@nestjs/common';
import { providers } from './firebase.providers';


@Module({})
export class FirebaseModule {
  static forRoot(): DynamicModule {
    return {
      module: FirebaseModule,
      providers: providers,
      exports: providers,
    };
  }
}