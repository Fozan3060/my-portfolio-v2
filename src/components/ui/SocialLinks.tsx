import React from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

const sociallinks = [FaLinkedinIn, FaGithub]

const SocialLinks = () => {
  return (
    <>
      {sociallinks.map((Icon, index) => (
        <div
          key={index}
          className='rounded-full text-white bg-black hover:bg-custom-orange p-3 transition-colors duration-300 cursor-pointer'
        >
          <Icon size={20} />
        </div>
      ))}
    </>
  )
}

export default SocialLinks
