import { Module } from '@nestjs/common';
import { AppController } from './controllers';
import { AppService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from './socket';
import { DB_CONFIG } from "./configs";
import { DbStorage } from "./storages";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    ...DB_CONFIG,
    entities: [],
})],
  controllers: [AppController],
  providers: [AppService, EventsGateway, DbStorage],
})
export class AppModule {
  constructor () {}
}
