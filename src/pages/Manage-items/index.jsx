import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ProductService from "../../services/product.service"; // import service
import { FaEdit, FaTrash } from "react-icons/fa"; // นำเข้าไอคอนจาก react-icons

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // สำหรับเก็บสินค้าที่จะทำการแก้ไข
  const [isModalOpen, setIsModalOpen] = useState(false); // สำหรับเปิด/ปิด Modal
  const [imageFile, setImageFile] = useState(null); // สำหรับเก็บไฟล์รูปภาพที่อัปโหลด

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await ProductService.getAllProducts();
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  // Handle edit product
  const handleEdit = (item_id) => {
    const itemToEdit = items.find((item) => item._id === item_id);
    setSelectedItem(itemToEdit);
    setIsModalOpen(true); // เปิด Modal
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null); // รีเซ็ตข้อมูลสินค้า
    setImageFile(null); // รีเซ็ตไฟล์รูปภาพ
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadResponse = await ProductService.uploadImage(formData);
        selectedItem.image = uploadResponse.data.imageUrl;
      }

      await ProductService.updateProduct(selectedItem._id, selectedItem); // เรียกใช้ API สำหรับอัพเดตสินค้า
      setItems(
        items.map((item) =>
          item._id === selectedItem._id ? selectedItem : item
        )
      );
      Swal.fire("Success", "Product updated successfully", "success");
      handleCloseModal(); // ปิด Modal หลังจากการบันทึก
    } catch (error) {
      Swal.fire("Error", "There was an issue updating the product", "error");
    }
  };

  // Handle delete product
  const handleDelete = async (item_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await ProductService.deleteProduct(item_id);
        setItems(items.filter((item) => item._id !== item_id));
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an issue deleting the product.",
          "error"
        );
      }
    }
  };

  return (
    <div className="manage-items-container p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Manage Items
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Image
              </th>
              <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="border px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="border px-4 py-2 text-sm text-gray-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="border px-4 py-2 text-sm text-gray-800">
                    {item.name}
                  </td>
                  <td className="border px-4 py-2 text-sm text-gray-800">
                    {item.description}
                  </td>
                  <td className="border px-4 py-2 text-sm text-gray-800">
                    {item.price}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="bg-yellow-400 text-white p-2 rounded-lg mr-2 transition duration-200 hover:bg-yellow-500"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-rose-700 text-white p-2 rounded-lg transition duration-200 hover:bg-red-600"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No items available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing Product */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={selectedItem.name}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={selectedItem.description}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                value={selectedItem.price}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, price: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageItems;
