/* eslint-disable @typescript-eslint/no-explicit-any */
export function sortByField<T>(
  items: T[],
  sortField: string,
  sortOrder: "asc" | "desc",
  customFieldGetter?: (item: T, sortField: string) => string | number
) {
  return [...items].sort((a, b) => {
    const valA = customFieldGetter
      ? customFieldGetter(a, sortField)
      : (a as any)[sortField]?.toLowerCase?.() ?? "";

    const valB = customFieldGetter
      ? customFieldGetter(b, sortField)
      : (b as any)[sortField]?.toLowerCase?.() ?? "";

    if (typeof valA === "number" && typeof valB === "number") {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}
