import { Movie } from "@/types/movie";

type MovieMainSectionProps = {
  movie: Movie;
};

export default function MovieMainSection({ movie }: MovieMainSectionProps) {
  const formattedReleaseDate = new Date(movie.releaseDate).toLocaleDateString("es-CO");

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="grid gap-8 p-8 lg:grid-cols-[320px_1fr]">
        <div className="h-fit overflow-hidden rounded-2xl bg-gray-200">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900">{movie.title}</h1>

          <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
            <p>
              <span className="font-semibold text-gray-900">Movie ID:</span>{" "}
              {movie.id}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Duration:</span>{" "}
              {movie.duration} min
            </p>
            <p>
              <span className="font-semibold text-gray-900">Country:</span>{" "}
              {movie.country}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Release date:</span>{" "}
              {formattedReleaseDate}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Popularity:</span>{" "}
              {movie.popularity}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Genre:</span>{" "}
              {movie.genre?.type}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Genre ID:</span>{" "}
              {movie.genre?.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}