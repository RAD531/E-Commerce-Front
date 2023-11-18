import { axiosApiRequest } from "../api/axiosRequest";
import { stripePayment } from "./stripeActions";

export const placeOrder = (orderItems, shippingInfo, paymentMethod, itemsPrice, taxPrice, shippingCharges, totalAmount) => async (dispatch) => {

    let paymentInfo = null;

    if (paymentMethod === "ONLINE") {
        paymentInfo = await paymentOrder(dispatch, totalAmount);
        console.log(JSON.stringify(paymentInfo));
    }

    const actionTypes = {
        requestDispatch: "placeOrderRequest",
        successDispatch: "placeOrderSuccess",
        errorDispatch: "placeOrderFail",
    };

    if (paymentInfo !== undefined || paymentInfo) {
        await axiosApiRequest("post", "/order/new", { shippingInfo, orderItems, paymentMethod, paymentInfo, itemsPrice, taxPrice, shippingCharges, totalAmount }, "application/json", dispatch, actionTypes, "message");
    }
};

const paymentOrder = async (dispatch, totalAmount) => {
    const actionTypes = {
        requestDispatch: "paymentOrderRequest",
        successDispatch: "paymentOrderSuccess",
        errorDispatch: "paymentOrderFail",
    };

    const client_secret = await axiosApiRequest("post", `/order/payment`, { totalAmount }, "application/json", dispatch, actionTypes, "client_secret", true);
    return stripePayment(dispatch, client_secret);
};
