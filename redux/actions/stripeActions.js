import { useStripe } from "@stripe/stripe-react-native";

export const stripePayment = (dispatch, client_secret) => async () => {
    try {
        const stripe = useStripe();

        const init = await stripe.initPaymentSheet({
            paymentIntentClientSecret: client_secret,
            merchantDisplayName: "E-Commerce",
        });

        if (init.error)
            return dispatch({ type: "paymentOrderFail", payload: init.error.message });

        const presentSheet = await stripe.presentPaymentSheet();

        if (presentSheet.error) {
            return dispatch({ type: "paymentOrderFail", payload: presentSheet.error.message });
        }

        const { paymentIntent } = await stripe.retrievePaymentIntent(
            client_secret
        );

        if (paymentIntent.status === "Succeeded") {
            return { id: paymentIntent.id, status: paymentIntent.status };
        }
    }

    catch (error) {
        return dispatch({ type: "paymentOrderFail", payload: error });
    }
};