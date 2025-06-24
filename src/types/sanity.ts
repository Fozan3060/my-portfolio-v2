export type SanityProject = {
  _id: string
  projectName: string
  description: string
  category: string
  image: string
  skills: string[]
  link: string
}

export type SanityHero = {
  _id: string
  description: string
  cv: {
    asset: {
      url: string
    }
  }
}

export type SanityAboutMe = {
  _id: string
  description: string
  personalInfo: string
}
