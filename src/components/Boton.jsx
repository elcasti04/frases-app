export default function Boton({ texto, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 px-6 py-2 bg-white text-purple-600 rounded-xl shadow-md hover:bg-gray-200 transition"
    >
      {texto}
    </button>
  );
}
