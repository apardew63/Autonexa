import React, { useState } from "react";

const ShowroomForm = ({ dealerId }) => {
  const [formData, setFormData] = useState({
    dealerId: dealerId || "",
    showroomName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    description: "",
    logo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/showrooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Showroom Created:", data);
      alert("Showroom created successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">Create Showroom</h2>

      <input
        type="text"
        name="showroomName"
        placeholder="Showroom Name"
        value={formData.showroomName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="ownerName"
        placeholder="Owner Name"
        value={formData.ownerName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="logo"
        placeholder="Logo URL"
        value={formData.logo}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ShowroomForm;