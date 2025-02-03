import { Test } from "@nestjs/testing"
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as pactum from 'pactum';
import { AuthDto, LoginDto } from "src/auth/dto";

describe('App e2e', () => {

    let app: INestApplication;
    let prisma: PrismaService

    beforeAll(async () => {

      const moduleRef = await Test.createTestingModule({
        imports: [AppModule]
      }).compile();

      app = moduleRef.createNestApplication();

      app.useGlobalPipes(new ValidationPipe({
        whitelist: true
      }));

      await app.init();
      await app.listen(3000)

      prisma = app.get(PrismaService);
      await prisma.cleanDb();
    });

    afterAll(() => {
      app.close();
    });

    it.todo('Pass')

    describe('Auth', () => {
      describe('Signup', () => {
        const dto: AuthDto = {
          email: 'veektaw@gmail.com',
          password: '123456',
          firstName: 'John',
          lastName: 'Doe'
        };

        it('should signup a new user', () => {
          return pactum
            .spec()
            .post('http://localhost:3000/auth/signup')
            .withBody(dto) 
            .expectStatus(201).inspect();
        });
      });

    describe('Login', () => {
      const dto: LoginDto = {
          email: 'veektaw@gmail.com',
          password: '123456'
        };

        it('should login a new user', () => {
          return pactum
            .spec()
            .post('http://localhost:3000/auth/login')
            .withBody(dto) 
            .expectStatus(200);
        });
    });
});


    describe('User', () => {
      describe('Get Me', () => {

      });

      describe('Edit User', () => {

      });
    });

    describe('Bookmark', () => {
      describe('Get Bookmarks', () => {

      });

      describe('Create Bookmarks', () => {

      });

      describe('Get a Bookmark', () => {

      });

      describe('Edit Bookmark', () => {

      });


      describe('Delete Bookmark', () => {

      })
    });
})