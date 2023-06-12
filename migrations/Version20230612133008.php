<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230612133008 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__user AS SELECT id, username, roles, password, telephone, nom, prenom, ville, mail, score FROM user');
        $this->addSql('DROP TABLE user');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles CLOB NOT NULL --(DC2Type:json)
        , password VARCHAR(255) NOT NULL, telephone INTEGER NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, ville VARCHAR(255) NOT NULL, mail VARCHAR(150) NOT NULL, score INTEGER DEFAULT NULL)');
        $this->addSql('INSERT INTO user (id, username, roles, password, telephone, nom, prenom, ville, mail, score) SELECT id, username, roles, password, telephone, nom, prenom, ville, mail, score FROM __temp__user');
        $this->addSql('DROP TABLE __temp__user');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649F85E0677 ON user (username)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__user AS SELECT id, username, roles, password, telephone, nom, prenom, ville, mail, score FROM "user"');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('CREATE TABLE "user" (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles CLOB NOT NULL --(DC2Type:json)
        , password VARCHAR(255) NOT NULL, telephone INTEGER NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, ville VARCHAR(255) NOT NULL, mail VARCHAR(150) NOT NULL, score INTEGER DEFAULT NULL, capcha INTEGER NOT NULL)');
        $this->addSql('INSERT INTO "user" (id, username, roles, password, telephone, nom, prenom, ville, mail, score) SELECT id, username, roles, password, telephone, nom, prenom, ville, mail, score FROM __temp__user');
        $this->addSql('DROP TABLE __temp__user');
    }
}
