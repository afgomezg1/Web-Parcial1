import { YoutubeTrailer } from "@/types/movie";

type MovieTrailerSectionProps = {
  youtubeTrailer: YoutubeTrailer;
};

export default function MovieTrailerSection({
  youtubeTrailer,
}: MovieTrailerSectionProps) {
  return (
    <section className="mt-8 rounded-2xl bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">YouTube Trailer</h2>

      <div className="mt-6 space-y-3 text-sm text-gray-700">
        <p>
          <span className="font-semibold text-gray-900">ID:</span>{" "}
          {youtubeTrailer?.id}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Name:</span>{" "}
          {youtubeTrailer?.name}
        </p>
        <p className="break-all">
          <span className="font-semibold text-gray-900">URL:</span>{" "}
          {youtubeTrailer?.url}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Duration:</span>{" "}
          {youtubeTrailer?.duration} min
        </p>
        <p>
          <span className="font-semibold text-gray-900">Channel:</span>{" "}
          {youtubeTrailer?.channel}
        </p>
      </div>
    </section>
  );
}