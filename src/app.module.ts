import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const {typeOrmConfig} = await import("./config/typeorm.config");
        return typeOrmConfig;
      }
    }),
    BookModule,
    AuthModule,
  ],
  controllers: [AppController], // Remove BookController from here
  providers: [AppService],
})
export class AppModule {}