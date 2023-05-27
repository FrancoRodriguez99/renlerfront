export const randomPhrase = () => {
  const random = Math.floor(Math.random() * 20) + 1;

  const phrases = [
    //Frases para un juego de rol medieval de fantasia con toques de humor mientras la pagina carga
    "Cargando el contenido, espere un momento...",
    "Mi perro se comio el contenido, espere un momento...",
    "Mi gato se comio el contenido, espere un momento...",
    "Los servers gratis son lentos, espere un momento...",
    "Pidiendole al Master que carge el server, espere un momento...",
    "Echando a los jugadores que no pagan, espere un momento...",
    "Pidiendole a los jugadores que no trollen, espere un momento...",
    "Pidiendole a los jugadores que no hagan meta-gaming, espere un momento...",
    `Mi Edificio Favorito es "la cola de mendoza" buscalo en la search bar de construcción esta buenardo`,
    "Tirando los dados para ver si carga, espere un momento...",
    "Tu tirada de carga fue un 1, espere un momento...",
    "Tu tirada de carga fue un 2, espere un momento...",
    "Tu tirada de carga fue un 3, espere un momento...",
    "Tu tirada de carga fue un 4, espere un momento...",
    "Tu tirada de carga fue un 5, espere un momento...",
    "Banca un toque que el bardo esta cantando, espere un momento...",
    "Lucas esta preparando planes para matar a tu personaje favorito, espere un momento...",
    "Lucas se esta preparando para matar a tu personaje favorito, espere un momento...",
    "Me sirve una banda que me tires feedback de lo que te gusta y de lo que no, espere un momento mientras cargo la pagina...",
    "Limpiando el ultimo quilombo que armaron en la mesa pasada, esperen un momento...",
  ];

  return phrases[random];
};
