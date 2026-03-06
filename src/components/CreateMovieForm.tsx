"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useActorsStore } from "@/store/actorsStore";

export default function CreateMovieForm() {
  const router = useRouter();
  const createActor = useActorsStore((state) => state.createActor);
  const clearError = useActorsStore((state) => state.clearError);

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthday, setBirthday] = useState("");
  const [biography, setBiography] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      clearError();

      const trimmedName = name.trim();
      const trimmedPhoto = photo.trim();
      const trimmedNationality = nationality.trim();
      const trimmedBiography = biography.trim();

      const lettersRegex = /^[A-Za-zÀ-ÿ\s]+$/;

      if (birthday > today) {
        setError("Birth date cannot be in the future");
        setLoading(false);
        return;
      }

      if (trimmedName.length < 2 || trimmedName.length > 60) {
        setError("Name must be between 2 and 60 characters");
        setLoading(false);
        return;
      }

      if (!lettersRegex.test(trimmedName)) {
        setError("Name must contain only letters");
        setLoading(false);
        return;
      }

      if (trimmedNationality.length < 2 || trimmedNationality.length > 40) {
        setError("Nationality must be between 2 and 40 characters");
        setLoading(false);
        return;
      }

      if (!lettersRegex.test(trimmedNationality)) {
        setError("Nationality must contain only letters");
        setLoading(false);
        return;
      }

      if (trimmedBiography.length < 2 || trimmedBiography.length > 500) {
        setError("Biography must be between 2 and 500 characters");
        setLoading(false);
        return;
      }

      const newActor = {
        name: trimmedName,
        photo: trimmedPhoto,
        nationality: trimmedNationality,
        birthDate: birthday,
        biography: trimmedBiography,
      };

      const success = await createActor(newActor);

      if (!success) {
        setError("Error creating the actor");
        setLoading(false);
        return;
      }

      router.push("/actors");
    } catch {
      setError("Error creating the actor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-8 shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Create Actor
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                minLength={2}
                maxLength={60}
                pattern="[A-Za-zÀ-ÿ ]+"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                placeholder="Enter actor name (Only accepts letters and spaces)"
                required
              />
            </div>

            <div>
              <label
                htmlFor="photo"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Photo
              </label>
              <input
                id="photo"
                type="url"
                value={photo}
                onChange={(event) => setPhoto(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                placeholder="Enter photo URL"
                required
              />
            </div>

            <div>
              <label
                htmlFor="nationality"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Nationality
              </label>
              <input
                id="nationality"
                type="text"
                value={nationality}
                onChange={(event) => setNationality(event.target.value)}
                minLength={2}
                maxLength={40}
                pattern="[A-Za-zÀ-ÿ ]+"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                placeholder="Enter nationality (Only accepts letters and spaces)"
                required
              />
            </div>

            <div>
              <label
                htmlFor="birthday"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Date of Birth
              </label>
              <input
                id="birthday"
                type="date"
                value={birthday}
                onChange={(event) => setBirthday(event.target.value)}
                min="1850-01-01"
                max={today}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="biography"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Biography
              </label>
              <textarea
                id="biography"
                value={biography}
                onChange={(event) => setBiography(event.target.value)}
                minLength={2}
                maxLength={500}
                className="min-h-32 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                placeholder="Enter biography"
                required
              />
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
              {loading ? "Creating..." : "Create Actor"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}