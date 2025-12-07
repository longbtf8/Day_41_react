import { useState } from "react";
import { useGetProductQuery } from "../services/product";
import ProductModal from "../components/ProductModal";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data } = useGetProductQuery(currentPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPage = data?.pagination?.last_page || 1;
  const pageNumber = Array.from({ length: totalPage }, (_, i) => i + 1);
  return (
    <>
      <div className="flex justify-between p-4">
        <h1 className="text-3xl ">Danh sách sản phẩm </h1>
        <button
          className="rounded border-2 p-2 bg-blue-500"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Thêm Sản Phẩm
        </button>
      </div>
      <div className="p-4">
        <ul className="flex  border-b-2">
          <li className="w-1/4 border-r-2">Hình ảnh</li>
          <li className="w-1/4 border-r-2">Tên Sản Phẩm </li>
          <li className="w-1/4 border-r-2">Giá</li>
          <li className="w-1/4 border-r-2">Mô tả ngắn</li>
        </ul>
        {isLoading
          ? "Loading..."
          : data.items.map((item) => (
              <div key={item.id} className="flex border-b-2 ">
                <p className="w-1/4 wrap-break-word border-r-2">
                  {item.thumbnail}
                </p>
                <p className="w-1/4 border-r-2">{item.title}</p>
                <p className="w-1/4 border-r-2 ">{item.price}</p>
                <p className="w-1/4 border-r-2">{item.description}</p>
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
      />
    </>
  );
};
export default Home;
