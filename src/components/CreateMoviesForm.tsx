"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";

const MOVIES_API_URL = "http://localhost:3000/api/v1/movies";
const ACTORS_API_URL = "http://localhost:3000/api/v1/actors";
const PRIZES_API_URL = "http://localhost:3000/api/v1/prizes";

export default function CreateMovieForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [duration, setDuration] = useState("");
  const [country, setCountry] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [popularity, setPopularity] = useState("");

  const [actorName, setActorName] = useState("");
  const [actorPhoto, setActorPhoto] = useState("");
  const [actorNationality, setActorNationality] = useState("");
  const [actorBirthDate, setActorBirthDate] = useState("");
  const [actorBiography, setActorBiography] = useState("");

  const [prizeName, setPrizeName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const movieResponse = await fetch(MOVIES_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          poster: poster.trim(),
          duration: Number(duration),
          country: country.trim(),
          releaseDate,
          popularity: Number(popularity),
        }),
      });

      if (!movieResponse.ok) {
        throw new Error("Could not create movie");
      }

      const createdMovie = await movieResponse.json();
      const movieId = createdMovie.id;

      const actorResponse = await fetch(ACTORS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: actorName.trim(),
          photo: actorPhoto.trim(),
          nationality: actorNationality.trim(),
          birthDate: actorBirthDate,
          biography: actorBiography.trim(),
        }),
      });

      if (!actorResponse.ok) {
        throw new Error("Could not create actor");
      }

      const createdActor = await actorResponse.json();
      const actorId = createdActor.id;

      const actorMovieResponse = await fetch(
        `${ACTORS_API_URL}/${actorId}/movies/${movieId}`,
        {
          method: "POST",
        }
      );

      if (!actorMovieResponse.ok) {
        throw new Error("Could not assign movie to actor");
      }

      const prizeResponse = await fetch(PRIZES_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: prizeName.trim(),
        }),
      });

      if (!prizeResponse.ok) {
        throw new Error("Could not create prize");
      }

      const createdPrize = await prizeResponse.json();
      const prizeId = createdPrize.id;

      const moviePrizeResponse = await fetch(
        `${MOVIES_API_URL}/${movieId}/prizes/${prizeId}`,
        {
          method: "POST",
        }
      );

      if (!moviePrizeResponse.ok) {
        throw new Error("Could not assign prize to movie");
      }

      router.push("/movies");
    } catch {
      setError("Error creating movie, actor or prize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-8 shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Create Movie
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Movie</h2>

              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                  placeholder="Enter movie title"
                  required
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="poster"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Poster
                </label>
                <input
                  id="poster"
                  type="url"
                  value={poster}
                  onChange={(event) => setPoster(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                  placeholder="Enter movie poster URL"
                  required
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="duration"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Duration
                </label>
                <input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  min={1}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                  placeholder="Enter duration"
                  required
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                  placeholder="Enter country"
                  required
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="releaseDate"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Release Date
                </label>
                <input
                  id="releaseDate"
                  type="date"
                  value={releaseDate}
                  onChange={(event) => setReleaseDate(event.target.value)}
                  max={today}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                  required
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="popularity"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Popularity
                </label>
                <input
                  id="popularity"
                  type="number"
                  value={popularity}
                  onChange={(event) => setPopularity(event.target.value)}
                  min={1}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                  placeholder="Enter popularity"
                  required
                />
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Main Actor
              </h2>

              <div>
                <label
                  htmlFor="actorName"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Name
                </label>
                <input
                  id="actorName"
                  type="text"
                  value={actorName}
                  onChange={(event) => setActorName(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                  placeholder="Enter actor name"
                  required
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="actorPhoto"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Photo
                </label>
                <input
                  id="actorPhoto"
                  type="url"
                  value={actorPhoto}
                  onChange={(event) => setActorPhoto(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                  placeholder="Enter actor photo URL"
                  required
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="actorNationality"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Nationality
                </label>
                <input
                  id="actorNationality"
                  type="text"
                  value={actorNationality}
                  onChange={(event) => setActorNationality(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                  placeholder="Enter actor nationality"
                  required
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="actorBirthDate"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Birth Date
                </label>
                <input
                  id="actorBirthDate"
                  type="date"
                  value={actorBirthDate}
                  onChange={(event) => setActorBirthDate(event.target.value)}
                  max={today}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                  required
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="actorBiography"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Biography
                </label>
                <textarea
                  id="actorBiography"
                  value={actorBiography}
                  onChange={(event) => setActorBiography(event.target.value)}
                  className="min-h-32 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                  placeholder="Enter actor biography"
                  required
                />
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Prize</h2>

              <div>
                <label
                  htmlFor="prizeName"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Name
                </label>
                <input
                  id="prizeName"
                  type="text"
                  value={prizeName}
                  onChange={(event) => setPrizeName(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                  placeholder="Enter prize name"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Movie"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}