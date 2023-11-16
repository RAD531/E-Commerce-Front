import React, { useEffect } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch } from 'react-redux';
import {clearError, clearMessage } from '../redux/actions/toastActions';

const ToastComponent = ({ message, error }) => {
    dispatch = useDispatch();

    useEffect(() => {
        if (message) {
            Toast.show({
                type: 'success',
                text1: message,
                onHide: () => dispatch(clearMessage()),
            });
        } else if (error) {
            Toast.show({
                type: 'error',
                text1: error,
                onHide: () => dispatch(clearError()),
            });
        }
    }, [message, error, dispatch]);

    return null;
};

export default ToastComponent;
