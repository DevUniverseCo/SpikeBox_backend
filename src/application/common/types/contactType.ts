export type ContactType = {
  phone?: string;
  email?: string;
  address?: {
    label?: string; // Nome o descrizione dell’indirizzo
    latitude: number; // Latitudine
    longitude: number; // Longitudine
    mapsUrl?: string; // Link diretto a Google Maps (opzionale)
  };
};
