import axios from "axios";

const httpRequest = axios.create({
  baseURL: "https://api01.f8team.dev/api",
});

export default httpRequest;
