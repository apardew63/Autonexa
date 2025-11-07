"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ListingDetailClient({ listing }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (listing?.images) {
      setCurrentImageIndex((prev) =>
        prev === listing.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (listing?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? listing.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-[1520px] mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/auction"
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg border border-white/20 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <FiArrowLeft size={18} />
            Back to Auctions
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
              {listing.images && listing.images.length > 0 ? (
                <>
                  <img
                    src={`https://autonexa-server.vercel.app${listing.images[currentImageIndex]}`}
                    alt={`${listing.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />

                  {listing.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                        aria-label="Previous image"
                      >
                        <FiChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                        aria-label="Next image"
                      >
                        <FiChevronRight size={20} />
                      </button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {listing.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                              index === currentImageIndex ? 'bg-white shadow-lg' : 'bg-white/60 hover:bg-white/80'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {listing.images && listing.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-gray-900' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={`https://autonexa-server.vercel.app${image}`}
                      alt={`${listing.title} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">{listing.title}</h1>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {listing.userId?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="font-medium">Posted by: {listing.userId?.name || "Unknown"}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose max-w-none"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {listing.description || "No description available."}
              </p>
            </motion.div>

            {/* Additional Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-white to-blue-50/50 rounded-xl p-6 shadow-lg border border-white/50"
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/60 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <span className="text-sm text-gray-600 block mb-1">Category</span>
                  <p className="font-semibold text-gray-900">{listing.category || "Not specified"}</p>
                </div>
                <div className="bg-white/60 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <span className="text-sm text-gray-600 block mb-1">Condition</span>
                  <p className="font-semibold text-gray-900">{listing.condition || "Not specified"}</p>
                </div>
                <div className="bg-white/60 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <span className="text-sm text-gray-600 block mb-1">Location</span>
                  <p className="font-semibold text-gray-900">{listing.location || "Not specified"}</p>
                </div>
                <div className="bg-white/60 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <span className="text-sm text-gray-600 block mb-1">Price</span>
                  <p className="font-semibold text-green-600 text-lg">{listing.price ? `$${listing.price.toLocaleString()}` : "Contact for price"}</p>
                </div>
              </div>
            </motion.div>

            {/* Contact/Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Contact Seller
              </button>
              <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transform hover:scale-105 transition-all duration-300">
                Share
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}