import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import razorpayInstance from "../utils/razorpay.js";
import { Payment } from "../models/Payment.js";
import { memberShipAmount } from "../utils/constants.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import { User } from "../models/user.js";

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
    const webhookSignature = req.headers["x-razorpay-signature"];
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

    //?When you write req.body,Node.JS gives you access to an event Object.

    //^If the web Hook is valid I will update my payment status in DB

    //~Update the User as premium.

    //~Then Return the success response (200) to razorpay

    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    payment.status = paymentDetails.status;

    await payment.save();

    const user = await User.findOne({ _id: payment.userId });

    user.isPremium = true;
    user.memberShipType = payment.notes.memberShipType;

    await user.save();

    // if (req.body.event === "payment.captured") {

    // }

    // if (req.body.event === "payment.failed") {
    // }

    return res.status(200).json({
      success: true,
      message: "Webhook received successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});
// paymentRouter.post("/payment/webhook", async (req, res) => {
//   try {
//     const webhookSignature = req.headers["x-razorpay-signature"];

//     // 1. Signature Verify (Testing ke liye log lagaya hai)
//     const isWebhookValid = validateWebhookSignature(
//       JSON.stringify(req.body),
//       webhookSignature,
//       process.env.RAZORPAY_WEBHOOK_SECRET,
//     );

//     if (!isWebhookValid) {
//       console.log("❌ Webhook Signature Invalid!");
//       return res.status(400).json({
//         success: false,
//         message: "Webhook signature is invalid",
//       });
//     }

//     const event = req.body.event;
//     const paymentDetails = req.body.payload.payment.entity;

//     console.log(
//       `📩 Webhook Event Received: ${event} for Order ID: ${paymentDetails.order_id}`,
//     );

//     // 2. Find Payment in DB
//     const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

//     if (!payment) {
//       console.log("❌ Payment record not found in DB!");
//       return res
//         .status(404)
//         .json({ success: false, message: "Payment record not found" });
//     }

//     // Status update karo (captured, failed, etc.)
//     payment.status = paymentDetails.status;
//     await payment.save();

//     // 3. ONLY UPGRADE USER IF PAYMENT IS CAPTURED
//     if (event === "payment.captured") {
//       const user = await User.findOne({ _id: payment.userId });

//       if (user) {
//         user.isPremium = true;
//         // Safe access using optional chaining
//         user.memberShipType = payment.notes?.memberShipType || "gold";
//         await user.save();
//         console.log(`🎉 User ${user._id} upgraded to Premium successfully!`);
//       } else {
//         console.log("❌ User not found for ID:", payment.userId);
//       }
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Webhook processed successfully",
//     });
//   } catch (error) {
//     console.error("💥 Webhook Crash Error:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Something Went Wrong",
//       error: error.message,
//     });
//   }
// });

export default paymentRouter;
