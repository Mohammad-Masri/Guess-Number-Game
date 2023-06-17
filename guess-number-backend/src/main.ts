import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GLOBAL_URL_PREFIX, SERVER_PORT } from './utils/config/server.config';
import { SocketIoAdapter } from './game-gateway/adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix(GLOBAL_URL_PREFIX);
  app.useWebSocketAdapter(new SocketIoAdapter(app, true));
  await app.listen(SERVER_PORT).finally(() => {
    console.log(`the server is running in http://localhost:${SERVER_PORT}`);
  });
}
bootstrap();
