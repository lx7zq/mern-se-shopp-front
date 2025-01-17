import React, { useState, useEffect } from "react";
import ProductService from "../../services/product.service";
import Card from "../../components/Card";
import { useSearchParams } from "react-router";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const categoryQuery = searchParams.get("category") || "all";
  const itemPerPageQuery = searchParams.get("itemPerPage") || 4;

  useEffect(() => {
    setSelectedCategory(categoryQuery);
    setItemsPerPage(itemPerPageQuery);
  }, [categoryQuery, itemPerPageQuery]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.getAllProducts();
        console.log(response.data); // เพิ่มการ log ข้อมูล response
        setProducts(response.data);
        setCategories([
          "all",
          ...new Set(response.data.map((item) => item.category)),
        ]);
        setFilteredItems(response.data);
        setSearchParams({ category: category });
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchData();
  }, []);

  const filterItem = (category) => {
    setSelectedCategory(category);
    const filtered =
      category === "all"
        ? products
        : products.filter((item) => item.category === category);
    setFilteredItems(filtered);
    handleSortChange(sortOption, filtered);
    setCurrentPage(1); // Reset to first page
  };

  const handleSortChange = (option, items) => {
    setSortOption(option);
    let sortedItems = [...items];
    switch (option) {
      case "a-z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
        {/* Filter */}
        <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`filter-button ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => filterItem(category)}
            >
              <p className="capitalize">{category}</p>
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex justify-end mb-4 rounded-sm">
          <div className="bg-black p-2">
            <select
              name="sortOption"
              id="sortOption"
              className="bg-black text-white px-2 rounded-sm"
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value, filteredItems)}
            >
              <option value="default">Default</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="low-to-high">Low-to-High</option>
              <option value="high-to-low">High-to-Low</option>
            </select>
          </div>
        </div>
        {/* Product List */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
          {currentItems.length > 0 ? (
            currentItems.map((item) => <Card key={item.id} item={item} />)
          ) : (
            <p className="text-center w-full">No products available</p>
          )}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center my-8 flex-wrap gap-2">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1
                ? "bg-red text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
