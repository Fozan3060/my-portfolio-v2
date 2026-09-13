import React from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/contact'

const sociallinks = [
  { icon: FaLinkedinIn, url: LINKEDIN_URL },
  { icon: FaGithub, url: GITHUB_URL }
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
