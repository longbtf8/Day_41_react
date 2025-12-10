import { useState } from "react";
import { useAddProductMutation } from "../services/product";

const InputProduct = ({ label, value, name, onChange, error }) => {
  return (
    <div className="w-1/2 px-2">
      <label className="block">
        <span className="block mb-1">{label}:</span>
        <input
          type="text"
          name={name}
          value={value}
          className="pl-2 border-2 block w-full"
          onChange={onChange}
        />
        <div className="h-10 mt-1">
          {error && (
            <span className="text-red-500 text-sm block mt-1">{error}</span>
          )}
        </div>
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
  const [addProduct] = useAddProductMutation();
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //   validate
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Vui lòng nhập tên sản phẩm";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Vui lòng nhập giá";
    } else if (isNaN(formData.price)) {
      newErrors.price = "Giá phải là số";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Vui lòng nhập danh mục";
    }

    if (!formData.thumbnail.trim()) {
      newErrors.thumbnail = "Vui lòng nhập link hình ảnh";
    }

    if (!formData.discountPercentage.trim()) {
      newErrors.discountPercentage = "Vui lòng nhập discount percentage";
    } else if (isNaN(formData.discountPercentage)) {
      newErrors.discountPercentage = "Discount percentage phải là số";
    }

    if (!formData.rating.trim()) {
      newErrors.rating = "Vui lòng nhập rating";
    } else if (isNaN(formData.rating)) {
      newErrors.rating = "Rating phải là số";
    }

    if (!formData.stock.trim()) {
      newErrors.stock = "Vui lòng nhập stock";
    } else if (isNaN(formData.stock)) {
      newErrors.stock = "Stock phải là số";
    }

    if (!formData.tags.trim()) {
      newErrors.tags = "Vui lòng nhập tags";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Vui lòng nhập brand";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "Vui lòng nhập SKU";
    }

    if (!formData.weight.trim()) {
      newErrors.weight = "Vui lòng nhập weight";
    } else if (isNaN(formData.weight)) {
      newErrors.weight = "Weight phải là số";
    }

    if (!formData.minimumOrderQuantity.trim()) {
      newErrors.minimumOrderQuantity = "Vui lòng nhập minimum order quantity";
    } else if (isNaN(formData.minimumOrderQuantity)) {
      newErrors.minimumOrderQuantity = "Minimum order quantity phải là số";
    }

    return newErrors;
  };

  //  submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
      await addProduct(dataToSend).unwrap();
      alert("Thêm thành công");
      setErrors({});

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
          <div className="flex flex-wrap">
            <InputProduct
              label="Tên Sản Phẩm"
              value={formData.title}
              name="title"
              onChange={handleChange}
              error={errors.title}
            />
            <InputProduct
              label="Giá"
              value={formData.price}
              name="price"
              onChange={handleChange}
              error={errors.price}
            />
            <InputProduct
              label="Mô tả"
              value={formData.description}
              name="description"
              onChange={handleChange}
              error={errors.description}
            />
            <InputProduct
              label="Hình ảnh"
              value={formData.thumbnail}
              name="thumbnail"
              onChange={handleChange}
              error={errors.thumbnail}
            />
            <InputProduct
              label="Category"
              value={formData.category}
              name="category"
              onChange={handleChange}
              error={errors.category}
            />
            <InputProduct
              label="Discount Percentage"
              value={formData.discountPercentage}
              name="discountPercentage"
              onChange={handleChange}
              error={errors.discountPercentage}
            />
            <InputProduct
              label="Rating"
              value={formData.rating}
              name="rating"
              onChange={handleChange}
              error={errors.rating}
            />
            <InputProduct
              label="Stock"
              value={formData.stock}
              name="stock"
              onChange={handleChange}
              error={errors.stock}
            />
            <InputProduct
              label="Tags (phân cách bằng dấu phẩy)"
              value={formData.tags}
              name="tags"
              onChange={handleChange}
              error={errors.tags}
            />
            <InputProduct
              label="Brand"
              value={formData.brand}
              name="brand"
              onChange={handleChange}
              error={errors.brand}
            />
            <InputProduct
              label="SKU"
              value={formData.sku}
              name="sku"
              onChange={handleChange}
              error={errors.sku}
            />
            <InputProduct
              label="Weight"
              value={formData.weight}
              name="weight"
              onChange={handleChange}
              error={errors.weight}
            />
            <InputProduct
              label="Minimum Order Quantity"
              value={formData.minimumOrderQuantity}
              name="minimumOrderQuantity"
              onChange={handleChange}
              error={errors.minimumOrderQuantity}
            />
          </div>
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
