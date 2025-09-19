export const LocationEnum = {
  ADDRESS: "address", // Indirizzo completo (via, numero civico)
  LATITUDE: "latitude", // Coordinata geografica - latitudine
  LONGITUDE: "longitude", // Coordinata geografica - longitudine
  VENUE_NAME: "venueName", // Nome del palazzetto / palestra / stadio
  CITY: "city", // Città
  PROVINCE: "province", // Provincia (es. "MI")
  COUNTRY: "country", // Paese (es. "Italy")
  POSTAL_CODE: "postalCode", // Codice postale / CAP
  CAPACITY: "capacity", // Capienza spettatori
  IMAGE_URL: "imageUrl", // Foto o immagine del palazzetto
} as const;

export type LocationEnum = (typeof LocationEnum)[keyof typeof LocationEnum];
