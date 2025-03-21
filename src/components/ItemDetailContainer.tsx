import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ItemDetailContainerProps = {
  backPath: string;
  title: string;
  children: ReactNode;
};

export default function ItemDetailContainer({
  backPath,
  title,
  children,
}: ItemDetailContainerProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex">
        <button
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate(backPath);
            }
          }}
          className="mb-6 inline-flex items-center gap-2 bg-gray-800 text-white border border-gray-600 rounded-xl px-4 py-2 hover:bg-yellow-400 hover:text-black transition shrink-0"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold mb-4 basis-full text-yellow-400">
          {title}
        </h2>
      </div>

      <section className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 shadow-md text-white mx-auto flex flex-col gap-4 items-start">
        {children}
      </section>
    </>
  );
}
