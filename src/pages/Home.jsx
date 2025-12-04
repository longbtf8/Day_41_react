import { useGetProductQuery } from "../services/product";

const Home = () => {
  const data = useGetProductQuery();
  console.log(data);
  return (
    <>
      <h1 className="text-3xl p-4">Danh sách sản phẩm </h1>
    </>
  );
};
export default Home;
