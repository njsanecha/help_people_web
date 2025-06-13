import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ProductTable({ products, categories, openEditModal, handleDeleteProduct }) {
  
  return (
    <div className="p-40 pt-0 pb-10">
      <div className="flex justify-end">
        <button
          onClick={() => openEditModal({ name: "", description: "", price: "", category_id: "" }, "product")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          + New Product
        </button>
      </div>
      <p className="text-xl font-bold mb-4">Products</p>
      <table className="w-full table-auto text-left">
        <thead>
            <tr>
                <th className="border-b p-4 border-gray-200">Id</th>
                <th className="border-b p-4 border-gray-200">Category</th>
                <th className="border-b p-4 border-gray-200">Name</th>
                <th className="border-b p-4 border-gray-200">Description</th>
                <th className="border-b p-4 border-gray-200">Price</th>
                <th className="border-b p-4 border-gray-200">Actions</th>
            </tr>
        </thead>
        <tbody>
          {products?.map((prod, index) => (
            <tr key={prod.id}>
              <td className="p-4 border-gray-200">{index + 1}</td>
              <td className="p-4 border-gray-200">
                {categories.find((cat) => cat.id === prod.category_id)?.name || "Unknown"}
              </td>
              <td className="p-4 border-gray-200">{prod.name}</td>
              <td className="p-4 border-gray-200">{prod.description}</td>
              <td className="p-4 border-gray-200">${parseFloat(prod.price).toFixed(2)}</td>
              <td className="p-4 border-gray-200 space-x-2">
                <button onClick={() => openEditModal(prod, "product")} className="text-blue-500"><FaRegEdit /></button>
                <button onClick={() => handleDeleteProduct(prod.id)} className="text-red-500"><RiDeleteBin6Line /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}