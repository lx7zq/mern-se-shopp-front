import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import ProductService from "../../services/product.service";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    file: null, // ใช้ "file"
    category: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setProduct({
        ...product,
        file: files[0],
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the required fields are filled
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.category ||
      !product.file
    ) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required!",
        text: "Please fill all the fields, including the image.",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("file", product.file); // ส่งไฟล์ไป
    formData.append("category", product.category);

    try {
      const response = await ProductService.addProduct(formData); // ส่งข้อมูลไปยัง API
      Swal.fire({
        icon: "success",
        title: "Product Added Successfully!",
        text: "Your product has been added successfully.",
        confirmButtonText: "OK",
      });

      // Reset the form after successful submission
      setProduct({
        name: "",
        description: "",
        price: "",
        file: null,
        category: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Error creating product",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="add-product-form-container flex justify-between gap-6">
      {/* Image Box - Left side */}
      <div className="image-container w-1/3 h-72 p-4 border-4 border-dashed rounded-md flex items-center justify-center cursor-pointer relative">
        <input
          type="file"
          name="file" // ใช้ "file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {!product.file ? ( // ใช้ "file" แทน "image"
          <span className="text-gray-500 text-4xl font-semibold">+</span>
        ) : (
          <img
            src={URL.createObjectURL(product.file)} // ใช้ "file" แทน "image"
            alt="Product"
            className="w-full h-full object-cover rounded-md"
          />
        )}
      </div>

      {/* Form Box - Right side */}
      <div className="form-container w-2/3 p-6 border rounded-md bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="absolute bottom-0 right-0 p-6">
            <button
              type="submit"
              className="px-4 py-2 bg-green-400 text-white rounded-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
