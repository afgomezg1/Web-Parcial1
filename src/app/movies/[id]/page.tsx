import MovieDetail from "@/components/MovieDetail";

type MovieDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { id } = await params;

  return <MovieDetail movieId={id} />;
}