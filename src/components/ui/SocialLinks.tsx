import React from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

const sociallinks = [
  { icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/fozan-javaid/' },
  { icon: FaGithub, url: 'https://github.com/Fozan3060' }
]

const SocialLinks = () => {
  return (
    <>
      {sociallinks.map(({ icon: Icon, url }, index) => (
        <a
          key={index}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='rounded-full text-white bg-black hover:bg-custom-orange p-3 transition-colors duration-300 cursor-pointer'
        >
          <Icon size={20} />
        </a>
      ))}
    </>
  )
}

export default SocialLinks
