const express = require('express');
const router = new express.Router();
const Stripe = require('stripe');

const PUBLISHABLE_KEY = "pk_test_51MrfnfLJL9bbPRxLiiBurdkzqTQzXh5OqT3yeZZWIJbcKNjU64EirIZcjFrkYEHzdPLYNkBV2h1Agoy9KwOtBOyI00a3reey17";
const SECRET_KEY = "sk_test_51MrfnfLJL9bbPRxLzb6sGGFQ32wwegzT9ybliNhrMOXWn5vj84stCkqL36XWVD5gowsfBYglTvhhxQW6oRsoo2mA00VpOl82co";

const stripe = new Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
})
router.post("/process-payment", async (req, res) => {
    try {
      const { email, cardDetails } = req.body;
  
      // Log email and card details
      console.log("Email:", email);
      console.log("Card Details:", cardDetails);
  
      // Process payment and perform necessary actions
  
      res.sendStatus(200); // Success response
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to process payment" });
    }
  });

  
  

module.exports = router;
