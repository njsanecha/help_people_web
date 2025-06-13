import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CategoryTable({ categories, openEditModal, handleDeleteCategory }) {
  
   return (
    <div className="p-40 pt-0 pb-10">
      <div className="flex justify-end">
        <button
          onClick={() => openEditModal({ name: "" }, "category")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          + New Category
        </button>
      </div>
      <p className="text-xl font-bold mb-4">Categories</p>
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            <th className="border-b p-4 border-gray-200">Id</th>
            <th className="border-b p-4 border-gray-200">Name</th>
            <th className="border-b p-4 border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((cat, index) => (
            <tr key={cat.id}>
              <td className="p-4 border-gray-200">{index + 1}</td>
              <td className="p-4 border-gray-200">{cat.name}</td>
              <td className="p-4 border-gray-200 space-x-2">
                <button onClick={() => openEditModal(cat, "category")} className="text-blue-500"><FaRegEdit /></button>
                <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500"><RiDeleteBin6Line /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}