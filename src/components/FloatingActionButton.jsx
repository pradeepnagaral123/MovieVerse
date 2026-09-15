export default function FloatingActionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Create"
      className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] right-4 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-primary-container text-on-primary-container rounded-full shadow-2xl flex items-center justify-center hover:rotate-90 transition-transform duration-500 z-40 md:z-50 cursor-pointer"
    >
      <span className="material-symbols-outlined text-4xl">add</span>
    </button>
  );
}
