import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'archiveSettings',
  title: '여행 아카이브 설정',
  type: 'document',
  fields: [
    defineField({name: 'title', title: '사이트 이름', type: 'string', initialValue: 'ohayo jay', validation: (rule) => rule.required()}),
    defineField({name: 'intro', title: '여행 목록 소개', type: 'text', rows: 2, initialValue: '여행마다 웹툰, 영상, 사진 포스팅을 함께 모아 봐요.'}),
    defineField({name: 'profileImage', title: '프로필 사진', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: '이미지 설명', type: 'string'})]}),
    defineField({name: 'role', title: '작가 소개 한 줄', type: 'string'}),
    defineField({name: 'bio', title: '작가 소개 글', type: 'text', rows: 5}),
    defineField({name: 'history', title: '이력', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'website', title: '웹사이트', type: 'url'}),
    defineField({name: 'email', title: '이메일', type: 'string'}),
    defineField({name: 'instagram', title: '인스타그램 주소', type: 'url'}),
    defineField({name: 'youtube', title: '유튜브 주소', type: 'url'}),
    defineField({name: 'shopUrl', title: '마플 샵 전체 보기 주소', type: 'url'}),
  ],
  preview: {select: {title: 'title', media: 'profileImage'}},
})
