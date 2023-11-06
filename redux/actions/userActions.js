import axios from "axios";
import { server } from "../store";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "loginRequest",
        });

        // Axios
        const { data } = await axios.post(`${server}/user/login`,
            {
                email, password,
            },
            {
                headers: { "Content-Type": "application/json", },
            });

        dispatch({
            type: "loginSuccess",
            payload: data.message,
        });
    }

    catch (error) {
        dispatch({
            type: "loginFail",
            payload: error.response.data.message,
        })
    }
}