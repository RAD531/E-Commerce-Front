import { useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useEffect, useState } from 'react';

export const useMessageAndError = (dispatch, navigation, navigateTo, resetNavigation = false, stateReducer, dispatchFunc, loader="loading") => {
    const { message, error } = useSelector((state) => state[stateReducer]);
    loader = useSelector((state) => state[stateReducer][loader]);

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

            if (resetNavigation) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: navigateTo }],
                });
            }

            else {
                navigateTo && navigation.navigate(navigateTo);
            }

            dispatchFunc && dispatch(dispatchFunc());
        }
    }, [error, message, dispatch]);

    return loader;
};

export const useDebouncedValue = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const debounceId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(debounceId);
        };
    }, [value, delay]);

    return debouncedValue;
};
