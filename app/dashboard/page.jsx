"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const user = JSON.parse(decodeURIComponent(searchParams.get("user")));

  const [formData, setFormData] = useState({
    category: "Car",
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    location: "",
    description: "",
    images: [],
  });

  const [submitStatus, setSubmitStatus] = useState(null); // null, 'loading', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    console.log("Posting ad:", formData);

    const data = new FormData();
    data.append('category', formData.category);
    data.append('title', formData.title);
    data.append('brand', formData.brand);
    data.append('model', formData.model);
    data.append('year', formData.year);
    data.append('price', formData.price);
    data.append('location', formData.location);
    data.append('description', formData.description);

    // Append images
    formData.images.forEach((image, index) => {
      data.append(`images`, image);
    });

    try {
      const response = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          category: "Car",
          title: "",
          brand: "",
          model: "",
          year: "",
          price: "",
          location: "",
          description: "",
          images: [],
        });
      } else {
        setSubmitStatus('error');
        console.error('Failed to post ad:', response.statusText);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error posting ad:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-white">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl shadow-lg p-8">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-8 border-b border-gray-700 pb-4">
          <img
            src={user.profileImage}
            alt="Profile"
            className="rounded-full w-16 h-16 border-2 border-gray-700"
          />
          <div>
            <h1 className="text-xl font-bold">Welcome, {user.name} 👋</h1>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Post Form */}
        <h2 className="text-lg font-semibold mb-4">Post Your Vehicle Ad</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
            >
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Truck">Truck</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm mb-1">Ad Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Toyota Corolla 2020 for sale"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              required
            />
          </div>

          {/* Brand / Model / Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Toyota, Honda, etc."
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Civic, Corolla, etc."
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2020"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              />
            </div>
          </div>

          {/* Price / Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Price (PKR)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Karachi, Lahore"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write details about your vehicle..."
              rows={4}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm mb-1">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-gray-300 bg-gray-800 border border-gray-700 rounded p-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitStatus === 'loading'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 transition text-white py-2 rounded font-semibold"
          >
            {submitStatus === 'loading' ? 'Posting...' : 'Post Ad'}
          </button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <p className="text-green-400 text-center mt-4">Ad posted successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-400 text-center mt-4">Failed to post ad. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
