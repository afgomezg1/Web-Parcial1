"use client";

import { useEffect } from "react";
import ActorCard from "@/components/ActorCard";
import { useActorsStore } from "@/store/actorsStore";

export default function ActorsList() {
  const actors = useActorsStore((state) => state.actors);
  const loading = useActorsStore((state) => state.loading);
  const error = useActorsStore((state) => state.error);
  const hasFetched = useActorsStore((state) => state.hasFetched);
  const fetchActors = useActorsStore((state) => state.fetchActors);

  useEffect(() => {
    if (!hasFetched) {
      fetchActors();
    }
  }, [hasFetched, fetchActors]);

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Actors</h1>

        {loading && (
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-gray-600">Loading actors...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-md">
            <p className="font-medium text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && actors.length === 0 && (
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-gray-600">There are no registered actors.</p>
          </div>
        )}

        {!loading && !error && actors.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {actors.map((actor) => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}