'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { FaQuoteLeft } from 'react-icons/fa'
import { BiUser } from 'react-icons/bi'
import { IoStar } from 'react-icons/io5'

const reviews = [
  {
    name: 'John Doe',
    text: 'Working with this developer was a game changer. The React and Next.js architecture he built for our dashboard is lightning fast and scalable.'
  },
  {
    name: 'Jane Smith',
    text: 'Incredible attention to detail! The UI built with Tailwind CSS was both responsive and beautifully designed. Our users love the new experience.'
  },
  {
    name: 'Mike Brown',
    text: 'Delivered a robust fullstack solution using MongoDB and Next.js APIs. We’re now able to handle data-heavy operations with ease.'
  },
  {
    name: 'Emily Davis',
    text: 'Highly professional and efficient. From frontend animations to backend integrations with MongoDB, everything was seamless and well-documented.'
  }
]

const ReviewSlider = () => {
  return (
    <div className='w-full px-4 py-8'>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={2}
        spaceBetween={24}
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          992: { slidesPerView: 2 }
        }}
        className='2xl:w-7xl'
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className='bg-background m-auto   max-w-[39rem] p-8 rounded-xl text-white shadow-md'>
              <FaQuoteLeft className='text-5xl text-custom-orange mb-10' />
              <p className='sm:text-xl semi_md:text-lg mb-4 '>{review.text}</p>
              <div className='flex justify-between '>
                <div className='flex items-center gap-8'>
                  <BiUser className='rounded-full bg-background2 p-4 text-7xl' />
                  <div className='flex-col justify-between'>
                    <h4 className='font-semibold text-2xl text-custom-orange'>
                      {review.name}
                    </h4>
                    <h4 className='text-text1'>Health Care</h4>
                  </div>
                </div>
                <div className='hidden sm:flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <IoStar key={i} size={24} className='text-amber-500' />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReviewSlider
