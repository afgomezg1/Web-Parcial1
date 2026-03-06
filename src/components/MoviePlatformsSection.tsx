import { Platform } from "@/types/movie";

type MoviePlatformsSectionProps = {
  platforms: Platform[];
};

export default function MoviePlatformsSection({
  platforms,
}: MoviePlatformsSectionProps) {
  return (
    <section className="mt-8 rounded-2xl bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">Platforms</h2>

      {platforms.length === 0 ? (
        <p className="mt-4 text-gray-600">No platforms found.</p>
      ) : (
        <div className="mt-6 grid gap-4">
          {platforms.map((platform) => (
            <article
              key={platform.id}
              className="rounded-2xl border border-gray-200 p-5 text-sm text-gray-700"
            >
              <p>
                <span className="font-semibold text-gray-900">ID:</span>{" "}
                {platform.id}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-gray-900">Name:</span>{" "}
                {platform.name}
              </p>
              <p className="mt-2 break-all">
                <span className="font-semibold text-gray-900">URL:</span>{" "}
                {platform.url}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}