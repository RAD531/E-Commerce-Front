import axios from "axios";
import { server } from "../store";

const axiosInstance = axios.create({
    baseURL: server,
    withCredentials: true,
});

export const axiosApiRequest = async (method, url, data, contentType, dispatch, dispatchTypes, returnProperty) => {
    const { requestDispatch, successDispatch, errorDispatch } = dispatchTypes;
    try {
        // dispatch first request
        dispatch({ type: requestDispatch });

        const headers = {};

        if (contentType !== null) {
            headers["Content-Type"] = contentType;
        }

        // build requestConfig
        const requestConfig = {
            method,
            url,
            headers,
        };

        if (data) requestConfig.data = data; // if data, include

        // make request
        const { data } = await axiosInstance.request({ ...requestConfig });

        // dispatch success
        dispatch({ type: successDispatch, payload: data[returnProperty]});
    }

    catch (error) {

        // dispatch error
        dispatch({ type: errorDispatch, payload: error.response.data.message });
    }
}