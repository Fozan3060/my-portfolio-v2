import {defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'cv',
      title: 'CV File',
      type: 'file',
    },
  ],
})
