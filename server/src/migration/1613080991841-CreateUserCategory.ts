import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserCategory1613080991841 implements MigrationInterface {
    name = 'CreateUserCategory1613080991841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_category` (`id` int NOT NULL AUTO_INCREMENT, `value` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user_category`");
    }

}
