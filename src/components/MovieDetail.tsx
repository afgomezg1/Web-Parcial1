"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Movie, Review } from "@/types/movie";
import MovieActorsSection from "@/components/MovieActorsSection";
import MovieDirectorSection from "@/components/MovieDirectorSection";
import MovieMainSection from "@/components/MovieMainSection";
import MoviePlatformsSection from "@/components/MoviePlatformsSection";
import MovieReviewsSection from "@/components/MovieReviewsSection";
import MovieTrailerSection from "@/components/MovieTrailerSection";

type MovieDetailProps = {
  movieId: string;
};

const API_URL = "http://localhost:3000/api/v1/movies";

export default function MovieDetail({ movieId }: MovieDetailProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${movieId}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Could not fetch movie");
        }

        const data = await response.json();
        setMovie(data);
      } catch {
        setError("Error loading movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleReviewCreated = (review: Review) => {
    setMovie((currentMovie) => {
      if (!currentMovie) {
        return currentMovie;
      }

      return {
        ...currentMovie,
        reviews: [review, ...currentMovie.reviews],
      };
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow-md">
          <p className="text-gray-600">Loading movie...</p>
        </div>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-6xl rounded-2xl border border-red-200 bg-red-50 p-8 shadow-md">
          <p className="font-medium text-red-600">
            {error || "Movie not found."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <MovieMainSection movie={movie} />
        <MovieDirectorSection director={movie.director} />
        <MovieActorsSection actors={movie.actors} />
        <MoviePlatformsSection platforms={movie.platforms} />
        <MovieReviewsSection
          movieId={movie.id}
          reviews={movie.reviews}
          onReviewCreated={handleReviewCreated}
        />
        <MovieTrailerSection youtubeTrailer={movie.youtubeTrailer} />
      </div>
    </main>
  );
}