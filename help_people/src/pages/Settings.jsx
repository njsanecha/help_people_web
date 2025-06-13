import { useState } from "react"
import CategoryTable from "../components/CategoryTable"
import ProductTable from "../components/ProductTable"
import ModalForm from "../components/ModalForm"
import { deleteCategory, deleteProduct, getAllCategories, getAllProducts, insertCategory, insertProduct, updateCategory, updateProduct } from "../api/Server";

export default function Tables({ products, setProducts, categories, setCategories }) {
  const [view, setView] = useState("categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editType, setEditType] = useState("");

  const openEditModal = (item, type) => {
    setEditItem(item);
    setEditType(type);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  };

const handleSave = async () => {
  try {
    if (editType === "category") {
      if (!editItem.id) {
        const newCategory = await insertCategory(editItem);
        setCategories(prev => [...prev, newCategory]);
      } else {
        const updatedCategory = await updateCategory(editItem);
        setCategories(prev => prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
      }
    } else if (editType === "product") {
      if (!editItem.id) {
        const newProduct = await insertProduct(editItem);
        setProducts(prev => [...prev, newProduct]);
      } else {
        const updatedProduct = await updateProduct(editItem);
        setProducts(prev => prev.map(prod => prod.id === updatedProduct.id ? updatedProduct : prod));
      }
    }

    await getAllProducts().then(setProducts);; 
    await getAllCategories().then(setCategories);;
    setIsModalOpen(false);
  } catch (error) {
    console.error("Save failed:", error);
    alert("Save failed. See console for details.");
  }
};

  const handleDeleteCategory = async (categoryId) => {
  try {
      await deleteCategory(categoryId);
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
      setProducts((prev) => prev.filter((prod) => prod.category_id !== categoryId));
    } catch (error) {
      alert("Failed to delete category. See console for details.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((prod) => prod.id !== productId));
    } catch (error) {
      alert("Failed to delete product. See console for details.");
    }
  };
  return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
      <div className="pr-40 flex space-x-4 justify-end p-4">
        <button
          onClick={() => setView("categories")}
          className={`px-4 py-2 rounded ${view === "categories" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
          Categories
        </button>
        <button
          onClick={() => setView("products")}
          className={`px-4 py-2 rounded ${view === "products" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
          Products
        </button>
      </div>

      {view === "categories" ? (
        <CategoryTable
          categories={categories}
          openEditModal={openEditModal}
          handleDeleteCategory={handleDeleteCategory}/>
      ) : (
        <ProductTable
          products={products}
          categories={categories}
          openEditModal={openEditModal}
          handleDeleteProduct={handleDeleteProduct}/>
      )}

      <ModalForm
        isOpen={isModalOpen}
        editType={editType}
        editItem={editItem}
        categories={categories}
        onClose={() => setIsModalOpen(false)}
        onChange={handleInputChange}
        onSave={handleSave}/>
    </div>
  );
}