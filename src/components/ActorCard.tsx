"use client";

import Link from "next/link";
import { useState } from "react";
import { Actor, useActorsStore } from "@/store/actorsStore";

type ActorCardProps = {
  actor: Actor;
  showActions?: boolean;
};

export default function ActorCard({
  actor,
  showActions = true,
}: ActorCardProps) {
  const deleteActor = useActorsStore((state) => state.deleteActor);

  const [deleting, setDeleting] = useState(false);
  const [localError, setLocalError] = useState("");

  const formattedBirthDate = new Date(actor.birthDate).toLocaleDateString("es-CO");

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${actor.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setLocalError("");

      const success = await deleteActor(actor.id);

      if (!success) {
        setLocalError("Error deleting actor");
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg">
      <div className="h-64 w-full bg-gray-200">
        <img
          src={actor.photo}
          alt={actor.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">{actor.name}</h2>

        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">Nationality:</span>{" "}
            {actor.nationality}
          </p>

          <p>
            <span className="font-semibold text-gray-900">Birth date:</span>{" "}
            {formattedBirthDate}
          </p>
        </div>

        <div className="mt-5">
          <h3 className="mb-2 text-sm font-semibold tracking-wide text-gray-900">
            Biography
          </h3>
          <p className="text-sm leading-6 text-gray-700">{actor.biography}</p>
        </div>

        {localError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {localError}
          </div>
        )}

        {showActions && (
          <div className="mt-6 flex gap-3">
            <Link
              href={`/actors/${actor.id}/edit`}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Edit
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}