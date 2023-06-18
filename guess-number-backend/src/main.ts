import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GLOBAL_URL_PREFIX, SERVER_PORT } from './utils/config/server.config';
import { SocketIoAdapter } from './game-gateway/adapter';
import { ApiGameModule } from './apis/game/api-game.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_URL_PREFIX);
  app.useWebSocketAdapter(new SocketIoAdapter(app, true));

  app.enableCors();

  const swagger_config = new DocumentBuilder()
    .setTitle('Guess Number Game API')
    .build();

  const swagger_document = SwaggerModule.createDocument(app, swagger_config, {
    include: [ApiGameModule],
  });

  SwaggerModule.setup('/api/api-docs', app, swagger_document);

  await app.listen(SERVER_PORT).finally(() => {
    console.log(`the server is running in http://localhost:${SERVER_PORT}`);

    console.log(
      `swagger API Docs in http://localhost:${SERVER_PORT}${GLOBAL_URL_PREFIX}/api-docs`,
    );
  });
}
bootstrap();
