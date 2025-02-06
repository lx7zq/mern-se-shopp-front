import api from "./api";

const API_URL = import.meta.env.VITE_BASE_URL + "/product";

// 📌 ดึงสินค้าทั้งหมด
const getAllProducts = async () => {
  return await api.get(API_URL);
};

// 📌 ดึงสินค้าตาม ID
const getProductById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

// 📌 เพิ่มสินค้าใหม่ (รองรับอัปโหลดไฟล์)
const addProduct = async (formData) => {
  return await api.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 📌 อัปเดตสินค้าตาม ID (รองรับอัปโหลดไฟล์)
const updateProduct = async (id, formData) => {
  return await api.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 📌 ลบสินค้าตาม ID
const deleteProduct = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const ProductService = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};

export default ProductService;
