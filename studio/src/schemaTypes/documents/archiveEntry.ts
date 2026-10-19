import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'archiveEntry',
  title: '여행 콘텐츠',
  type: 'document',
  fields: [
    defineField({name: 'title', title: '제목', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: '주소', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'trip', title: '여행', type: 'reference', to: [{type: 'trip'}], validation: (rule) => rule.required()}),
    defineField({name: 'kind', title: '콘텐츠 종류', type: 'string', options: {list: [
      {title: '웹툰', value: 'webtoon'}, {title: '영상', value: 'video'}, {title: '사진 포스팅', value: 'photo'},
    ], layout: 'radio'}, validation: (rule) => rule.required()}),
    defineField({name: 'episode', title: '화 번호', type: 'number', hidden: ({parent}) => parent?.kind !== 'webtoon'}),
    defineField({name: 'date', title: '날짜 표시', type: 'string'}),
    defineField({name: 'location', title: '장소', type: 'string'}),
    defineField({name: 'thumbnail', title: '목록 썸네일', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: '이미지 설명', type: 'string'})]}),
    defineField({name: 'images', title: '웹툰 컷·사진', type: 'array', hidden: ({parent}) => parent?.kind === 'video', of: [defineArrayMember({type: 'image', options: {hotspot: true}, fields: [
      defineField({name: 'alt', title: '이미지 설명', type: 'string'}),
      defineField({name: 'caption', title: '사진 아래 이야기', type: 'text', rows: 2}),
    ]})]}),
    defineField({name: 'videoUrl', title: '유튜브 영상 주소', type: 'url', hidden: ({parent}) => parent?.kind !== 'video', validation: (rule) => rule.custom((value, context) => {
      if (context.parent && (context.parent as {kind?: string}).kind === 'video' && !value) return '영상에는 유튜브 주소가 필요합니다.'
      if (value && !/^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)/.test(value)) return '유튜브 영상 주소를 입력해 주세요.'
      return true
    })}),
    defineField({name: 'body', title: '본문·작가의 말', type: 'blockContent'}),
    defineField({name: 'order', title: '정렬 순서', type: 'number', description: '작은 숫자가 먼저 표시됩니다.'}),
  ],
  preview: {select: {title: 'title', subtitle: 'kind', media: 'thumbnail'}},
})
