import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAddressExample1635262087281 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "physical_address" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "street" character varying NOT NULL, "id" SERIAL NOT NULL, CONSTRAINT "PK_6d65bd5d55a02ee9ce8cc9ff9f8" PRIMARY KEY ("id"))`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "physical_address"`, undefined);
   }

}
