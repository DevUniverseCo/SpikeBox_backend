import { IBaseRepository } from "../../../../shared/common/base/repository";
import { CreateUser, UpdateUser, User } from "../../domain";
import { UserPostgresMapper, UserPostgresRow } from "../mappers";
// Assumendo che usi pg come client PostgreSQL
import { Pool } from "pg";

export class UserPostgresRepository
  implements IBaseRepository<User, CreateUser>
{
  private mapper = new UserPostgresMapper();
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(userData: CreateUser): Promise<User> {
    const query = `
      INSERT INTO users (username, email, password, role, image_url, locked)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      userData.username,
      userData.email,
      userData.password,
      userData.role,
      userData.imageUrl || null,
      false, // locked default
    ];

    const result = await this.pool.query(query, values);
    return this.mapper.toDomain(result.rows[0] as UserPostgresRow);
  }

  async findById(id: string): Promise<User | undefined> {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await this.pool.query(query, [parseInt(id)]);

    if (result.rows.length === 0) {
      return undefined;
    }

    return this.mapper.toDomain(result.rows[0] as UserPostgresRow);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await this.pool.query(query, [email]);

    if (result.rows.length === 0) {
      return undefined;
    }

    return this.mapper.toDomain(result.rows[0] as UserPostgresRow);
  }

  async update(id: string, userData: CreateUser): Promise<User | undefined> {
    const query = `
      UPDATE users 
      SET username = $2, email = $3, password = $4, role = $5, image_url = $6, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;

    const values = [
      parseInt(id),
      userData.username,
      userData.email,
      userData.password,
      userData.role,
      userData.imageUrl || null,
    ];

    const result = await this.pool.query(query, values);

    if (result.rows.length === 0) {
      return undefined;
    }

    return this.mapper.toDomain(result.rows[0] as UserPostgresRow);
  }

  async delete(id: string): Promise<User | undefined> {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const result = await this.pool.query(query, [parseInt(id)]);

    if (result.rows.length === 0) {
      return undefined;
    }

    return this.mapper.toDomain(result.rows[0] as UserPostgresRow);
  }

  async createMany(usersData: CreateUser[]): Promise<User[]> {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      const createdUsers: User[] = [];

      for (const userData of usersData) {
        const query = `
          INSERT INTO users (username, email, password, role, image_url, locked)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
        `;

        const values = [
          userData.username,
          userData.email,
          userData.password,
          userData.role,
          userData.imageUrl || null,
          false,
        ];

        const result = await client.query(query, values);
        createdUsers.push(
          this.mapper.toDomain(result.rows[0] as UserPostgresRow)
        );
      }

      await client.query("COMMIT");
      return createdUsers;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // Additional method for partial updates
  async updatePartial(
    id: string,
    userData: UpdateUser
  ): Promise<User | undefined> {
    // Costruisci query dinamica basata sui campi da aggiornare
    const fields = Object.keys(userData).filter(
      (key) => userData[key as keyof UpdateUser] !== undefined
    );

    if (fields.length === 0) {
      return this.findById(id);
    }

    const setClause = fields
      .map((field, index) => {
        const dbField = field === "imageUrl" ? "image_url" : field;
        return `${dbField} = $${index + 2}`;
      })
      .join(", ");

    const values = [
      parseInt(id),
      ...fields.map((field) => userData[field as keyof UpdateUser]),
    ];

    const query = `
      UPDATE users 
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;

    const result = await this.pool.query(query, values);

    if (result.rows.length === 0) {
      return undefined;
    }

    return this.mapper.toDomain(result.rows[0] as UserPostgresRow);
  }

  async findAll(): Promise<User[]> {
    const query = "SELECT * FROM users ORDER BY created_at DESC";
    const result = await this.pool.query(query);
    return result.rows.map((row: UserPostgresRow) => this.mapper.toDomain(row));
  }
}
