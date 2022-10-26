import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1666801579678 implements MigrationInterface {
    name = 'InitialMigration1666801579678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follows" ("creator_id" uuid NOT NULL, "follower_id" uuid NOT NULL, CONSTRAINT "PK_83bb0bff9c7807fcf24a2fa2614" PRIMARY KEY ("creator_id", "follower_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('student', 'teacher')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, "password" character varying NOT NULL, "photoUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "published" boolean NOT NULL, "srcUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" uuid, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("userId" uuid NOT NULL, "videoId" uuid NOT NULL, CONSTRAINT "PK_33565ef5d74ca26a9120aa44a62" PRIMARY KEY ("userId", "videoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cfd8e81fac09d7339a32e57d90" ON "likes" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5048b180fe14b1e90b4baae276" ON "likes" ("videoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d51deaa0c3062f5e7f60a26bf4" ON "follows" ("creator_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_54b5dc2739f2dea57900933db6" ON "follows" ("follower_id") `);
        await queryRunner.query(`ALTER TABLE "video" ADD CONSTRAINT "FK_afec9898ac698acd1414fc4f067" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_5048b180fe14b1e90b4baae2762" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_d51deaa0c3062f5e7f60a26bf47" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_54b5dc2739f2dea57900933db66" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_54b5dc2739f2dea57900933db66"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_d51deaa0c3062f5e7f60a26bf47"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_5048b180fe14b1e90b4baae2762"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_afec9898ac698acd1414fc4f067"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54b5dc2739f2dea57900933db6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d51deaa0c3062f5e7f60a26bf4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5048b180fe14b1e90b4baae276"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cfd8e81fac09d7339a32e57d90"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "video"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "follows"`);
    }

}
