import React, { useState } from "react";

const CarListingForm = ({ userId, showroomId = "" }) => {
  const [formData, setFormData] = useState({
    userId: userId || "",
    showroomId: showroomId || "",
    title: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    engine: "",
    transmission: "Manual",
    color: "",
    condition: "Used",
    price: "",
    description: "",
    images: [],
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData({ ...formData, images: imageUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Car Listed:", data);
      if (data.success) {
        alert("Car listed successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while listing the car.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">Add dNew Car</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="make"
        placeholder="Make"
        value={formData.make}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="model"
        placeholder="Model"
        value={formData.model}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        name="mileage"
        placeholder="Mileage"
        value={formData.mileage}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="engine"
        placeholder="Engine"
        value={formData.engine}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="transmission"
        value={formData.transmission}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="Manual">Manual</option>
        <option value="Automatic">Automatic</option>
        <option value="CVT">CVT</option>
        <option value="Semi-Automatic">Semi-Automatic</option>
      </select>

      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="condition"
        value={formData.condition}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="New">New</option>
        <option value="Used">Used</option>
      </select>

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
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
        required
      />

      <input
        type="file"
        name="images"
        multiple
        onChange={handleImageChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
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

export default CarListingForm;