export default function VideoCard({ title, description, videoUrl }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 w-full max-w-[900px] mx-auto">
      <div className="aspect-video w-full">
        <iframe 
          src={videoUrl} 
          title={title} 
          className="w-full h-full" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-2xl mb-2">{title}</h3>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
    </div>
  )
}
