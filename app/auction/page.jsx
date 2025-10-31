"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import { User } from "lucide-react";

export default function AllListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("https://autonexa-server.vercel.app/api/listings");
        if (!res.ok) throw new Error("Failed to fetch listings");
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-[1520px] mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Explore All Listings
          </h2>
          <p className="text-gray-600 text-lg">Discover amazing deals and unique items</p>
        </div>

      {listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No listings found.</p>
          <p className="text-gray-400 text-sm mt-2">Check back later for new auctions.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, index) => (
            <motion.div
              key={listing._id}
              className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => window.location.href = `/auction/${listing._id}`}
            >
              {/* Image Section */}
              <div className="relative group h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={
                    listing.images?.[0]
                      ? `http://localhost:5000${listing.images[0]}`
                      : "/placeholder.jpg"
                  }
                  alt={listing.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-semibold mb-1 line-clamp-2">{listing.title}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      View Details
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-5 bg-gradient-to-br from-white to-gray-50">
                <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">
                  {listing.description?.slice(0, 120) || "No description available."}
                </p>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {listing.userId?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-medium">
                      {listing.userId?.name || "Unknown"}
                    </span>
                  </div>
                  <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
