import { MovieActor } from "@/types/movie";
import Link from "next/link";

type Genre = {
  id: string;
  type: string;
};

type Movie = {
  id: string;
  title: string;
  poster: string;
  duration: number;
  country: string;
  releaseDate: string;
  popularity: number;
  genre: Genre;
  actors: MovieActor[];
};

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const formattedReleaseDate = new Date(movie.releaseDate).toLocaleDateString("es-CO");

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg">
      <div className="h-64 w-full bg-gray-200">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">{movie.title}</h2>

        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">Release date:</span>{" "}
            {formattedReleaseDate}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Actor:</span>{" "}
            {movie.actors[0]?.name}
          </p>
        </div>

        <div className="mt-6">
          <Link
            href={`/movies/${movie.id}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}