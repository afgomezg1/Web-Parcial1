export type Director = {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
};

export type MovieActor = {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
};

export type Genre = {
  id: string;
  type: string;
};

export type Platform = {
  id: string;
  name: string;
  url: string;
};

export type Review = {
  id: string;
  text: string;
  score: number;
  creator: string;
};

export type YoutubeTrailer = {
  id: string;
  name: string;
  url: string;
  duration: number;
  channel: string;
};

export type Movie = {
  id: string;
  title: string;
  poster: string;
  duration: number;
  country: string;
  releaseDate: string;
  popularity: number;
  director: Director;
  actors: MovieActor[];
  genre: Genre;
  platforms: Platform[];
  reviews: Review[];
  youtubeTrailer: YoutubeTrailer;
  prizes: {
    id: string;
    name: string;
  }[];
};

export type CreateReviewInput = {
  creator: string;
  score: number;
  text: string;
};