"use client";

import { SubmitEvent, useState } from "react";
import { CreateReviewInput, Review } from "@/types/movie";

type MovieReviewFormProps = {
  movieId: string;
  onReviewCreated: (review: Review) => void;
};

const API_URL = "http://localhost:3000/api/v1/movies";

export default function MovieReviewForm({
  movieId,
  onReviewCreated,
}: MovieReviewFormProps) {
  const [creator, setCreator] = useState("");
  const [score, setScore] = useState("");
  const [text, setText] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const handleSubmitReview = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setReviewLoading(true);
      setReviewError("");

      const trimmedCreator = creator.trim();
      const trimmedText = text.trim();
      const numericScore = Number(score);

      if (trimmedCreator.length < 2 || trimmedCreator.length > 60) {
        setReviewError("Creator must be between 2 and 60 characters");
        setReviewLoading(false);
        return;
      }

      if (!Number.isInteger(numericScore) || numericScore < 1 || numericScore > 5) {
        setReviewError("Score must be an integer between 1 and 5");
        setReviewLoading(false);
        return;
      }

      if (trimmedText.length < 5 || trimmedText.length > 1000) {
        setReviewError("Review text must be between 5 and 1000 characters");
        setReviewLoading(false);
        return;
      }

      const newReview: CreateReviewInput = {
        creator: trimmedCreator,
        score: numericScore,
        text: trimmedText,
      };

      const response = await fetch(`${API_URL}/${movieId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error("Could not create review");
      }

      const createdReview = await response.json();

      if (createdReview?.id) {
        onReviewCreated(createdReview);
      }

      setCreator("");
      setScore("");
      setText("");
    } catch {
      setReviewError("Error creating review");
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900">Add Review</h3>

      <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="creator"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Creator
          </label>
          <input
            id="creator"
            type="text"
            value={creator}
            onChange={(event) => setCreator(event.target.value)}
            minLength={2}
            maxLength={60}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
            placeholder="Enter creator name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="score"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Score
          </label>
          <input
            id="score"
            type="number"
            value={score}
            onChange={(event) => setScore(event.target.value)}
            min={1}
            max={5}
            step={1}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
            placeholder="Enter score from 1 to 5"
            required
          />
        </div>

        <div>
          <label
            htmlFor="reviewText"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Review Text
          </label>
          <textarea
            id="reviewText"
            value={text}
            onChange={(event) => setText(event.target.value)}
            minLength={5}
            maxLength={1000}
            className="min-h-32 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
            placeholder="Write the review"
            required
          />
        </div>

        {reviewError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {reviewError}
          </div>
        )}

        <button
          type="submit"
          disabled={reviewLoading}
          className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {reviewLoading ? "Saving Review..." : "Add Review"}
        </button>
      </form>
    </div>
  );
}