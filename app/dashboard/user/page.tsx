"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiPlus,
  FiList,
  FiSearch,
  FiSettings,
  FiLogOut,
  FiEdit,
  FiTrash2,
  FiImage,
  FiCalendar,
  FiDollarSign,
  FiEye,
  FiEyeOff,
  FiX,
  FiHeart,
} from "react-icons/fi";
import CarListingForm from "../../../components/CarListingForm";

interface CarListing {
  _id: string;
  title: string;
  price: number;
  status: "active" | "draft";
  createdAt: string;
  images: string[];
}

const UserDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showListings, setShowListings] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cars, setCars] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    }
  }, [router]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("https://autonexa.vercel.app/api/listings/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }

      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load car listings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://autonexa.vercel.app/api/listings/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }

      setCars(cars.filter((car) => car._id !== id));
      toast.success("Car deleted successfully");
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Failed to delete car");
    } finally {
      setShowDeleteModal(false);
      setCarToDelete(null);
    }
  };

  const confirmDelete = (id: string) => {
    setCarToDelete(id);
    setShowDeleteModal(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleViewListings = () => {
    setShowListings(true);
    fetchCars();
  };

  const handleCarListingSuccess = () => {
    setShowModal(false);
    toast.success("Car listed successfully!");
    if (showListings) {
      fetchCars();
    }
  };

  const handleCarListingError = (error: any) => {
    toast.error(error.message || "Failed to list car");
  };

  if (showListings) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <button
                  onClick={() => setShowListings(false)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mr-4"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900">My Car Listings</h1>
                <p className="mt-1 text-sm text-gray-600">
                  View, edit, and manage your car listings
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <FiPlus className="h-4 w-4 mr-2" />
                Add New Car
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Table */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : cars.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cars.map((car) => (
                      <tr key={car._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex-shrink-0 h-12 w-12">
                            {car.images && car.images.length > 0 ? (
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={`http://localhost:5000${car.images[0]}`}
                                alt={car.title}
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                <FiImage className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{car.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">
                            {formatPrice(car.price)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              car.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {car.status === "active" ? (
                              <FiEye className="h-3 w-3 mr-1" />
                            ) : (
                              <FiEyeOff className="h-3 w-3 mr-1" />
                            )}
                            {car.status ? car.status.charAt(0).toUpperCase() + car.status.slice(1) : "Unknown"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <FiCalendar className="h-4 w-4 mr-1" />
                            {formatDate(car.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => router.push(`/dashboard/edit-car/${car._id}`)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                              title="Edit"
                            >
                              <FiEdit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => confirmDelete(car._id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <FiImage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No cars found</h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't added any cars yet. Click 'Add New Car' to create one.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="h-4 w-4 mr-2" />
                  Add New Car
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FiTrash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Delete Car Listing</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Are you sure you want to delete this car listing? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setCarToDelete(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => carToDelete && handleDelete(carToDelete)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Car Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FiPlus className="h-5 w-5 mr-2 text-blue-600" />
                  Add New Car Listing
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <CarListingForm
                  userId={user?._id || ""}
                  onSuccess={handleCarListingSuccess}
                  onError={handleCarListingError}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your car listings and account settings
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <FiLogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiPlus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Car</h3>
            <p className="text-gray-600 text-sm mb-4">List a new vehicle in your inventory</p>
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Car Listing
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiList className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">My Listings</h3>
            <p className="text-gray-600 text-sm mb-4">View, edit, and manage your car listings</p>
            <button
              onClick={handleViewListings}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
            >
              View Listings
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiSearch className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Cars</h3>
            <p className="text-gray-600 text-sm mb-4">Search and filter all available cars</p>
            <button
              onClick={() => router.push("/dashboard/browse")}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Browse Cars
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-pink-100 p-3 rounded-lg">
                <FiHeart className="h-6 w-6 text-pink-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">My Favorites</h3>
            <p className="text-gray-600 text-sm mb-4">View your saved car listings</p>
            <button
              onClick={() => router.push('/dashboard/favorites')}
              className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors duration-200"
            >
              View Favorites
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <FiSettings className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Settings</h3>
            <p className="text-gray-600 text-sm mb-4">Manage your profile and account preferences</p>
            <button
              onClick={() => router.push('/dashboard/account-settings')}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Account Settings
            </button>
          </div>
        </div>
      </div>

      {/* Add Car Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FiPlus className="h-5 w-5 mr-2 text-blue-600" />
                Add New Car Listing
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <CarListingForm
                userId={user?._id || ""}
                onSuccess={handleCarListingSuccess}
                onError={handleCarListingError}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;