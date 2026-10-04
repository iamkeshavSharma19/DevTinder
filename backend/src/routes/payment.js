import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import razorpayInstance from "../utils/razorpay.js";

const paymentRouter = Router();

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    //?Step1 ==> Creating An Order.
    const order = await razorpayInstance.orders.create({
      amount: 50000, //5000 rupees
      currency: "INR",
      receipt: "receipt#1",

      notes: {
        firstName: "value3",
        lastName: "value2",
        membershipType: "silver",
      },
    });

    //?Step2 ==> Saving the order inside the database.
    console.log(order);

    //?Step3 ==> Return back the order details to frontend
    res.status(200).json({
      success: true,
      message: "Order Created Successfully",
      order,
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
