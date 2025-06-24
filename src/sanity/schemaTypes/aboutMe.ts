import {defineType} from 'sanity'

export const aboutMe = defineType({
  name: 'aboutMe',
  title: 'About Me',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'About Me Description',
      type: 'text',
    },
    {
      name: 'personalInfo',
      title: 'Personal Info Description',
      type: 'text',
    },
  ],
})
