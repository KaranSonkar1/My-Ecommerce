export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2 rounded"/>
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="mt-2 font-semibold">${product.price}</p>
    </div>
  );
}
