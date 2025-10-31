"use client"
import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    profileImage: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await fetch("https://autonexa.vercel.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          profileImage: formData.profileImage,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
        }),
      });
      const data = await res.json();
      console.log("Signup:", data);
      alert("Signup successful!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">Signup</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="user">User</option>
        <option value="dealer">Dealer (Showroom)</option>
      </select>

      <input
        type="text"
        name="profileImage"
        placeholder="Profile Image URL"
        value={formData.profileImage}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Signup
      </button>
    </form>
  );
};

export default SignupForm;