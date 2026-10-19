import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'trip',
  title: '여행',
  type: 'document',
  fields: [
    defineField({name: 'title', title: '여행 제목', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: '주소', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'country', title: '나라', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'city', title: '도시', type: 'string'}),
    defineField({name: 'period', title: '여행 기간 표시', type: 'string', description: '예: 2025년 9월'}),
    defineField({name: 'cover', title: '대표 이미지', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: '이미지 설명', type: 'string'})]}),
    defineField({name: 'featured', title: '첫 화면 대표 여행', type: 'boolean', initialValue: false}),
    defineField({name: 'order', title: '정렬 순서', type: 'number', description: '작은 숫자가 먼저 표시됩니다.'}),
    defineField({name: 'news', title: '선정·연재 소식', type: 'array', of: [defineArrayMember({type: 'object', fields: [
      defineField({name: 'label', title: '표시 문구', type: 'string', validation: (rule) => rule.required()}),
      defineField({name: 'url', title: '관련 링크', type: 'url'}),
    ], preview: {select: {title: 'label'}}})]}),
  ],
  preview: {select: {title: 'title', subtitle: 'country', media: 'cover'}},
})
