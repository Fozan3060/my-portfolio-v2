import {defineType, defineField} from 'sanity'

export const portfolio = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Full Stack Development', value: 'Full Stack Development' },
          { title: 'AI/LLM Full Stack Development', value: 'AI/LLM Full Stack Development' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'skills',
      title: 'Skills Used',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https'],
      }),
    }),
  ],
})
