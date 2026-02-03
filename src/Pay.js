import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

const API_BASE = "https://fika-node-serverless-function-expre.vercel.app"; // or "" if same project
const pk = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const stripePromise = pk ? loadStripe(pk) : null;

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function CheckoutForm({ applySessionId }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!stripe || !elements) return;

    setSubmitting(true);

    // confirmPayment will redirect to return_url if required (3DS, etc.)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pay/success`,
      },
    });

    if (error) {
      setMessage(error.message || "Payment failed. Please try again.");
      setSubmitting(false);
      return;
    }

    // In most cases Stripe will redirect before reaching here
    navigate("/pay/success");
  }
  console.log("Stripe pk value:", pk);
  console.log("Stripe pk typeof:", typeof pk);
  console.log("Stripe:", stripePromise);

  return (
    <form onSubmit={onSubmit}>
      <PaymentElement />

      {message && (
        <p className="applySubtitle" style={{ color: "crimson", marginTop: 12 }}>
          {message}
        </p>
      )}

      <button className="applyVerifyPrimaryBtn" disabled={!stripe || submitting} style={{ marginTop: 16 }}>
        {submitting ? "Processing…" : "Pay now"}
      </button>

      <p className="applySubtitle" style={{ marginTop: 12, opacity: 0.8 }}>
        Your payment is processed securely by Stripe. We don’t store card details.
      </p>
    </form>
  );
}

export default function Pay() {
  const q = useQuery();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const applySessionId =
    window.sessionStorage.getItem("apply_session_id") || q.get("apply_session_id") || "";

  useEffect(() => {
    let alive = true;

    async function createIntent() {
      setErr("");

      if (!applySessionId) {
        setErr("Missing apply session. Please restart from Apply.");
        setLoading(false);
        return;
      }

      try {
        const r = await fetch("/api/pay/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apply_session_id: applySessionId }),
        });

        const data = await r.json();
        if (!r.ok || !data.ok) throw new Error(data.error || "Failed to initialize payment");

        if (alive) {
          setClientSecret(data.client_secret);
          setLoading(false);
        }
      } catch (e) {
        if (alive) {
          setErr(e.message);
          setLoading(false);
        }
      }
    }

    createIntent();
    return () => {
      alive = false;
    };
  }, [applySessionId]);

  return (
    <div className="applyPage">
         <header className="applyHeader">
      </header>

      <main className="applyMain">
        <section className="applyCard">
          <h1 className="applyTitle">Complete payment</h1>
          <p className="applySubtitle">Enter your card details below.</p>

          {loading && <p className="applySubtitle">Loading payment form…</p>}

          {err && (
            <p className="applySubtitle" style={{ color: "crimson" }}>
              {err}
            </p>
          )}

          {!loading && !err && clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: { theme: "stripe" },
              }}
            >
              <CheckoutForm applySessionId={applySessionId} />
            </Elements>
          )}
        </section>
      </main>
    </div>
  );
}
