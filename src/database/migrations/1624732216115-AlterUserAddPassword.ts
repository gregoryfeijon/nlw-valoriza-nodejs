import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const columnName = "password";
const tableName = "users";

export class AlterUserAddPassword1624732216115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            `${tableName}`,
            new TableColumn({
                name: `${columnName}`,
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", `${columnName}`);
    }

}
