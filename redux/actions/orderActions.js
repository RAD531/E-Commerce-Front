import { axiosApiRequest } from "../api/axiosRequest";
import { stripePayment } from "./stripeActions";

export const placeOrder = (orderItems, shippingInfo, paymentMethod, itemsPrice, taxPrice, shippingCharges, totalAmount, paymentInfo) => async (dispatch) => {

    if (paymentMethod === "ONLINE") {
        paymentInfo = await paymentOrder(dispatch, totalAmount);
    }

    const actionTypes = {
        requestDispatch: "placeOrderRequest",
        successDispatch: "placeOrderSuccess",
        errorDispatch: "placeOrderFail",
    };

    await axiosApiRequest("post", "/order/new", { shippingInfo, orderItems, paymentMethod, paymentInfo, itemsPrice, taxPrice, shippingCharges, totalAmount }, "application/json", dispatch, actionTypes, "message");
};

const paymentOrder = (dispatch, totalAmount) => async () => {
    const actionTypes = {
        requestDispatch: "paymentOrderRequest",
        successDispatch: "paymentOrderSuccess",
        errorDispatch: "paymentOrderFail",
    };

    const client_secret = await axiosApiRequest("post", `/order/payment`, { totalAmount }, "application/json", dispatch, actionTypes, "client_secret", true);
    return stripePayment(dispatch, client_secret);
};
