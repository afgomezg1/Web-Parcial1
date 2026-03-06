import { Director } from "@/types/movie";

type MovieDirectorSectionProps = {
  director: Director;
};

export default function MovieDirectorSection({
  director,
}: MovieDirectorSectionProps) {
  const formattedBirthDate = new Date(director.birthDate).toLocaleDateString("es-CO");

  return (
    <section className="mt-8 rounded-2xl bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">Director</h2>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        <div className="overflow-hidden rounded-2xl bg-gray-200">
          <img
            src={director.photo}
            alt={director.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">ID:</span>{" "}
            {director.id}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Name:</span>{" "}
            {director.name}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Nationality:</span>{" "}
            {director.nationality}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Birth date:</span>{" "}
            {formattedBirthDate}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Biography:</span>{" "}
            {director.biography}
          </p>
        </div>
      </div>
    </section>
  );
}