"use client";

import { Review } from "@/types/movie";
import MovieReviewForm from "@/components/MovieReviewForm";
import MovieReviewsList from "@/components/MovieReviewsList";

type MovieReviewsSectionProps = {
  movieId: string;
  reviews: Review[];
  onReviewCreated: (review: Review) => void;
};

export default function MovieReviewsSection({
  movieId,
  reviews,
  onReviewCreated,
}: MovieReviewsSectionProps) {
  return (
    <section className="mt-8 rounded-2xl bg-white p-8 shadow-md">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.1fr_1fr]">
        <MovieReviewsList reviews={reviews} />
        <MovieReviewForm
          movieId={movieId}
          onReviewCreated={onReviewCreated}
        />
      </div>
    </section>
  );
}