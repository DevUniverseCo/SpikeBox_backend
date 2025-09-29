import { Kysely } from "kysely";
import { PostgresClient } from "../../shared/infrastructure/persistence/postgres/client";
import { Database } from "../../shared/infrastructure/persistence/postgres/database";
import { CreatePlayer, Player } from "./domain";
import { PlayersPostgresDao } from "./persistence/postgres/dao";

/**
 * Esempio di utilizzo del DAO PostgreSQL per Players
 */
export class PlayersService {
  private playersDao: PlayersPostgresDao;

  constructor(postgresClient: PostgresClient) {
    const db: Kysely<Database> = postgresClient.getKysely();
    this.playersDao = new PlayersPostgresDao(db);
  }

  /**
   * Crea un nuovo player
   */
  async createPlayer(createPlayer: CreatePlayer): Promise<Player> {
    return await this.playersDao.create(createPlayer);
  }

  /**
   * Trova tutti i players
   */
  async getAllPlayers(): Promise<Player[]> {
    return await this.playersDao.findAll();
  }

  /**
   * Trova player per ID
   */
  async getPlayerById(id: string): Promise<Player | undefined> {
    return await this.playersDao.findById(id);
  }

  /**
   * Aggiorna player
   */
  async updatePlayer(
    id: string,
    updateData: CreatePlayer
  ): Promise<Player | undefined> {
    return await this.playersDao.update(id, updateData);
  }

  /**
   * Soft delete di un player
   */
  async deletePlayer(id: string): Promise<Player | undefined> {
    return await this.playersDao.delete(id);
  }

  /**
   * Metodi specifici per Players
   */
  async findPlayersByName(
    firstName: string,
    lastName?: string
  ): Promise<Player[]> {
    return await this.playersDao.findByName(firstName, lastName);
  }

  async findPlayersByCountry(country: string): Promise<Player[]> {
    return await this.playersDao.findByCountry(country);
  }

  async findPlayersByHeight(
    minHeight: number,
    maxHeight: number
  ): Promise<Player[]> {
    return await this.playersDao.findByHeightRange(minHeight, maxHeight);
  }

  async getPlayersWithTeamInfo(seasonId?: number) {
    return await this.playersDao.findPlayersWithTeamInfo(seasonId);
  }
}
