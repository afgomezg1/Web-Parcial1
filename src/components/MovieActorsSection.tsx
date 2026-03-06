import ActorCard from "@/components/ActorCard";
import { MovieActor } from "@/types/movie";
import { Actor } from "@/store/actorsStore";

type MovieActorsSectionProps = {
  actors: MovieActor[];
};

export default function MovieActorsSection({
  actors,
}: MovieActorsSectionProps) {
  const adaptedActors: Actor[] = actors.map((actor) => ({
    ...actor,
    movies: [],
  }));

  return (
    <section className="mt-8 rounded-2xl bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">Actors</h2>

      {adaptedActors.length === 0 ? (
        <p className="mt-4 text-gray-600">No actors found.</p>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {adaptedActors.map((actor) => (
            <ActorCard key={actor.id} actor={actor} showActions={false} />
          ))}
        </div>
      )}
    </section>
  );
}