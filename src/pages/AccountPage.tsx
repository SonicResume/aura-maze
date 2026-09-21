"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  ShieldAlert,
  LogOut,
  Trash2,
  Sparkles,
  Check,
} from "lucide-react";

import { auth } from "../firebase-config";
import {
  deleteUser,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

const STRIPE_PRO_PRICE_ID =
  "price_1TbF9BPE4wCsfg732ScUJfmc";

const STRIPE_BUSINESS_PRICE_ID =
  "price_1TnzrFPE4wCsfg73xSOMZNuH";

const STRIPE_PREMIUM_PRICE_ID =
  "price_1TGwAJPE4wCsfg73gMQlv8Ph";

export default function AccountPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [plan, setPlan] = useState("free");
  const [credits, setCredits] = useState(20);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (currentUser) => {
        setUser(currentUser);

        if (currentUser) {
          const userRef = doc(db, "users", currentUser.uid);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            const data = snap.data();

            setPlan(data.plan || "free");
            setCredits(data.credits ?? 20);
          }
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const openDashboard = () => {
    if (plan === "free" && credits <= 0) {
      navigate("/pricing");
      return;
    }

    navigate("/dashboard");
  };

  const handleCheckout = async (
    priceId: string,
    planKey: string
  ) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setCheckoutLoading(planKey);

    try {
      const BILLING_URL = import.meta.env.VITE_BILLING_URL;

      if (!BILLING_URL) {
        throw new Error("Billing URL is not configured.");
      }

      const res = await fetch(BILLING_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_id: priceId,
          email: user.email || "test@example.com",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.detail ||
            data.error ||
            "Checkout failed"
        );
      }

      if (!data.url) {
        throw new Error("No checkout URL returned");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);

      alert(
        "Something went wrong starting checkout."
      );
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const ok = window.confirm(
      "Delete your account permanently?"
    );

    if (!ok) return;

    setActionLoading(true);

    try {
      await deleteUser(user);
      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        "Please login again before deleting your account."
      );
    }

    setActionLoading(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090708] px-6 text-zinc-400">
        Loading account...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090708] px-4 py-10 text-white md:px-6 md:py-16">
      <div className="mx-auto w-full max-w-2xl space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-bold text-purple-300 transition hover:text-purple-200"
          >
            ← Dashboard
          </button>

          <h1 className="text-lg font-black tracking-wide text-white">
            AURA MAZE
          </h1>
        </div>

        {/* Account information */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-3 text-purple-300">
              <User size={22} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Account
              </p>

              <p className="mt-1 truncate font-bold text-white">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Plan */}
        <div className="overflow-hidden rounded-3xl border border-[#9a6a3f]/30 bg-gradient-to-br from-[#171015] via-[#110d10] to-[#17100b] p-6 shadow-2xl shadow-black/40">

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-[#9a6a3f]/30 bg-[#9a6a3f]/10 p-2.5 text-[#d3a875]">
              <Sparkles size={20} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a98058]">
                Current Plan
              </p>

              <h2 className="mt-1 text-2xl font-black text-white">
                {plan.toUpperCase()}
              </h2>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-zinc-400">
              Credits remaining
            </p>

            <p className="mt-1 text-2xl font-bold text-white">
              {plan === "free" ? credits : "Unlimited"}
            </p>
          </div>

          {/* Features */}
          <div className="mt-6 space-y-3">
            {[
              "AI Translation",
              "Language Tools",
              "Audio Features",
              "Premium Modules",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-zinc-300"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/10 text-purple-300">
                  <Check size={14} />
                </span>

                {item}
              </div>
            ))}
          </div>

          {/* Dashboard */}
          <button
            onClick={openDashboard}
            className="mt-7 w-full rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-[#9a6a3f] py-3.5 font-bold text-white shadow-lg shadow-purple-950/30 transition hover:from-purple-600 hover:via-purple-500 hover:to-[#b17b4c]"
          >
            Open Dashboard
          </button>

          {plan === "free" && (
            <p className="mt-4 text-center text-xs text-[#c99a63]">
              Free accounts include 20 credits. Upgrade when
              your credits run out.
            </p>
          )}

          {/* Upgrades */}
          <div className="mt-7 border-t border-white/10 pt-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Upgrade your experience
            </p>

            <div className="space-y-3">

              <button
                onClick={() =>
                  handleCheckout(
                    STRIPE_PRO_PRICE_ID,
                    "pro"
                  )
                }
                disabled={checkoutLoading !== null}
                className="w-full rounded-xl border border-purple-400/30 bg-purple-500/10 py-3.5 font-bold text-purple-200 transition hover:bg-purple-500/20 disabled:cursor-wait disabled:opacity-50"
              >
                {checkoutLoading === "pro"
                  ? "Loading..."
                  : "Upgrade Pro — $19/mo"}
              </button>

              <button
                onClick={() =>
                  handleCheckout(
                    STRIPE_BUSINESS_PRICE_ID,
                    "business"
                  )
                }
                disabled={checkoutLoading !== null}
                className="w-full rounded-xl border border-[#9a6a3f]/40 bg-[#9a6a3f]/10 py-3.5 font-bold text-[#d3a875] transition hover:bg-[#9a6a3f]/20 disabled:cursor-wait disabled:opacity-50"
              >
                {checkoutLoading === "business"
                  ? "Loading..."
                  : "Business — $29/mo"}
              </button>

              <button
                onClick={() =>
                  handleCheckout(
                    STRIPE_PREMIUM_PRICE_ID,
                    "premium"
                  )
                }
                disabled={checkoutLoading !== null}
                className="w-full rounded-xl border border-white/15 bg-white/[0.06] py-3.5 font-bold text-white transition hover:bg-white/10 disabled:cursor-wait disabled:opacity-50"
              >
                {checkoutLoading === "premium"
                  ? "Loading..."
                  : "Premium — $49/mo"}
              </button>

            </div>
          </div>
        </div>

        {/* Account actions */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-4 font-semibold text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
          >
            <LogOut size={16} />
            Logout
          </button>

          <button
            disabled={actionLoading}
            onClick={handleDeleteAccount}
            className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-4 font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
          >
            <Trash2 size={16} />
            {actionLoading ? "Deleting..." : "Delete Account"}
          </button>

        </div>

        {/* Security */}
        <div className="flex items-center justify-center gap-2 pb-4 text-xs text-zinc-600">
          <ShieldAlert size={14} />
          Firebase secured account access
        </div>

      </div>
    </div>
  );
}