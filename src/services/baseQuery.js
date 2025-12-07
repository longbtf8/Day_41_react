import httpRequest from "../utils/httpRequest";

const baseQuery = async (args) => {
  const isObject = typeof args == "object";
  const config = {
    url: isObject ? args.url : args,
    method: isObject ? args.method : "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (isObject) {
    if (args.body) config.data = args.body;
    if (args.headers) config.headers = { ...config.headers, ...args.headers };
  }
  console.log(config);
  try {
    const response = await httpRequest(config);
    return response;
  } catch (error) {
    return { error };
  }
};
export default baseQuery;
