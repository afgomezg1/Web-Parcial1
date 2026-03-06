"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { MovieActor } from "@/types/movie";

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
  prizes?: {
    id: string;
    name: string;
  }[];
};

const API_URL = "http://localhost:3000/api/v1/movies";

export default function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Could not fetch movies");
        }

        const data = await response.json();
        setMovies(Array.isArray(data) ? data : []);
      } catch {
        setError("Error loading movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Movies</h1>

        {loading && (
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-gray-600">Loading movies...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-md">
            <p className="font-medium text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-gray-600">There are no registered movies.</p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}