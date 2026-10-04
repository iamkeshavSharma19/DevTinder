import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import razorpayInstance from "../utils/razorpay.js";
import { Payment } from "../models/Payment.js";
import { memberShipAmount } from "../utils/constants.js";

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

export default paymentRouter;
