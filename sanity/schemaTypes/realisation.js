import {defineField, defineType} from 'sanity'

export const realisation = defineType({
  name: 'realisation',
  title: 'Réalisation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'sector',
      title: 'Secteur',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cardImage',
      title: 'Image de carte',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'cardVideo',
      title: 'Vidéo de carte (URL)',
      type: 'url',
    }),
    defineField({
      name: 'cardDescription',
      title: 'Description carte',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'modalDescription',
      title: 'Description modale',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'audioEmbed',
      title: 'Embed audio (URL)',
      type: 'url',
    }),
    defineField({
      name: 'videoEmbed',
      title: 'Embed vidéo (URL)',
      type: 'url',
    }),
    defineField({
      name: 'stat1Value',
      title: 'Stat 1 — Valeur',
      type: 'string',
    }),
    defineField({
      name: 'stat1Label',
      title: 'Stat 1 — Label',
      type: 'string',
    }),
    defineField({
      name: 'stat2Value',
      title: 'Stat 2 — Valeur',
      type: 'string',
    }),
    defineField({
      name: 'stat2Label',
      title: 'Stat 2 — Label',
      type: 'string',
    }),
    defineField({
      name: 'hasProjectPage',
      title: 'Page projet dédiée ?',
      type: 'boolean',
      initialValue: false,
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'cardImage',
    },
  },
})
