import React from 'react';
// import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Spline from '@splinetool/react-spline';
// import LogoWall from '../assets/LogoWall'; // Assuming LogoWall is correctly imported

const Home = () => {
  // const logoImgs = [
  //   { imgUrl: '/ai-logo.png', altText: "Logo 1" },
  //   { imgUrl: '/ai-logo.png', altText: "Logo 2" },
  //   { imgUrl: '/ai-logo.png', altText: "Logo 3" },
  //   { imgUrl: '/ai-logo.png', altText: "Logo 4" },
  //   { imgUrl: '/ai-logo.png', altText: "Logo 5" },
  //   { imgUrl: '/ai-logo.png', altText: "Logo 6" },
  // ];

  return (
    <div className="bg-black/85 h-screen w-screen overflow-x-hidden">
      <div className="flex pt-12 justify-center items-center h-full">
        <div className="w-11/12 h-5/6 bg-gradient-to-tl overflow-hidden from-blue-500 via-fuchsia-500/90 to-yellow-400/90 rounded-lg shadow-lg relative">
          <div className="absolute top-4 left-4">
            <h1 className="text-5xl p-10 font-bold text-black">Social Pilot</h1>
            <img src="/arrow-image.png" className="w-36 relative left-16 rotate-75" />
          </div>

          {/* Spline Model Rendering */}
          <div className="z-10 absolute top-1/2 left-1/2 transform bg-transparent -translate-x-[250px] -translate-y-1/2 w-full h-full">
            <Spline scene="https://prod.spline.design/396DbM2dzf3WXQBn/scene.splinecode" />
          </div>

          <div className="absolute bottom-10 w-full left-10 flex items-center space-x-4">
            <button className="cursor-pointer group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-black text-white px-8 py-3 text-xs font-normal transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-black/30">
              <span className="text-lg">Get Ready</span>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
            </button>
            <p className="absolute right-28 text-lg text-black font-semibold italic"><div>Streamline your social media management with our all-in-one platform.</div> <div>Connect with top-rated managers, schedule content effortlessly, and track past projects seamlessly!</div></p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;
