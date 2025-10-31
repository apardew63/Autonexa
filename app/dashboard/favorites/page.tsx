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

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);

    if (!token) {
      // Redirect to login if not authenticated
      window.location.href = "/login";
      return;
    }

    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await favoritesAPI.getUserFavorites(userToken!);
      setFavorites(result);
    } catch (error) {
      console.error("Error loading favorites:", error);
      setError("Failed to load favorites. Please try logging in again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (listingId: string) => {
    if (!userToken) return;

    try {
      await favoritesAPI.removeFromFavorites(listingId, userToken);
      // Remove from local state
      setFavorites(prev => prev.filter(fav => fav._id !== listingId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1520px] mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            My Favorite Cars
          </h2>
          <p className="text-gray-600 text-lg">Your saved car listings</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadFavorites}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {favorites.length === 0 && !error ? (
          <div className="text-center py-12">
            <FiHeart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No favorites yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Start browsing cars and add them to your favorites!
            </p>
            <button
              onClick={() => window.location.href = "/dashboard/browse"}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Cars
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((listing, index) => (
              <motion.div
                key={listing._id}
                className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer group relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(listing._id);
                  }}
                  className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
                >
                  <FiHeart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>

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