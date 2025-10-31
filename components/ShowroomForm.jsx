import React, { useState, useEffect } from "react";

const ShowroomForm = ({ showroom, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    showroomName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    description: "",
    logo: "",
  });

  useEffect(() => {
    if (showroom) {
      setFormData({
        showroomName: showroom.showroomName || "",
        ownerName: showroom.ownerName || "",
        email: showroom.email || "",
        phone: showroom.phone || "",
        address: showroom.address || "",
        city: showroom.city || "",
        description: showroom.description || "",
        logo: showroom.logo || "",
      });
    }
  }, [showroom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const method = showroom ? "PUT" : "POST";
      const url = showroom
        ? `https://autonexa.vercel.app/api/showrooms/${showroom._id}`
        : "https://autonexa.vercel.app/api/showrooms";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to save showroom");
      }

      const data = await res.json();
      console.log("Showroom Saved:", data);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-slate-900 mb-6">
        {showroom ? "Edit Showroom Information" : "Create Showroom"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Showroom Name *
          </label>
          <input
            type="text"
            name="showroomName"
            value={formData.showroomName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Owner Name *
          </label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Address *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Logo URL
          </label>
          <input
            type="url"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="https://example.com/logo.png"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            placeholder="Tell customers about your showroom..."
          />
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-slate-200">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          {showroom ? "Update Showroom" : "Create Showroom"}
        </button>
      </div>
    </form>
  );
};

export default ShowroomForm;