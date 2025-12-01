export default function PhotoCard({ title, description, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 w-full max-w-[900px] mx-auto">
      <img src={image} alt={title} className="w-full h-auto aspect-video object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-2xl mb-2">{title}</h3>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
    </div>
  )
}
