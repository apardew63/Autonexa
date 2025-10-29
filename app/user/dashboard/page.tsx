"use client"
import React, { useState } from "react";
import CarListingForm from "../../../components/CarListingForm";

const UserDashboard = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="bg-white p-4 shadow-md rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">👋 Welcome to Your Dashboard</h1>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
          </div>
        </header>

        {showForm ? (
          <div className="bg-white p-6 shadow-md rounded-lg mb-6">
            <button
              onClick={() => setShowForm(false)}
              className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Back to Dashboard
            </button>
            <CarListingForm userId="user-id-placeholder" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-xl font-semibold mb-4">➕ Add Your Car</h2>
              <p className="text-gray-600 mb-4">Post a new car listing</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Car
              </button>
            </div>

            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-xl font-semibold mb-4">🚗 My Listings</h2>
              <p className="text-gray-600 mb-4">View and manage your posted cars</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">View Listings</button>
            </div>

            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-xl font-semibold mb-4">🔍 Browse Cars</h2>
              <p className="text-gray-600 mb-4">Search and filter all available cars</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Browse</button>
            </div>

            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-xl font-semibold mb-4">❤️ Favorites</h2>
              <p className="text-gray-600 mb-4">View your favorite cars</p>
              <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">View Favorites</button>
            </div>

            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-xl font-semibold mb-4">⚙️ Profile Settings</h2>
              <p className="text-gray-600 mb-4">Update your profile information</p>
              <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;