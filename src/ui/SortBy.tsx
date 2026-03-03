import { useSearchParams } from "react-router-dom";
import { Select } from "./Select";
import type { SortByProps } from "../types/types";

export function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      variant="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}
