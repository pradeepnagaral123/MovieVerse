export default function FloatingActionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 bg-primary-container text-on-primary-container rounded-full shadow-2xl flex items-center justify-center hover:rotate-90 transition-transform duration-500 z-50 cursor-pointer"
    >
      <span className="material-symbols-outlined text-4xl">add</span>
    </button>
  );
}
