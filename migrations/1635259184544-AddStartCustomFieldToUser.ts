import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStartCustomFieldToUser1635259184544 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "customFieldsStars" integer`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customFieldsStars"`, undefined);
   }

}
