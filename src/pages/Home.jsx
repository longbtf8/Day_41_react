import { useGetProductQuery } from "../services/product";

const Home = () => {
  const { isLoading, data } = useGetProductQuery();

  console.log(data);
  return (
    <>
      <h1 className="text-3xl p-4">Danh sách sản phẩm </h1>
      {/* <ul className="p-4 flex gap-2">
        <li>Tên</li>
        <li>Giá</li>
        <li>Hình ảnh</li>
        <li>Mô tả ngắn</li>
      </ul> */}
      {/* {data.items.map((item) => {
        <div>
          <p>{item.title}</p>
          <p>{item.price}</p>
          <p>{item.description}</p>
          <p>{item.thumbnail}</p>
        </div>;
      })} */}
    </>
  );
};
export default Home;
