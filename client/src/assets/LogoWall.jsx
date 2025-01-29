import React, { useState } from "react";
import reactbits from "/ai-logo.png"; // Example logo import

const LogoWall = ({
  items = [],
  direction = "horizontal",
  pauseOnHover = false,
  size = "clamp(8rem, 1rem + 30vmin, 25rem)",
  duration = "60s",
  textColor = "#ffffff",
  bgColor = "#060606",
  bgAccentColor = "#111111",
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const wrapperClass = [
    "flex",
    "flex-col",
    "gap-[calc(var(--size)/14)]",
    "mx-auto",
    "max-w-full",
    "p-[20px_10px]",
    direction === "vertical" && "flex-row justify-center h-full",
  ]
    .filter(Boolean)
    .join(" ");

  const marqueeClass = [
    "relative",
    "flex",
    "overflow-hidden",
    "select-none",
    "gap-[calc(var(--size)/14)]",
    "justify-start",
    "w-full",
    "mask-horizontal",
    direction === "vertical" && "flex-col h-full mask-vertical",
    isPaused && "paused",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <style>
        {`
          @keyframes scrollX {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }

          @keyframes scrollY {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100%); }
          }

          .animate-scrollX {
            animation: scrollX var(--duration) linear infinite;
          }

          .animate-scrollY {
            animation: scrollY var(--duration) linear infinite;
          }

          .mask-horizontal {
            mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%);
            mask-size: cover;
            mask-repeat: no-repeat;
          }

          .mask-vertical {
            mask-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%);
            mask-size: cover;
            mask-repeat: no-repeat;
          }

          .paused .animate-scrollX,
          .paused .animate-scrollY {
            animation-play-state: paused !important;
          }
        `}
      </style>

      <article
        className={wrapperClass}
        style={{
          ["--size"]: size,
          ["--duration"]: duration,
          ["--color-text"]: textColor,
          ["--color-bg"]: bgColor,
          ["--color-bg-accent"]: bgAccentColor,
          color: "var(--color-text)",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <div
          className={marqueeClass}
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
          <div
            className={[
              "flex-shrink-0",
              "flex",
              "items-center",
              "justify-around",
              "gap-[calc(var(--size)/14)]",
              "min-w-full",
              "animate-scrollX",
              direction === "vertical" && "flex-col min-h-full animate-scrollY",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {items.map((item, idx) => (
              <img
                key={idx}
                src={item.imgUrl}
                alt={item.altText}
                className={[
                  "bg-[var(--color-bg-accent)]",
                  "rounded-md",
                  "object-contain",
                  "aspect-video",
                  `w-[var(--size)] p-[calc(var(--size)/10)]`,
                  direction === "vertical" &&
                    "aspect-square w-[calc(var(--size)/1.5)] p-[calc(var(--size)/6)]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            ))}
          </div>
        </div>
      </article>
    </>
  );
};

export default LogoWall;
