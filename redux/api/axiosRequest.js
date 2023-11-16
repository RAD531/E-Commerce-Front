import axios from "axios";
import { server } from "../store";

const axiosInstance = axios.create({
    baseURL: server,
    withCredentials: true,
});

export const axiosApiRequest = async (method, url, body, contentType, dispatch, dispatchTypes, returnProperty, useNoDispatchOnSuccess) => {
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

        if (body) requestConfig.data = body; // if data, include

        // make request
        const { data } = await axiosInstance.request({ ...requestConfig });

        // if we have indicated to not return a dispatch, then return value
        if (useNoDispatchOnSuccess) {
            return returnProperty ? data[returnProperty] : data
        }

        // dispatch success
        dispatch({ type: successDispatch, payload: returnProperty ? data[returnProperty] : data });
    }

    catch (error) {
        // dispatch error
        let errorMessage = "An error occurred";
        if (error.response.data.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        dispatch({ type: errorDispatch, payload: errorMessage });
    }
}