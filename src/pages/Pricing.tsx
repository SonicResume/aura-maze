import { useState } from "react";
import { getAuth } from "firebase/auth";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Start exploring Aura Maze.",
    features: [
      "Access to free games",
      "Basic game progress",
      "No subscription required",
    ],
    planKey: "free",
  },
  {
    name: "Pro",
    price: "$19",
    description: "For players who want more.",
    features: [
      "All Pro games",
      "Full game progress",
      "More experiences",
    ],
    planKey: "pro",
    priceId: "price_1TbF9BPE4wCsfg732ScUJfmc",
  },
  {
    name: "Business",
    price: "$29",
    description: "More access for teams and groups.",
    features: [
      "Business games",
      "Expanded access",
      "Team-friendly features",
    ],
    planKey: "business",
    priceId: "price_1TnzrFPE4wCsfg73xSOMZNuH",
  },
  {
    name: "Premium",
    price: "$49",
    description: "The complete Aura Maze experience.",
    features: [
      "All premium games",
      "Full access",
      "Premium experiences",
    ],
    planKey: "premium",
    priceId: "price_1TGwAJPE4wCsfg73gMQlv8Ph",
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  async function handleCheckout(plan) {
    if (!plan.priceId) return;

    setError("");
    setLoading(plan.planKey);

    try {
      const auth = getAuth();
      const email = auth.currentUser?.email || "test@example.com";

      const response = await fetch(import.meta.env.VITE_BILLING_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_id: plan.priceId,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to start checkout.");
      }

      const data = await response.json();

      if (!data.url) {
        throw new Error("Checkout URL was not returned.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setLoading(null);
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-300">
          Aura Maze
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
          Choose your experience
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
          Explore Aura Maze with the plan that fits how you want to play.
        </p>
      </div>

      {error && (
        <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-center text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => {
          const isFree = !plan.priceId;
          const isLoading = loading === plan.planKey;

          return (
            <article
              key={plan.planKey}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/20 backdrop-blur"
            >
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {plan.name}
                </h2>

                <p className="mt-3 min-h-12 text-sm leading-6 text-zinc-400">
                  {plan.description}
                </p>
              </div>

              <div className="mt-7">
                <span className="text-5xl font-bold tracking-tight text-white">
                  {plan.price}
                </span>

                {!isFree && (
                  <span className="ml-2 text-sm text-zinc-500">/ month</span>
                )}
              </div>

              <ul className="mt-8 flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm leading-6 text-zinc-300"
                  >
                    <span className="mt-1 text-purple-300">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                disabled={isFree || loading !== null}
                onClick={() => handleCheckout(plan)}
                className={`mt-8 w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition ${
                  isFree
                    ? "cursor-default border border-white/10 bg-white/5 text-zinc-500"
                    : "bg-white text-black hover:bg-zinc-200 disabled:cursor-wait disabled:opacity-60"
                }`}
              >
                {isLoading
                  ? "Opening checkout..."
                  : isFree
                    ? "Current free plan"
                    : `Choose ${plan.name}`}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}