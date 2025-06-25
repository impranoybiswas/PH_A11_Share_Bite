import React from 'react'
import CountUp from 'react-countup';

export default function Services() {

    const services = [
        {
            name: "Foods Items",
            image : "https://i.ibb.co.com/LzSDVmvd/pizza.gif",
            count : 200
        },
        {
            name: "Great Oders",
            image : "https://i.ibb.co.com/5xk3gbyD/bag.gif",
            count : 300
        },
        {
            name: "Fast Delivery",
            image : "https://i.ibb.co.com/tPqvqz2y/delivery-truck.gif",
            count : 350
        },
        {
            name: "Comunity",
            image : "https://i.ibb.co.com/dw38f4xx/teamwork.gif",
            count : 180
        }

    ];
  return (
    <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5'>
        {
            services.map((item, index) => (
                <div data-aos="fade-up" className="shadow-md rounded-lg border-[1px] border-secondary w-full overflow-hidden relative flex flex-col gap-2 justify-center items-center p-2 lg:p-5 bg-secondary/10" key={index}>

                    <img className='rounded-full' src={item.image} alt={item.name} />
                    <span className='font-semibold text-xl lg:text-2xl mt-4'>{item.name}</span>
                    <span>
                    <CountUp className='text-2xl lg:text-3xl' start={0} end={item.count} duration={6} />+
                    </span>
        
                      
                </div>
            ))
        }
      
    </div>
  )
}
