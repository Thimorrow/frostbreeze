"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form
      action="/search"
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
    >
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Produkte suchen..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="text-md w-full rounded-full border border-line bg-surface px-4 py-2 text-foreground transition-colors placeholder:text-muted hover:border-ice-deep/40 md:text-sm"
      />
      <div className="absolute top-0 right-0 mr-3 flex h-full items-center text-muted">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Produkte suchen..."
        className="w-full rounded-full border border-line bg-surface px-4 py-2 text-sm text-foreground placeholder:text-muted"
      />
      <div className="absolute top-0 right-0 mr-3 flex h-full items-center text-muted">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
