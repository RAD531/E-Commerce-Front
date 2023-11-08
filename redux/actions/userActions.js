import axios from "axios";
import { server } from "../store";
import { axiosApiRequest } from "../api/axiosRequest";

export const register = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "registerRequest",
        });

        // Axios
        const { data } = await axios.post(`${server}/user/register`, formData,
            {
                headers: { "Content-Type": "multipart/form-data", },
                withCredentials: true,
            },
        )

        dispatch({
            type: "registerSuccess",
            payload: data.message,
        });
    }

    catch (error) {
        dispatch({
            type: "registerFail",
            payload: error.response.data.message,
        })
    }
}

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
                withCredentials: true,
            },
        )

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

export const loadUser = () => async (dispatch) => {
    // try {
    //     dispatch({
    //         type: "loadUserRequest",
    //     });

    //     const { data } = await axios.get(`${server}/user/profile`,
    //         {
    //             withCredentials: true,
    //         }
    //     );

    //     dispatch({
    //         type: "loadUserSuccess",
    //         payload: data.user,
    //     });
    // }

    // catch (error) {
    //     dispatch({
    //         type: "loadUserFail",
    //         payload: error.response.data.message,
    //     })
    // }

    const actionTypes = {
        requestDispatch: "loadUserRequest",
        successDispatch: "loadUserSuccess",
        errorDispatch: "loadUserFail",
    };

    await axiosApiRequest("get", "/user/profile", null, null, dispatch, actionTypes, "user");
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutRequest",
        });

        const { data } = await axios.get(`${server}/user/logout`,
            {
                withCredentials: true,
            }
        );

        dispatch({
            type: "logoutSuccess",
            payload: data.message,
        });
    }

    catch (error) {
        dispatch({
            type: "logoutFail",
            payload: error.response.data.message,
        })
    }
}