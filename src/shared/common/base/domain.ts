export type Base = {
  id?: number; // ID per le entità salvate nel database
  locked: boolean;
  lockedAt?: Date;
};
