import { Toast } from 'react-native-toast-message/lib/src/Toast';

export const toastMiddleware = store => next => action => {

    if (action.type.includes('/executeQuery/') || action.type.includes('/executeMutation/')) {
        const { meta, payload } = action;
        const { dispatch } = store;

        // console.log('\n Handling query or mutation request:', JSON.stringify(action));

        if (meta.requestStatus === "fulfilled" && payload && payload.message) {
            dispatch({ type: "addToMessage", payload: payload.message });
        }

        else if (meta.requestStatus === "rejected" && payload && payload.data.message) {
            dispatch({ type: "addToError", payload: payload.data.message });
        }
    }

    return next(action);
};