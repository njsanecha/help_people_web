export default function ModalForm({
  isOpen,
  editType,
  editItem,
  categories,
  onClose,
  onChange,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-4">
        <h2 className="text-xl font-bold capitalize">Edit {editType}</h2>
        <div className="space-y-2">
          <label>Name</label>
          <input
            name="name"
            value={editItem.name || ""}
            onChange={onChange}
            className="w-full p-2 border rounded border-gray-200"
            placeholder="Name"
          />

          {editType === "product" && (
            <>
              <label>Category</label>
              <select
                name="category_id"
                value={editItem.category_id}
                onChange={onChange}
                className="w-full p-2 border rounded border-gray-200"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <label>Description</label>
              <textarea
                name="description"
                value={editItem.description || ""}
                onChange={onChange}
                className="w-full p-2 border rounded h-20 border-gray-200"
              />

              <label>Price</label>
              <input
                name="price"
                type="number"
                step="0.01"
                value={editItem.price || ""}
                onChange={onChange}
                className="w-full p-2 border rounded border-gray-200"
              />
            </>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
