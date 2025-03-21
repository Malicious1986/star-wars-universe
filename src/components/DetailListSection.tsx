import { ReactNode } from "react";

type DetailListSectionProps = {
  title: string;
  items: { id: string; content: ReactNode }[];
  emptyMessage: string;
};

export default function DetailListSection({
  title,
  items,
  emptyMessage,
}: DetailListSectionProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 items-start">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {items.length > 0 ? (
        <ul className="list-none flex flex-wrap gap-2">
          {items.map((item, index) => (
            <li key={item.id}>
              {item.content}{" "}
              {items.length > 1 && index < items.length - 1 && "|"}
            </li>
          ))}
        </ul>
      ) : (
        <p>{emptyMessage}</p>
      )}
    </div>
  );
}
