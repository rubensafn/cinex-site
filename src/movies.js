// ─── PROGRAMAÇÃO SEMANAL ───────────────────────────────────────────────────
// Atualize este arquivo toda semana com a nova programação.
//
// poster: URL do poster em alta qualidade
// trailerKey: código do YouTube (parte depois de ?v=)
// sessions: horários por sala
// ──────────────────────────────────────────────────────────────────────────

export const scheduleWeek = {
  start: '2026-04-02',
  end: '2026-04-08',
}

export const movies = [
  {
    id: 'devoradores',
    title: 'Devoradores de Estrelas',
    originalTitle: 'Project Hail Mary',
    version: 'Dublado / Legendado',
    ageRating: '14',
    genre: 'Ficção Científica',
    distributor: 'Sony Pictures',
    synopsis: 'Um astronauta acorda sozinho numa nave espacial sem memória de como chegou ali. Enquanto descobre sua missão — salvar a humanidade — encontra uma forma de vida alienígena que pode ser a chave para tudo.',
    poster: 'https://image.tmdb.org/t/p/w500/bOzG3SG6gBxHGGHYiq7xXeNb1bG.jpg',
    posterFull: 'https://image.tmdb.org/t/p/original/bOzG3SG6gBxHGGHYiq7xXeNb1bG.jpg',
    trailerKey: 'uI1KofmBtYI',
    sessions: [
      { room: 1, time: '16:40', version: 'Dub' },
      { room: 2, time: '18:50', version: 'Leg' },
      { room: 2, time: '21:30', version: 'Dub' },
    ],
  },
  {
    id: 'casamento-sangrento',
    title: 'Casamento Sangrento: A Viúva',
    originalTitle: 'Ready or Not 2: Here I Come',
    version: 'Dublado',
    ageRating: '16',
    genre: 'Terror',
    distributor: 'Walt Disney',
    synopsis: 'A sequência aterrorizante de "Casamento Sangrento". Grace retorna com uma vendeta implacável — desta vez, ela é quem caça. Prepare-se para uma noite que ninguém vai esquecer.',
    poster: 'https://image.tmdb.org/t/p/w500/uUP8RqH8zOnFu042U50k4lENOTO.jpg',
    posterFull: 'https://image.tmdb.org/t/p/original/uUP8RqH8zOnFu042U50k4lENOTO.jpg',
    trailerKey: 'XGjOjk_7Y_w',
    sessions: [
      { room: 1, time: '21:15', version: 'Dub' },
    ],
  },
  {
    id: 'cara-de-um',
    title: 'Cara de um, Focinho de Outro',
    originalTitle: 'Hoppers',
    version: 'Dublado',
    ageRating: 'L',
    genre: 'Animação',
    distributor: 'Walt Disney / Pixar',
    synopsis: 'Uma animação Pixar sobre conexões improváveis e a descoberta de que às vezes você precisa ver o mundo com outros olhos — ou focinho — para entender o que realmente importa.',
    poster: 'https://image.tmdb.org/t/p/w500/ftPFJBGbldoWiiPrmesW96zBzdH.jpg',
    posterFull: 'https://image.tmdb.org/t/p/original/ftPFJBGbldoWiiPrmesW96zBzdH.jpg',
    trailerKey: 'Og-N4WaGRMU',
    sessions: [
      { room: 1, time: '14:45', version: 'Dub' },
      { room: 1, time: '19:20', version: 'Dub' },
      { room: 2, time: '12:30', version: 'Dub' },
    ],
  },
  {
    id: 'velhos-bandidos',
    title: 'Velhos Bandidos',
    originalTitle: 'Velhos Bandidos',
    version: 'Nacional',
    ageRating: '14',
    genre: 'Ação / Comédia',
    distributor: 'Paris Filmes',
    synopsis: 'Fernanda Montenegro, Ary Fontoura e Bruna Marquezine num heist brasileiro explosivo. Quatro veteranos do crime precisam de "só mais um trabalho" — e nada vai sair como planejado.',
    poster: 'https://image.tmdb.org/t/p/w500/gaozjuCdB4leAoxtulWI01vizpV.jpg',
    posterFull: 'https://image.tmdb.org/t/p/original/gaozjuCdB4leAoxtulWI01vizpV.jpg',
    trailerKey: 'PRaDV-PaG4s',
    sessions: [
      { room: 1, time: '13:00', version: 'Nac' },
      { room: 2, time: '14:25', version: 'Nac' },
    ],
  },
  {
    id: 'nuremberg',
    title: 'Nuremberg',
    originalTitle: 'Nuremberg',
    version: 'Legendado',
    ageRating: '16',
    genre: 'Drama Histórico',
    distributor: 'Diamond Films',
    synopsis: 'Rami Malek e Russell Crowe no julgamento que definiu a justiça moderna. Após a Segunda Guerra, os maiores criminosos nazistas enfrentam um tribunal sem precedentes — e o mundo assiste.',
    poster: 'https://image.tmdb.org/t/p/w500/saPapyxafNZxIPqYa2xm4QkaxpE.jpg',
    posterFull: 'https://image.tmdb.org/t/p/original/saPapyxafNZxIPqYa2xm4QkaxpE.jpg',
    trailerKey: 'koxHU2FPT6o',
    sessions: [
      { room: 2, time: '16:10', version: 'Leg' },
    ],
  },
]
