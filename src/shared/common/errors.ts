// errors.ts
// ---------------------------
// Classi di errore custom per Fastify CRUD operations
// Include esempi di utilizzo commentati
// ---------------------------

/**
 * NotFoundError - 404
 * Usato quando un record non viene trovato.
 * Esempio:
 *   if (!player) throw new NotFoundError(`Player con id ${id} non trovato`);
 */
export class NotFoundError extends Error {
  public statusCode = 404;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

/**
 * BadRequestError - 400
 * Usato quando i dati inviati dal client non sono validi.
 * Esempio:
 *   if (!name || name.length < 3) {
 *     throw new BadRequestError('Il nome del player deve avere almeno 3 caratteri');
 *   }
 */
export class BadRequestError extends Error {
  public statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

/**
 * UnauthorizedError - 401
 * Usato quando il client non è autenticato.
 * Esempio:
 *   if (!request.user) throw new UnauthorizedError();
 */
export class UnauthorizedError extends Error {
  public statusCode = 401;
  constructor(message: string = "Non autenticato") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * ForbiddenError - 403
 * Usato quando il client non ha i permessi per l'azione richiesta.
 * Esempio:
 *   if (player.ownerId !== request.user.id) {
 *     throw new ForbiddenError('Non puoi modificare questo player');
 *   }
 */
export class ForbiddenError extends Error {
  public statusCode = 403;
  constructor(message: string = "Accesso vietato") {
    super(message);
    this.name = "ForbiddenError";
  }
}

/**
 * ConflictError - 409
 * Usato quando c'è un conflitto, ad esempio record già esistente.
 * Esempio:
 *   if (await db.findPlayerByEmail(email)) {
 *     throw new ConflictError(`Esiste già un player con email ${email}`);
 *   }
 */
export class ConflictError extends Error {
  public statusCode = 409;
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}

/**
 * InternalServerError - 500
 * Usato come fallback per errori lato server imprevisti.
 * Esempio:
 *   try {
 *     await db.save(player);
 *   } catch (err) {
 *     throw new InternalServerError();
 *   }
 */
export class InternalServerError extends Error {
  public statusCode = 500;
  constructor(message: string = "Errore interno del server") {
    super(message);
    this.name = "InternalServerError";
  }
}
