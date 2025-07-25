import React from "react";
import AboutShowCaseImage from '/src/assets/041f2571-8a12-46e4-8f03-6917f47369c0.png';
import AboutShowCaseImage2 from '/src/assets/Image.png';

const About = () => {
  return (
    <section className="py-24 relative bg-white">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-12 items-center justify-start">
          <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-6 lg:order-first order-last items-start justify-center">
            <div className="flex pt-24 items-start justify-start sm:justify-end gap-2.5">
              <img
                className="rounded-xl object-cover"
                src={AboutShowCaseImage}
                alt="Foodor deliveries"
              />
            </div>
            <img
              className="rounded-xl object-cover sm:ml-0 ml-auto w-100 h-50"
              src={AboutShowCaseImage2}
              alt="Foodor order pickup"
            />
          </div>
          <div className="w-full flex flex-col gap-10 items-center lg:items-start justify-center">
            <div className="w-full flex flex-col gap-8 items-center lg:items-start justify-center">
              <div className="w-full flex flex-col gap-3 items-center lg:items-start justify-start">
                <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-left text-center">
                  Empowering Foodies and Partners to Succeed
                </h2>
                <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-left text-center max-w-xl">
                  Every delivery, every meal, and every partnership is a shared journey. At Foodor,
                  we build meaningful connections that empower communities, restaurants, and delivery agents alike.
                </p>
              </div>
              <div className="w-full flex flex-row gap-10 items-center justify-center sm:justify-start">
                <div className="flex flex-col items-start justify-start text-center sm:text-left">
                  <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">1000+</h3>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Partner Restaurants
                  </h6>
                </div>
                <div className="flex flex-col items-start justify-start text-center sm:text-left">
                  <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">500k+</h3>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Happy Customers
                  </h6>
                </div>
                <div className="flex flex-col items-start justify-start text-center sm:text-left">
                  <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">10k+</h3>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Delivery Partners
                  </h6>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="sm:w-auto w-full px-6 py-3 bg-indigo-600 rounded-lg shadow-md text-white text-sm font-medium leading-6 
                         hover:bg-indigo-800 transition-all duration-700 ease-in-out flex justify-center items-center"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
