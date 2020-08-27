import axios from "@/plugin/axios";

const dataServer = axios(process.env.VUE_APP_DATA_API);

export { dataServer };
