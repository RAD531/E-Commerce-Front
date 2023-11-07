import { useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { loadUser } from "../redux/actions/userActions";
import { useEffect } from 'react';
import axios from 'axios';
import { server } from "../redux/store";

export const useMessageAndErrorUser = (navigation, dispatch, navigateTo = "login") => {
    const { loading, message, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            Toast.show({
                type: "error",
                text1: error,
            });
            dispatch({
                type: "clearError",
            });
        }

        if (message) {
            navigation.reset({
                index: 0,
                routes: [{ name: navigateTo }],
            });
            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });
            dispatch(loadUser());
        }
    }, [error, message, dispatch]);

    return loading;
};

export const useMessageAndErrorGeneral = (dispatch, reducer, navigation, navigateTo, func) => {
    const { loading, message, error } = useSelector((state) => state[reducer]);

    useEffect(() => {
        if (error) {
            Toast.show({
                type: "error",
                text1: error,
            });
            dispatch({
                type: "clearError",
            });
        }

        if (message) {
            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });

            navigateTo && navigation.navigate(navigateTo);
            func && dispatch(func());
        }
    }, [error, message, dispatch]);

    return loading;
};

export const useSetCategories = (setCategories, isFocused) => {
    useEffect(() => {
        axios.get(`${server}/product/categories`)
            .then(res => {
                setCategories(res.data.categories);
            })
            .catch((e) => {
                Toast.show({
                    type: "error",
                    text: e.response.data.message
                });
            })
    }, [isFocused])
};