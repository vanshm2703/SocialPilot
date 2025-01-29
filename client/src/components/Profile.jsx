import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

// Counter component for animated numbers
const Counter = ({ value, direction = "up" }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          latest.toFixed(0)
        );
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
};

// TextTicker component for rendering the animated number
const TextTicker = ({ value }) => {
  return (
    <div className="text-3xl font-bold tabular-nums tracking-tight">
      <Counter value={value} direction="up" />
    </div>
  );
};

// Profile component that uses TextTicker for number animation
const Profile = () => {
  return (
    <div>
      {/* <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold">Manage Social Media</h1>
        <button className="bg-red-600 px-5 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
          Log out
        </button>
      </header> */}

      <div className="grid grid-cols-3 gap-8">
        {/* Outreach Card */}
        <div className="bg-gray-800 border border-gray-500 p-8 rounded-xl shadow-md">
          <p className="text-gray-400">Outreach</p>
          <h2 className="text-4xl font-extrabold">
            <TextTicker value={12584} />
          </h2>
        </div>

        {/* Progress Card */}
        <div className="bg-gray-800 border border-gray-500 p-8 rounded-xl shadow-md">
          <h3 className="text-lg text-gray-400">Progress</h3>
          <p className="text-2xl font-bold text-blue-400">
            <TextTicker value={12453} />
          </p>
        </div>

        {/* Downloads Card */}
        <div className="bg-gray-800 border border-gray-500 p-8 rounded-xl shadow-md">
          <h3 className="text-lg text-gray-400">Downloads</h3>
          <p className="text-2xl font-bold text-green-400">
            <TextTicker value={562} />
          </p>
        </div>

        {/* Orders & Analytics */}
        <div className="bg-gray-800 border border-gray-500 p-8 rounded-xl shadow-md col-span-2">
          <h3 className="text-lg text-gray-400">Average Orders</h3>
          <p className="text-3xl font-bold text-yellow-400">
            <TextTicker value={12500} />
          </p>
        </div>

        {/* Time Spent on App */}
        <div className="bg-gray-800 border border-gray-500 p-8 rounded-xl shadow-md">
          <h3 className="text-lg text-gray-400">Time Spent on App</h3>
          <p className="text-3xl font-bold text-purple-400">1 hr 35 min</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
