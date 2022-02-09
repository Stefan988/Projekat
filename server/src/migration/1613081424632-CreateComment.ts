import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateComment1613081424632 implements MigrationInterface {
    name = 'CreateComment1613081424632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `comment` (`id` int NOT NULL AUTO_INCREMENT, `content` text NOT NULL, `postId` int NOT NULL, `userId` int NULL, PRIMARY KEY (`id`, `postId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_4dd13cf5536c5ec906dba37cbef`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `categoryId` `categoryId` int NULL");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_c6fb082a3114f35d0cc27c518e0`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_1077d47e0112cad3c16bbcea6cd`");
        await queryRunner.query("ALTER TABLE `post` CHANGE `authorId` `authorId` int NULL");
        await queryRunner.query("ALTER TABLE `post` CHANGE `categoryId` `categoryId` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_c6fb082a3114f35d0cc27c518e0` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_1077d47e0112cad3c16bbcea6cd` FOREIGN KEY (`categoryId`) REFERENCES `post_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_94a85bb16d24033a2afdd5df060` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_94a85bb16d24033a2afdd5df060`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_1077d47e0112cad3c16bbcea6cd`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_c6fb082a3114f35d0cc27c518e0`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_4dd13cf5536c5ec906dba37cbef`");
        await queryRunner.query("ALTER TABLE `post` CHANGE `categoryId` `categoryId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `post` CHANGE `authorId` `authorId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_1077d47e0112cad3c16bbcea6cd` FOREIGN KEY (`categoryId`) REFERENCES `post_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_c6fb082a3114f35d0cc27c518e0` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` CHANGE `categoryId` `categoryId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("DROP TABLE `comment`");
    }

}
