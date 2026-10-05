import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import razorpayInstance from "../utils/razorpay.js";
import { Payment } from "../models/Payment.js";
import { memberShipAmount } from "../utils/constants.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";

const paymentRouter = Router();

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    //?Step1 ==> Creating An Order.
    const { memberShipType } = req.body;
    const { firstName, lastName, emailId } = req.user;
    const order = await razorpayInstance.orders.create({
      amount: memberShipAmount[memberShipType] * 100,
      currency: "INR",
      receipt: "receipt#1",

      notes: {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        memberShipType: memberShipType,
      },
    });

    //?Step2 ==> Saving the order inside the database.
    console.log(order);

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    console.log(payment);

    const savedPayment = await payment.save();

    //?Step3 ==> Return back the order details to frontend
    res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      ...savedPayment.toJSON(),
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
});

//?Step2 ==> Creating a web hook API
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    //!GETTING THE WEBHOOK SIGNATURE.
    const webhookSignature = req.headers["X-Razorpay-Signature"];
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );

    if (!isWebhookValid) {
      return res.status(400).json({
        success: false,
        message: "Webhook signature is invalid",
      });
    }

    //?if the web hook is valid, we need to find out whether the payment is failed or captured.

    

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

export default paymentRouter;
