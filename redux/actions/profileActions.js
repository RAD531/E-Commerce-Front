import axios from "axios";
import { server } from "../store"

export const updateProfile = (name, email, address, city, country, pinCode) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest",
        });

        const { data } = await axios.put(`${server}/user/updateprofile`, { name, email, address, city, country, pinCode }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });

        dispatch({
            type: "updateProfileSuccess",
            payload: data.message,
        });
    }

    catch (error) {
        dispatch({
            type: "updateProfileFail",
            payload: error.response.data.message,
        });
    }
};

export const updateProfilePicture = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfilePictureRequest",
        });

        // Axios
        const { data } = await axios.put(`${server}/user/updatepic`, formData,
            {
                headers: { "Content-Type": "multipart/form-data", },
                withCredentials: true,
            },
        )

        dispatch({
            type: "updateProfilePictureSuccess",
            payload: data.message,
        });
    }

    catch (error) {
        dispatch({
            type: "updateProfilePictureFail",
            payload: error.response.data.message,
        })
    }
}
