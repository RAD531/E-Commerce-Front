import { useStripe } from "@stripe/stripe-react-native";

export const stripePayment = async (dispatch, client_secret) => {
    try {
        const stripe = useStripe();

        const init = await stripe.initPaymentSheet({
            paymentIntentClientSecret: client_secret,
            merchantDisplayName: "E-Commerce",
        });

        console.log(JSON.stringify(init));

        if (init.error)
            return dispatch({ type: "paymentOrderFail1", payload: init.error.message });

        const presentSheet = await stripe.presentPaymentSheet();

        console.log(JSON.stringify(presentSheet));

        if (presentSheet.error) {
            return dispatch({ type: "paymentOrderFail2", payload: presentSheet.error.message });
        }

        const { paymentIntent } = await stripe.retrievePaymentIntent(
            client_secret
        );

        console.log(JSON.stringify(paymentIntent));

        if (paymentIntent.status === "Succeeded") {
            return { id: paymentIntent.id, status: paymentIntent.status };
        }
    }

    catch (error) {
        return dispatch({ type: "paymentOrderFail3", payload: error });
    }
};