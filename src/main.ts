import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MedTech')
    .setDescription(
      'Главное назначение сайта заключается в том, чтобы поведать пользователям о медицинской клинике Prime Clinic, о преимуществах ее мобильного приложения для удобства использования в отличии от других подобных ресурсов в App Store. Мобильное приложение предоставляет помощь формирования положительного опыта беременности, сохранение своего обычного физического и социокультурного состояния во  время  беременности, лечение  патологии  беременности  и  сопутствующих заболеваний, но  и санитарное просвещение, а также пропаганда здорового образа жизни.',
    )
    .setVersion('3.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT;
  await app.listen(PORT || 3000, () => {
    Logger.log(`Server started on PORT ${PORT}`);
  });
}
bootstrap();
