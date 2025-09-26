# Guida alla Rifattorizzazione Multi-Database

## Panoramica della Soluzione

Questa soluzione permette di utilizzare lo stesso codice di dominio con database diversi (MongoDB e PostgreSQL) attraverso l'uso di:

1. **Adapter Pattern** - Per mappare tra dominio e database specifici
2. **Factory Pattern** - Per creare repository appropriati
3. **Repository Pattern** - Per incapsulare la logica di persistenza

## Struttura File

Per ogni modulo (es. `users`), la struttura dovrebbe essere:

```
modules/users/
├── domain.ts                    # Entità del dominio (invariato)
├── container.ts                 # Configurazione DI aggiornata
├── persistence/
│   ├── factory.ts              # Factory per repository
│   ├── mappers.ts              # Mapper per database-specific types
│   ├── mongo/
│   │   ├── model.ts            # Schema Mongoose aggiornato
│   │   └── repository.ts       # Repository MongoDB
│   └── postgres/
│       ├── table.sql           # Schema PostgreSQL (invariato)
│       └── repository.ts       # Repository PostgreSQL
```

## Template per Nuovi Moduli

### 1. Mappers Template (`persistence/mappers.ts`)

\`\`\`typescript
import { YourEntity } from "../domain";
import { MongoBase, PostgresBase, DatabaseMapper } from "../../../shared/common/base/persistence/types";
import { Base } from "../../../shared/common/base/domain";

// MongoDB specific types
export type YourEntityMongoDocument = Omit<YourEntity, keyof Base> & MongoBase;

// PostgreSQL specific types  
export type YourEntityPostgresRow = Omit<YourEntity, keyof Base> & PostgresBase;

export class YourEntityMongoMapper implements DatabaseMapper<YourEntity, YourEntityMongoDocument> {
  toDomain(dbEntity: YourEntityMongoDocument): YourEntity {
    return {
      id: dbEntity._id,
      // ... map all fields from MongoDB to domain
      locked: dbEntity.locked,
      lockedAt: dbEntity.lockedAt,
      createdAt: dbEntity.createdAt,
      updatedAt: dbEntity.updatedAt,
    };
  }

  toDatabase(domainEntity: YourEntity): Partial<YourEntityMongoDocument> {
    return {
      // ... map domain fields to MongoDB (exclude base fields)
    };
  }

  toCreateDatabase(domainEntity: Omit<YourEntity, 'id' | 'createdAt' | 'updatedAt' | 'lockedAt'>): Partial<YourEntityMongoDocument> {
    return {
      // ... map domain fields for creation
      locked: domainEntity.locked,
    };
  }
}

export class YourEntityPostgresMapper implements DatabaseMapper<YourEntity, YourEntityPostgresRow> {
  toDomain(dbEntity: YourEntityPostgresRow): YourEntity {
    return {
      id: dbEntity.id.toString(),
      // ... map all fields from PostgreSQL to domain (nota snake_case conversions)
      locked: dbEntity.locked,
      lockedAt: dbEntity.locked_at,
      createdAt: dbEntity.created_at,
      updatedAt: dbEntity.updated_at,
    };
  }

  toDatabase(domainEntity: YourEntity): Partial<YourEntityPostgresRow> {
    return {
      // ... map domain fields to PostgreSQL (exclude base fields)
    };
  }

  toCreateDatabase(domainEntity: Omit<YourEntity, 'id' | 'createdAt' | 'updatedAt' | 'lockedAt'>): Partial<YourEntityPostgresRow> {
    return {
      // ... map domain fields for creation
      locked: domainEntity.locked,
      locked_at: undefined,
    };
  }
}
\`\`\`

### 2. Factory Template (`persistence/factory.ts`)

\`\`\`typescript
import { YourEntity, CreateYourEntity } from "../domain";
import { IBaseRepository } from "../../../shared/common/base/repository";
import { YourEntityMongoRepository } from "./mongo/repository";
import { YourEntityPostgresRepository } from "./postgres/repository";
import { Pool } from "pg";

export type DatabaseType = 'mongo' | 'postgres';

export class YourEntityRepositoryFactory {
  createRepository(dbType: DatabaseType, connectionOptions?: any): IBaseRepository<YourEntity, CreateYourEntity> {
    switch (dbType) {
      case 'mongo':
        return new YourEntityMongoRepository();
      case 'postgres':
        if (!connectionOptions?.pool) {
          throw new Error('PostgreSQL pool connection required');
        }
        return new YourEntityPostgresRepository(connectionOptions.pool as Pool);
      default:
        throw new Error(\`Unsupported database type: \${dbType}\`);
    }
  }
}
\`\`\`

### 3. Container Template (`container.ts`)

\`\`\`typescript
import { CreateYourEntity, YourEntity } from "./domain";
import { YourEntityRepositoryFactory } from "./persistence/factory";
import { IBaseRepository } from "../../shared/common/base/repository";
import { DatabaseConfigurationManager } from "../../shared/infrastructure/persistence/config";

const configManager = DatabaseConfigurationManager.getInstance();
const repositoryFactory = new YourEntityRepositoryFactory();

function getYourEntityRepository(): IBaseRepository<YourEntity, CreateYourEntity> {
  const config = configManager.getConfig();
  const connectionOptions = config.type === 'postgres' 
    ? { pool: configManager.getPostgresPool() }
    : undefined;
    
  return repositoryFactory.createRepository(config.type, connectionOptions);
}

export const yourEntityRepository = getYourEntityRepository();

export function createYourEntityRepository(dbType?: 'mongo' | 'postgres', connectionOptions?: any) {
  const finalDbType = dbType || configManager.getDatabaseType();
  return repositoryFactory.createRepository(finalDbType, connectionOptions);
}
\`\`\`

## Configurazione Database

Nel tuo `server.ts` o file di configurazione principale:

\`\`\`typescript
import { DatabaseConfigurationManager } from "./shared/infrastructure/persistence/config";
import { Pool } from 'pg';

// Se usi PostgreSQL
if (process.env.DATABASE_TYPE === 'postgres') {
  const pool = new Pool({
    // configurazione PostgreSQL
  });
  
  const configManager = DatabaseConfigurationManager.getInstance();
  configManager.setPostgresPool(pool);
}
\`\`\`

## Vantaggi di questa Approccio

1. **Domain invariato**: I tuoi file `domain.ts` rimangono puri e database-agnostic
2. **Flessibilità**: Puoi switchare tra database tramite configurazione
3. **Testabilità**: Ogni componente è isolato e testabile
4. **Mongoose continua a funzionare**: Mantieni i vantaggi degli schema Mongoose
5. **Type Safety**: TypeScript garantisce consistenza tra i mapping
6. **Retrocompatibilità**: Puoi migrare gradualmente modulo per modulo

## Come Procedere

1. **Inizia con un modulo** (es. `users`)
2. **Testa accuratamente** entrambi i database
3. **Migra gradualmente** altri moduli seguendo lo stesso pattern
4. **Mantieni backward compatibility** durante la transizione

## Note Importanti

- Gli ID in MongoDB sono stringhe, in PostgreSQL sono numeri - i mapper gestiscono la conversione
- PostgreSQL usa snake_case, MongoDB camelCase - i mapper gestiscono la conversione
- I timestamp sono gestiti automaticamente dai rispettivi database
- Mongoose schema validation continua a funzionare per MongoDB