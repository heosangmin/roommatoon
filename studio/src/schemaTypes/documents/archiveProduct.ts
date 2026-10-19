import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'archiveProduct',
  title: '굿즈',
  type: 'document',
  fields: [
    defineField({name: 'title', title: '상품 이름', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'category', title: '종류', type: 'string', options: {list: ['스티커', '엽서', '마스킹테이프']} , validation: (rule) => rule.required()}),
    defineField({name: 'trip', title: '관련 여행', type: 'reference', to: [{type: 'trip'}]}),
    defineField({name: 'image', title: '상품 이미지', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: '이미지 설명', type: 'string'})]}),
    defineField({name: 'shopUrl', title: '구매 주소', type: 'url'}),
    defineField({name: 'order', title: '정렬 순서', type: 'number'}),
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
})
