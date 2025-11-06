"use client"
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiPlus,
  FiTruck,
  FiSettings,
  FiHome,
  FiLogOut,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiStar,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin
} from "react-icons/fi";
import CarListingForm from "../../../components/CarListingForm";
import ShowroomForm from "../../../components/ShowroomForm";

interface User {
  _id: string;
  name: string;
  email?: string;
  role?: string;
}

interface Showroom {
  showroomName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface Car {
  _id: string;
  status: string;
}

const DealerDashboard = () => {
  const [showroomModal, setShowroomModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showroom, setShowroom] = useState<Showroom | null>(null);
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    totalRevenue: 0
  });
  const router = useRouter();

  const fetchListingsCount = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://autonexa-server.vercel.app/api/listings/me", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const listings: Car[] = await response.json();
        const activeListings = listings.filter((car) => car.status === 'active').length;
        setStats(prev => ({
          ...prev,
          totalListings: listings.length,
          activeListings: activeListings
        }));
      }
    } catch (error) {
      console.error("Error fetching listings count:", error);
    }
  }, []);

  const fetchDashboardData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://autonexa-server.vercel.app/api/dashboard", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Dashboard data:", data); // Debug log
      if (data.showroom) {
        setShowroom(data.showroom);
      }
      if (data.stats) {
        setStats(data.stats);
      } else {
        // Fallback: fetch listings directly if stats not provided
        fetchListingsCount();
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }, [fetchListingsCount]);

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
      fetchDashboardData();
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    }
  }, [router, fetchDashboardData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    setTimeout(() => router.push("/login"), 1000);
  };

  const handleCarListingSuccess = () => {
    toast.success("Car listed successfully!");
    fetchDashboardData();
  };

  const handleManageCarsClick = () => {
    router.push('/dashboard/manage-cars');
  };

  const handleCarListingError = (error: { message?: string }) => {
    toast.error(error.message || "Failed to list car");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
      <header className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-xl">
                <FiHome className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Dealer Dashboard</h1>
                <p className="text-sm text-slate-600">Welcome back, {user?.name}</p>
              </div>
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
      </header>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiTruck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Listings</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalListings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiTrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Active Listings</p>
                <p className="text-2xl font-bold text-slate-900">{stats.activeListings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiUsers className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Views</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <FiDollarSign className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Revenue</p>
                <p className="text-2xl font-bold text-slate-900">${stats.totalRevenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Showroom Info */}
        {showroom && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center">
                <FiHome className="h-5 w-5 mr-2 text-blue-600" />
                Showroom Information
              </h2>
              <button
                onClick={() => setShowroomModal(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Edit Details
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <FiUser className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600">Showroom Name</p>
                  <p className="font-medium text-slate-900">{showroom.showroomName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="font-medium text-slate-900">{showroom.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <p className="font-medium text-slate-900">{showroom.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 md:col-span-2 lg:col-span-3">
                <FiMapPin className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600">Address</p>
                  <p className="font-medium text-slate-900">{showroom.address}, {showroom.city}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiPlus className="h-6 w-6 text-blue-600" />
              </div>
              <FiStar className="h-5 w-5 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Add New Car</h3>
            <p className="text-slate-600 text-sm mb-4">List a new vehicle in your showroom inventory</p>
            <button
              onClick={() => router.push('/dashboard/add-car')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Car Listing
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiTruck className="h-6 w-6 text-green-600" />
              </div>
              <FiStar className="h-5 w-5 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Manage Inventory</h3>
            <p className="text-slate-600 text-sm mb-4">View, edit, and manage your car listings</p>
            <button
              onClick={handleManageCarsClick}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Manage Cars
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiHome className="h-6 w-6 text-purple-600" />
              </div>
              <FiStar className="h-5 w-5 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Showroom Settings</h3>
            <p className="text-slate-600 text-sm mb-4">Update your showroom information and preferences</p>
            <button
              onClick={() => setShowroomModal(true)}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Edit Showroom
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-slate-100 p-3 rounded-lg">
                <FiSettings className="h-6 w-6 text-slate-600" />
              </div>
              <FiStar className="h-5 w-5 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Account Settings</h3>
            <p className="text-slate-600 text-sm mb-4">Manage your profile and account preferences</p>
            <button
              onClick={() => router.push('/dashboard/account-settings')}
              className="w-full bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Account Settings
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <FiTrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <FiStar className="h-5 w-5 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Analytics</h3>
            <p className="text-slate-600 text-sm mb-4">View detailed insights and performance metrics</p>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
              View Analytics
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <FiUsers className="h-6 w-6 text-orange-600" />
              </div>
              <FiStar className="h-5 w-5 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Customer Support</h3>
            <p className="text-slate-600 text-sm mb-4">Get help and support for your account</p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </div>


      {/* Showroom Edit Modal */}
      {showroomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center">
                <FiHome className="h-5 w-5 mr-2 text-purple-600" />
                Edit Showroom Information
              </h2>
              <button
                onClick={() => setShowroomModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <ShowroomForm
                showroom={showroom}
                onSuccess={() => {
                  setShowroomModal(false);
                  fetchDashboardData();
                  toast.success("Showroom updated successfully!");
                }}
                onError={(error: { message?: string }) => {
                  toast.error(error.message || "Failed to update showroom");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealerDashboard;