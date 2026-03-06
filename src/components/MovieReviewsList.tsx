import { Review } from "@/types/movie";

type MovieReviewsListProps = {
  reviews: Review[];
};

export default function MovieReviewsList({ reviews }: MovieReviewsListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>

      {reviews.length === 0 ? (
        <p className="mt-4 text-gray-600">No reviews found.</p>
      ) : (
        <div className="mt-6 grid gap-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-gray-200 p-5 text-sm text-gray-700"
            >
              <p>
                <span className="font-semibold text-gray-900">ID:</span>{" "}
                {review.id}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-gray-900">Creator:</span>{" "}
                {review.creator}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-gray-900">Score:</span>{" "}
                {review.score}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-gray-900">Text:</span>{" "}
                {review.text}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}