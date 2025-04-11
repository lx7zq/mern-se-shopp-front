import api from "./api";

const API_URL = import.meta.env.VITE_BASE_URL + "/carts";

const cartService = {
  // 📌 ดึงสินค้าทั้งหมดในตะกร้า
  getAllCarts: async () => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching carts:", error);
      throw error;
    }
  },

  // 📌 ดึงสินค้าทั้งหมดของผู้ใช้ตามอีเมล
  getCartsByEmail: async (email) => {
    try {
      const response = await api.get(`${API_URL}/${email}`);

      return response;
    } catch (error) {
      console.error(`Error fetching cart for ${email}:`, error);
      throw error;
    }
  },

  // 📌 เพิ่มสินค้าไปยังตะกร้า
  addToCart: async (data) => {
    try {
      const response = await api.post(API_URL + "/", data);
      return response;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  // 📌 อัปเดตสินค้าตาม ID
  updateCart: async (id, quantity) => {
    try {
      const response = await api.put(`${API_URL}/${id}`, { quantity });
      return response.data;
    } catch (error) {
      console.error(`Error updating cart item ${id}:`, error);
      throw error;
    }
  },

  // 📌 ลบสินค้าตาม ID
  deleteCartItem: async (id) => {
    try {
      const response = await api.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting cart item ${id}:`, error);
      throw error;
    }
  },

  // 📌 ลบสินค้าทั้งหมดของผู้ใช้ตามอีเมล
  clearCart: async (email) => {
    try {
      const response = await api.delete(`${API_URL}/clear/${email}`);
      return response.data;
    } catch (error) {
      console.error(`Error clearing cart for ${email}:`, error);
      throw error;
    }
  },
};

export default cartService;
