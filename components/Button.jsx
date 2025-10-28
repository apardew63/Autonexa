"use client";
import React from "react";

export default function Button({ text, Icon, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`click-btn btn-style5 ${className}`}
    >
      <span className="mr-4">{text}</span>
      {Icon && <Icon size={20} />}
    </button>
  );
}
