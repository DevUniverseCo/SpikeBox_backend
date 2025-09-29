import { Kysely } from "kysely";
import { BasePostgresDao } from "../../../../shared/common/base/persistence/postgres-dao";
import { Database } from "../../../../shared/infrastructure/persistence/postgres/database";
import { CreatePlayer, Player } from "../../domain";

/**
 * DAO concreto per la gestione dei Players usando PostgreSQL e Kysely
 */
export class PlayersPostgresDao extends BasePostgresDao<Player, CreatePlayer> {
  constructor(db: Kysely<Database>) {
    super(db, "players");
  }

  /**
   * Mappa il risultato del database all'entità di dominio
   */
  protected mapToEntity(dbResult: any): Player {
    return {
      id: dbResult.id,
      firstName: dbResult.first_name,
      lastName: dbResult.last_name,
      birthDate: dbResult.birth_date,
      gender: dbResult.gender,
      heightCm: dbResult.height_cm,
      weightKg: dbResult.weight_kg,
      handedness: dbResult.handedness,
      country: dbResult.country,
      biography: dbResult.biography,
      imageUrl: dbResult.image_url,
      contact: dbResult.contact,
      platform: dbResult.platform,
      locked: dbResult.locked,
      lockedAt: dbResult.locked_at,
    };
  }

  /**
   * Metodi personalizzati per Players
   */

  /**
   * Trova players per nome
   */
  async findByName(firstName: string, lastName?: string): Promise<Player[]> {
    let query = this.getQueryBuilder()
      .selectAll()
      .where("first_name", "ilike", `%${firstName}%`)
      .where("locked", "=", false);

    if (lastName) {
      query = query.where("last_name", "ilike", `%${lastName}%`);
    }

    const results = await query.execute();
    return results.map((result) => this.mapToEntity(result));
  }

  /**
   * Trova players per country
   */
  async findByCountry(country: string): Promise<Player[]> {
    const results = await this.getQueryBuilder()
      .selectAll()
      .where("country", "=", country)
      .where("locked", "=", false)
      .execute();

    return results.map((result) => this.mapToEntity(result));
  }

  /**
   * Trova players per range di altezza
   */
  async findByHeightRange(
    minHeight: number,
    maxHeight: number
  ): Promise<Player[]> {
    const results = await this.getQueryBuilder()
      .selectAll()
      .where("height_cm", ">=", minHeight)
      .where("height_cm", "<=", maxHeight)
      .where("locked", "=", false)
      .execute();

    return results.map((result) => this.mapToEntity(result));
  }

  /**
   * Trova players con informazioni di team (esempio di join)
   */
  async findPlayersWithTeamInfo(
    seasonId?: number
  ): Promise<Array<Player & { teamName?: string; iscaptain?: boolean }>> {
    let query = this.database
      .selectFrom("players")
      .leftJoin("player_histories", "players.id", "player_histories.player_id")
      .leftJoin("teams", "player_histories.team_id", "teams.id")
      .select([
        "players.id",
        "players.first_name",
        "players.last_name",
        "players.birth_date",
        "players.gender",
        "players.height_cm",
        "players.weight_kg",
        "players.handedness",
        "players.country",
        "players.biography",
        "players.image_url",
        "players.contact",
        "players.platform",
        "players.locked",
        "players.locked_at",
        "teams.name as team_name",
        "player_histories.is_captain",
      ])
      .where("players.locked", "=", false);

    if (seasonId) {
      query = query.where("player_histories.season_id", "=", seasonId);
    }

    const results = await query.execute();

    return results.map((result) => ({
      ...this.mapToEntity(result),
      teamName: result.team_name || undefined,
      iscaptain: result.is_captain || false,
    }));
  }

  /**
   * Override del create per gestire la mappatura dei campi
   */
  async create(createPlayer: CreatePlayer): Promise<Player> {
    const insertData = {
      first_name: createPlayer.firstName,
      last_name: createPlayer.lastName,
      birth_date: createPlayer.birthDate,
      gender: createPlayer.gender,
      height_cm: createPlayer.heightCm,
      weight_kg: createPlayer.weightKg,
      handedness: createPlayer.handedness,
      country: createPlayer.country,
      biography: createPlayer.biography,
      image_url: createPlayer.imageUrl,
      contact: createPlayer.contact,
      platform: createPlayer.platform,
      locked: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await this.database
      .insertInto("players")
      .values(insertData as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return this.mapToEntity(result);
  }

  /**
   * Override dell'update per gestire la mappatura dei campi
   */
  async update(
    id: string,
    updatePlayer: CreatePlayer
  ): Promise<Player | undefined> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return undefined;

    const updateData = {
      first_name: updatePlayer.firstName,
      last_name: updatePlayer.lastName,
      birth_date: updatePlayer.birthDate,
      gender: updatePlayer.gender,
      height_cm: updatePlayer.heightCm,
      weight_kg: updatePlayer.weightKg,
      handedness: updatePlayer.handedness,
      country: updatePlayer.country,
      biography: updatePlayer.biography,
      image_url: updatePlayer.imageUrl,
      contact: updatePlayer.contact,
      platform: updatePlayer.platform,
      updated_at: new Date(),
    };

    const result = await this.database
      .updateTable("players")
      .set(updateData as any)
      .where("id", "=", numericId)
      .where("locked", "=", false)
      .returningAll()
      .executeTakeFirst();

    return result ? this.mapToEntity(result) : undefined;
  }
}
