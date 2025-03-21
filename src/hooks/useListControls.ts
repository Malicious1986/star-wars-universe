import { useState, useCallback } from "react";
import { debounce } from "lodash";

export function useListControls(defaultSortField: string = "name") {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState<string>(defaultSortField);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setPage(1);
      setQuery(value);
    }, 500),
    []
  );

  const handleSortChange = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setQuery("");
    setPage(1);
  };

  return {
    searchTerm,
    setSearchTerm,
    query,
    sortField,
    sortOrder,
    handleSortChange,
    page,
    setPage,
    debouncedSearch,
    resetSearch,
  };
}
