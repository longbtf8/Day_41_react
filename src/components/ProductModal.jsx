import { useState } from "react";
import { useAddProductMutation } from "../services/product";

const InputProduct = ({ label, value, name, onChange }) => {
  return (
    <div className=" mt-1">
      <label>
        {label} :
        <input
          type="text"
          name={name}
          value={value}
          className="ml-2 pl-2 border-2 block w-full"
          onChange={onChange}
          required
        />
      </label>
    </div>
  );
};

const ProductModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    tags: "",
    brand: "",
    sku: "",
    weight: "",
    minimumOrderQuantity: "",
    thumbnail: "",
  });
  const [addProduct, { isLoading }] = useAddProductMutation();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      discountPercentage: formData.discountPercentage,
      rating: formData.rating,
      stock: formData.stock,
      brand: formData.brand,
      sku: formData.sku,
      weight: formData.weight,
      minimumOrderQuantity: formData.minimumOrderQuantity,
      thumbnail: formData.thumbnail,
    };
    if (formData.tags) {
      dataToSend.tags = formData.tags.split(",").map((tag) => tag.trim());
    }
    console.log("Data gửi lên:", dataToSend);
    try {
      await addProduct(formData).unwrap();
      alert("Thêm thành công");
      onClose();
    } catch (error) {
      alert("Lỗi addProduct", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-5 bg-black/50  "
      onClick={onClose}
    >
      <div
        className="bg-white p-6 border-2 w-100"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="text-xl text-blue-600">Add Product</h1>
        <form onSubmit={handleSubmit}>
          <InputProduct
            label={"Tên Sản Phẩm"}
            value={formData.title}
            name={"title"}
            onChange={handleChange}
          />
          <InputProduct
            label={"Giá"}
            value={formData.price}
            name={"price"}
            onChange={handleChange}
          />
          <InputProduct
            label={"Mô tả"}
            value={formData.description}
            name="description"
            onChange={handleChange}
          />
          <InputProduct
            label={"Hình ảnh"}
            value={formData.thumbnail}
            name="thumbnail"
            onChange={handleChange}
          />
          <InputProduct
            label={"Category"}
            value={formData.category}
            name="category"
            onChange={handleChange}
          />
          <InputProduct
            label={"DiscountPercentage"}
            value={formData.discountPercentage}
            name="discountPercentage"
            onChange={handleChange}
          />
          <InputProduct
            label={"Rating"}
            value={formData.rating}
            name="rating"
            onChange={handleChange}
          />
          <InputProduct
            label={"Stock"}
            value={formData.stock}
            name="stock"
            onChange={handleChange}
          />
          <InputProduct
            label={"Tags"}
            value={formData.tags}
            name="tags"
            onChange={handleChange}
          />
          <InputProduct
            label={"Brand"}
            value={formData.brand}
            name="brand"
            onChange={handleChange}
          />
          <InputProduct
            label={"Sku"}
            value={formData.sku}
            name="sku"
            onChange={handleChange}
          />
          <InputProduct
            label={"Weight"}
            value={formData.weight}
            name="weight"
            onChange={handleChange}
          />
          <InputProduct
            label={"MinimumOrderQuantity"}
            value={formData.minimumOrderQuantity}
            name="minimumOrderQuantity"
            onChange={handleChange}
          />
          <div className="flex gap-2">
            <button
              className="mt-2 border-2 rounded-full p-0.5 bg-gray-300 cursor-pointer hover:bg-blue-500 transition "
              type="submit"
            >
              Submit
            </button>
            <button
              className="mt-2 border-2 rounded-full p-0.5 bg-gray-300 cursor-pointer hover:bg-blue-500 transition "
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProductModal;
