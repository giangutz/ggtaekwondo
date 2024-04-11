import React, { useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { checkoutOrder, createOrder } from "@/lib/actions/order.actions";
import mongoose from "mongoose";

// loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      //   eventTitle: event.title,
      createdAt: new Date(Date.now()),
      eventId: event._id,
      //   price: event.price,
      //   isFree: event.isFree,
      buyerId: userId,
    };

    await createOrder(order);
  };

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {/* {event.isFree ? "Get Ticket" : "Buy Ticket"} */} Join Class
      </Button>
    </form>
  );
};

export default Checkout;
