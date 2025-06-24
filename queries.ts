import { client } from './client'

export const getPortfolioProjects = async () => {
  return await client.fetch(`*[_type == "portfolio"]{
    _id,
    projectName,
    category,
    image,
    skills,
    description,
    link
  }`)
}

export const getHeroData = async () => {
  return await client.fetch(`*[_type == "hero"][0]{
  description,
  cv {
    asset->{
      url
    }
  }
}`)
}
export const getAboutMeData = async () => {
  return await client.fetch(`*[_type == "aboutMe"][0]{
    _id,
    description,
    personalInfo
  }`)
}
