"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { favoritesAPI } from "../../../services/favoritesService";

interface CarListing {
  _id: string;
  title: string;
  description?: string;
  images?: string[];
  userId?: {
    name?: string;
  };
  createdAt: string;
  price?: number;
}

export default function BrowseCars() {
  const [listings, setListings] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState<CarListing[]>([]);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [favoritesStatus, setFavoritesStatus] = useState<{[key: string]: boolean}>({});
  const [favoritesLoading, setFavoritesLoading] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);

    const fetchListings = async () => {
      try {
        const res = await fetch("https://autonexa-server.vercel.app/api/listings");
        if (!res.ok) throw new Error("Failed to fetch listings");
        const data = await res.json();
        setListings(data);
        setFilteredListings(data);

        // Check favorite status for each listing if user is logged in
        if (token) {
          checkFavoritesStatus(data);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const checkFavoritesStatus = async (listings: CarListing[]) => {
    if (!userToken) return;

    const status: {[key: string]: boolean} = {};
    for (const listing of listings) {
      try {
        const result = await favoritesAPI.checkFavoriteStatus(listing._id, userToken);
        status[listing._id] = result.isFavorited;
      } catch (error) {
        console.error(`Error checking favorite status for ${listing._id}:`, error);
        status[listing._id] = false;
      }
    }
    setFavoritesStatus(status);
  };

  useEffect(() => {
    const filtered = listings.filter((listing) =>
      (listing.title && listing.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (listing.description && listing.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredListings(filtered);
  }, [searchTerm, listings]);

  const toggleFavorite = async (listingId: string) => {
    if (!userToken) {
      alert('Please login to add favorites');
      return;
    }

    setFavoritesLoading(prev => ({ ...prev, [listingId]: true }));

    try {
      const isCurrentlyFavorited = favoritesStatus[listingId];

      if (isCurrentlyFavorited) {
        await favoritesAPI.removeFromFavorites(listingId, userToken);
        setFavoritesStatus(prev => ({ ...prev, [listingId]: false }));
      } else {
        await favoritesAPI.addToFavorites(listingId, userToken);
        setFavoritesStatus(prev => ({ ...prev, [listingId]: true }));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setFavoritesLoading(prev => ({ ...prev, [listingId]: false }));
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-[1520px] mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent">
            Browse All Cars
          </h2>
          <p className="text-gray-600 text-lg">Find your perfect vehicle from our extensive collection</p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cars by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      {filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? "No cars match your search." : "No car listings found."}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {searchTerm ? "Try adjusting your search terms." : "Check back later for new listings."}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing._id}
              className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer group relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Favorite Button */}
              {userToken && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(listing._id);
                  }}
                  disabled={favoritesLoading[listing._id]}
                  className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
                >
                  <FiHeart
                    className={`w-5 h-5 transition-colors ${
                      favoritesStatus[listing._id]
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600 hover:text-red-500'
                    }`}
                  />
                </button>
              )}

              {/* Image Section */}
              <div
                className="relative group h-56 overflow-hidden rounded-t-2xl"
                onClick={() => window.location.href = `/auction/${listing._id}`}
              >
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
                {listing.price && (
                  <div className="mb-3">
                    <span className="text-lg font-bold text-green-600">
                      ${listing.price.toLocaleString()}
                    </span>
                  </div>
                )}
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