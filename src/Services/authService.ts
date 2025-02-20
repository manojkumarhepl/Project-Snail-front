import axios from "axios";

const API_URL = "http://localhost:8001/api/auth";

const login = async(data: {email:string, password:string}) => {
    const response = await axios.post(`${API_URL}/login`,data)
    return response.data;
}

export default {login}