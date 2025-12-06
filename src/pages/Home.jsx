import { useGetProductQuery } from "../services/product";

const Home = () => {
  const { isLoading, data } = useGetProductQuery();

  console.log(data);
  return (
    <>
      <h1 className="text-3xl p-4">Danh sách sản phẩm </h1>
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
      </div>
    </>
  );
};
export default Home;
