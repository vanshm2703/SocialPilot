import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Testimonials data
const testimonials = [
  {
    text: 'First testimonial goes here. Praising your product or service and expressing satisfaction.',
    author: 'Ansub',
    image:
      'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/t2awrrfzdvmg1chnzyfr.svg',
  },
  {
    text: 'Another testimonial goes here. Praising your product or service and expressing satisfaction.',
    author: 'Lex Collins',
    image:
      'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg',
  },
  {
    text: 'Third testimonial goes here. Praising your product or service and expressing satisfaction.',
    author: 'Alex Jones',
    image:
      'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg',
  },
  {
    text: 'Fourth testimonial goes here. Praising your product or service and expressing satisfaction.',
    author: 'John Doe',
    image:
      'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg',
  },
];

const Testimonial = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTestimonial(
        (prevTestimonial) => (prevTestimonial + 1) % testimonials.length
      );
    }, 5000); // Change Time here

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const { text, author, image } = testimonials[currentTestimonial];

  // Animation variants for the testimonial
  const variants = {
    initial: { opacity: 0, y: '100%', scale: 0.1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: '100%', scale: 0.1 },
  };

  const dotVariants = {
    active: { scale: 1.2, backgroundColor: '#3f3f46' },
    inactive: { scale: 1, backgroundColor: '#D1D5DB' },
  };

  return (
    <div className="h-full pb-36 w-screen flex justify-center items-center bg-black/85">
      <div className="text-center text-white">
        <h1 className="text-2xl text-blue-300/90 font-semibold">
          What our Clients say
        </h1>
        <h2 className="pt-2 text-6xl font-extrabold bg-gradient-to-l from-blue-600 via-white to-blue-600 bg-clip-text text-transparent leading-20">
          Hear It from Those
        </h2>
        <h2 className="text-6xl font-extrabold">Who Know Us Best</h2>

        <p className="text-md text-gray-300 max-w-xl mx-auto pt-6">
          Great people make great companies, and we specialize in building the
          best. Our success stories show why clients trust us with their
          recruitment needs.
        </p>

        <button
          className="border-gray-200/30 border px-10 py-4 rounded-full mt-10 hover:bg-blue-800 duration-500 bg-blue-900 cursor-pointer text-xl font-bold"
          style={{ boxShadow: "rgba(255, 255, 255, 0.1) 0px 5px 15px" }}
        >
          Contact Us
        </button>

        {/* Testimonial Carousel */}
        <section className="py-12 md:py-24 mt-20">
          <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-yellow-400 via-fuchsia-500 to-blue-500 p-10 border-none rounded-lg text-black">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentTestimonial}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                className="flex w-full flex-col items-center justify-center"
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  duration: 0.5,
                }}
              >
                <img
                  src={image}
                  alt={author}
                  className="m-0 h-16 w-36 bg-white/80 border-none rounded-full p-4"
                />
                <p className="m-0 text-center text-2xl font-medium tracking-tight mt-4">
                  &quot;{text}&quot;
                </p>
                <div className="mx-auto mt-5">
                  <div className="flex flex-col items-center justify-center space-x-3">
                    <div className="font-regular text-sm text-gray-900/80">
                      {author}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Dot Navigation */}
              <div className="mt-8 flex justify-center">
                {testimonials.map((_, index) => (
                  <motion.div
                    key={index}
                    className="mx-1 h-1 w-1 cursor-pointer rounded-full"
                    variants={dotVariants}
                    animate={index === currentTestimonial ? 'active' : 'inactive'}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </AnimatePresence>
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default Testimonial;
