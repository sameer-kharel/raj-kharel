import Image from "next/image";

const listings = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    description: "A beautiful and spacious apartment in the heart of the city.",
    price: "$1,200,000",
    image: "/modern-apartment.jpg",
  },
  {
    id: 2,
    title: "Suburban Family Home",
    description: "A charming family home with a large backyard and great schools nearby.",
    price: "$850,000",
    image: "/family-home.jpg",
  },
  {
    id: 3,
    title: "Luxury Penthouse with a View",
    description: "Experience luxury living with breathtaking city views.",
    price: "$2,500,000",
    image: "/penthouse.jpg",
  },
];

const Listings = () => {
  return (
    <section id="listings" className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <Image src={listing.image} alt={listing.title} width={600} height={400} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{listing.title}</h3>
                <p className="text-gray-600 mb-4">{listing.description}</p>
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-extrabold text-blue-500">{listing.price}</p>
                    <a href="#" className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300">View Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Listings;