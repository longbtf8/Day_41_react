import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../services/product";
import ProductModal from "../components/ProductModal";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data } = useGetProductQuery(currentPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPage = data?.pagination?.last_page || 1;
  const pageNumber = Array.from({ length: totalPage }, (_, i) => i + 1);
  const [selectProduct, setSelectProduct] = useState(null);
  const [deleteProduct] = useDeleteProductMutation();
  // handle add
  const handleAddProduct = () => {
    // Mở modal
    setSelectProduct(null);
    setIsModalOpen(true);
  };
  const handleEdit = (product) => {
    setSelectProduct(product);
    setIsModalOpen(true);
  };
  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa sản phẩm này ${title}?`
    );
    if (confirmDelete) {
      try {
        const result = await deleteProduct(id).unwrap();
        console.log(result);
        alert("Xóa sản phẩm thành công");
      } catch (error) {
        console.error("Lỗi xóa sản phẩm:", error);
        alert("Lỗi khi xóa sản phẩm.");
      }
    }
  };
  return (
    <>
      <div className="flex justify-between p-4">
        <h1 className="text-3xl ">Danh sách sản phẩm </h1>
        <button
          className="rounded border-2 p-2 bg-blue-500"
          onClick={handleAddProduct}
        >
          Thêm Sản Phẩm
        </button>
      </div>
      <div className="p-4">
        <ul className="grid grid-cols-5 border-b-2">
          <li className="border-r-2">Hình ảnh</li>
          <li className="border-r-2">Tên Sản Phẩm </li>
          <li className="border-r-2">Giá</li>
          <li className=" border-r-2">Mô tả ngắn</li>
          <li className=" px-2">Tác vụ</li>
        </ul>
        {isLoading
          ? "Loading..."
          : data.items.map((item) => (
              <div key={item.id} className="grid grid-cols-5 border-b-2 ">
                <p className="wrap-break-word border-r-2">{item.thumbnail}</p>
                <p className="border-r-2">{item.title}</p>
                <p className="border-r-2 ">{item.price}</p>
                <p className="border-r-2">{item.description}</p>
                <div className=" px-2 flex gap-2 justify-center items-center py-2 ">
                  <button
                    className=" bg-blue-400 border-2 rounded-2xl h-8 w-15"
                    onClick={() => {
                      handleEdit(item);
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-blue-400 border-2 rounded-2xl h-8 w-15"
                    onClick={() => {
                      handleDelete(item.id, item.title);
                    }}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}

        {/* Phaan trang */}
        <div className="pt-5 flex justify-between">
          {pageNumber.map((page, index) => (
            <button
              key={index}
              className={`px-3 py-1 border rounded-full w-10 h-10  ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-500 transition"
              }`}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectProduct}
      />
    </>
  );
};
export default Home;
