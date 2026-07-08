"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { ListItem } from ".";
import { FilterItem } from "./item";

export default function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ("path" in listItem && pathname === listItem.path) ||
        ("slug" in listItem && searchParams.get("sort") === listItem.slug)
      ) {
        setActive(listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={openSelect}
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        className="flex w-full min-h-11 items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-foreground transition-colors duration-150 hover:border-coral"
      >
        <span>{active}</span>
        <ChevronDownIcon
          className={clsx("h-4 transition-transform duration-200", {
            "rotate-180": openSelect,
          })}
        />
      </button>
      {openSelect && (
        <div
          onClick={() => {
            setOpenSelect(false);
          }}
          className="absolute z-40 mt-2 w-full rounded-xl border border-line bg-surface p-2 shadow-[0_16px_40px_-12px_rgba(25,20,16,0.25)]"
        >
          {list.map((item: ListItem, i) => (
            <FilterItem key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
