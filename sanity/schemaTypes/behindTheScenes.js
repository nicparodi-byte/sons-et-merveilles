import {defineField, defineType} from 'sanity'

export const behindTheScenes = defineType({
  name: 'behindTheScenes',
  title: 'Coulisses',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de section',
      type: 'string',
      initialValue: 'Le son et la vidéo, ça se vit',
    }),
    defineField({
      name: 'items',
      title: 'Médias',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Vidéo', value: 'video'},
                ],
                layout: 'radio',
              },
              initialValue: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              hidden: ({parent}) => parent?.type !== 'image',
            }),
            defineField({
              name: 'videoFile',
              title: 'Fichier vidéo',
              type: 'file',
              options: {accept: 'video/*'},
              hidden: ({parent}) => parent?.type !== 'video',
            }),
            defineField({
              name: 'caption',
              title: 'Légende',
              type: 'string',
            }),
            defineField({
              name: 'aspectRatio',
              title: 'Format (optionnel)',
              description: 'Laisser vide pour conserver le format masonry automatique',
              type: 'string',
              options: {
                list: [
                  {title: 'Paysage 4/3', value: '4/3'},
                  {title: 'Paysage 16/9', value: '16/9'},
                  {title: 'Carré', value: '1/1'},
                  {title: 'Portrait 3/4', value: '3/4'},
                  {title: 'Portrait 9/16 (vertical)', value: '9/16'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'order',
              title: 'Ordre',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              type: 'type',
              caption: 'caption',
              order: 'order',
              media: 'image',
            },
            prepare({type, caption, order, media}) {
              return {
                title: caption || `Média ${order ?? '?'}`,
                subtitle: type === 'video' ? '▶ Vidéo' : '🖼 Image',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Coulisses'}
    },
  },
})
