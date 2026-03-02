import {defineField, defineType, defineArrayMember} from 'sanity'

export const pourquoiPage = defineType({
  name: 'pourquoiPage',
  title: 'Page « Pourquoi un podcast ? »',
  type: 'document',
  // Singleton — only one document of this type should exist
  __experimental_actions: ['create', 'update', 'publish'],
  fields: [
    defineField({
      name: 'featuredProjects',
      title: 'Études de cas (max 3)',
      description: 'Sélectionnez jusqu\'à 3 réalisations avec une page projet dédiée. Elles apparaissent comme études de cas sur la page Pourquoi un podcast.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'realisation' }],
          options: {
            filter: 'hasProjectPage == true',
          },
        }),
      ],
      validation: Rule => Rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Page Pourquoi un podcast ?' }
    },
  },
})
