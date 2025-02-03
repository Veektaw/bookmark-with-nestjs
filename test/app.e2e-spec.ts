import { Test } from "@nestjs/testing"
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as pactum from 'pactum';
import { AuthDto, LoginDto } from "src/auth/dto";
import { EditUserDto } from "src/user/dto";

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
      pactum.request.setBaseUrl('http://localhost:3000');
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

        it('should throw signup error for empty email', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              password: "123"
            }) 
            .expectStatus(400);
        });

        it('should throw signup error for empty password', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              email: "veektaw@gmail.com"
            }) 
            .expectStatus(400);
        });

        it('should signup a new user', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody(dto) 
            .expectStatus(201);
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
            .post('/auth/login')
            .withBody({
              email: "veektaw@gmail.om",
              password: "123"
            }) 
            .expectStatus(403);
        });

        it('should login a new user', () => {
          return pactum
            .spec()
            .post('/auth/login')
            .withBody(dto) 
            .expectStatus(200)
            .stores('userAt', 'access_token');
        });
    });
});


    describe('User', () => {

      const dto: EditUserDto = {
        firstName: 'John',
        lastName: 'Heinz',
        email: 'veektaw@gmail.com',
        password: '123456'
     
      }
      describe('Get Me', () => {
        it('should get current user', () => {
          return pactum
            .spec()
            .get('/users/me')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}'
            })
            .withBody(dto)
            .expectStatus(200);
        });
      });

      describe('Edit User', () => {
        it('should edit a user', () => {
          return pactum
            .spec()
            .patch('/users/edit')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}'
            })
            .withBody(dto) 
            .expectStatus(200)
            // .stores('userAt', 'access_token');
        });
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