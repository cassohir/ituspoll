import axios from "axios";

const INET = "192.168.100.105";

export const api = axios.create({
  baseURL: `http://${INET}:3333`,
});
