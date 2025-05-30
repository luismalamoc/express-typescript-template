import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTasksTable1717100000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "status",
                        type: "varchar",
                        default: "'pending'",
                        isNullable: false
                    },
                    {
                        name: "userId",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP",
                        isNullable: false
                    },
                    {
                        name: "updatedAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP",
                        isNullable: false
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks");
    }
}
