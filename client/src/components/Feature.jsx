import React from 'react';
import LogoWall from '../assets/LogoWall';
import SpotlightCard from '../assets/SpotlightCard'; // Ensure you have the SpotlightCard component correctly imported

const Feature = () => {
  const logoImgs = [
    { imgUrl: '/ufo.png', altText: "Logo 1" },
    { imgUrl: '/ufo.png', altText: "Logo 2" },
    { imgUrl: '/ufo.png', altText: "Logo 3" },
    { imgUrl: '/ufo.png', altText: "Logo 4" },
    { imgUrl: '/ufo.png', altText: "Logo 5" },
    { imgUrl: '/ufo.png', altText: "Logo 6" },
    { imgUrl: '/ufo.png', altText: "Logo 7" },
    { imgUrl: '/ufo.png', altText: "Logo 8" },
    { imgUrl: '/ufo.png', altText: "Logo 9" },
    { imgUrl: '/ufo.png', altText: "Logo 10" },
    { imgUrl: '/ufo.png', altText: "Logo 11" },
    { imgUrl: '/ufo.png', altText: "Logo 12" },
    { imgUrl: '/ufo.png', altText: "Logo 13" },
    { imgUrl: '/ufo.png', altText: "Logo 14" },
    { imgUrl: '/ufo.png', altText: "Logo 15" },
    { imgUrl: '/ufo.png', altText: "Logo 16" },
  ];
  return (
    <div className="h-full pt-56 pb-36 w-screen flex justify-center items-center bg-black/85">


      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 -translate-y-[-250px] w-full">
                  <LogoWall
                    items={logoImgs}
                    direction="horizontal" // You can change this to "vertical" if needed
                    pauseOnHover={true}
                    size="clamp(8rem, 1rem + 20vmin, 25rem)"
                    duration="50s"
                    bgColor="transparent"
                    bgAccentColor="transparent"
                  />
                </div>


      <div className="text-center text-white">

        <h1 className="text-2xl text-fuchsia-400/90 font-semibold">Why Us</h1>
        <h2 className="pt-2 text-6xl font-bold">This is how we</h2>
        <h2 className="text-6xl font-extrabold bg-gradient-to-b from-yellow-400 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent leading-20">
          get things done
        </h2>

        <p className="text-md text-gray-300 max-w-xl mx-auto pt-6">
          We work with the most innovative companies, adding a fresh approach to the hiring strategy. Building and scaling teams? That's what we do best!
        </p>

        <div className="flex justify-between mt-20 gap-x-6 cursor-default"> 
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
            <div className="border  border-gray-500 rounded-lg p-8 max-w-sm w-screen h-80 text-center">
              <h3 className="text-2xl relative top-1/2 font-semibold">Dual Expertise</h3>
              <p className="text-sm pt-5 relative text-gray-300 top-1/2">Agency & In-house - We've been on both sides of the hiring table, so we know how to find the perfect fit for your company.</p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
            <div className="border border-gray-500 rounded-lg p-8 max-w-sm w-screen h-80 text-center">
              <h3 className="text-2xl relative top-1/2 font-semibold">Fully Transparent</h3>
              <p className="text-sm pt-5 relative text-gray-300 top-1/2">Clean and clear. This is what you can expect from us and how it should always be.</p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
            <div className="border border-gray-500 rounded-lg p-8 max-w-sm w-screen h-80 text-center">
              <h3 className="text-2xl relative top-1/2 font-semibold">Lightning Speed</h3>
              <p className="text-sm pt-5 relative text-gray-300 top-1/2">Speed wins in the talent market. Don't worry; we get things done fast.</p>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}

export default Feature;
