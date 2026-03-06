import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="flex w-full flex-wrap items-center justify-between gap-4 px-8 py-4">
        <Link href="/" className="text-2xl font-bold text-black">
          Movies App
        </Link>

        <nav className="w-full sm:w-auto">
          <ul className="flex flex-wrap items-center justify-start gap-4 text-base font-medium text-black sm:justify-end sm:gap-6">
            <li>
              <Link href="/" className="transition hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link href="/movies" className="transition hover:text-gray-700">
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/movies/create"
                className="transition hover:text-gray-700"
              >
                Create Movie
              </Link>
            </li>
            <li>
              <Link href="/actors" className="transition hover:text-gray-700">
                Actors
              </Link>
            </li>
            <li>
              <Link href="/create" className="transition hover:text-gray-700">
                Create Actor
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}