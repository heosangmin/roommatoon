import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {defineDocuments, defineLocations, presentationTool} from 'sanity/presentation'
import {schemaTypes} from './src/schemaTypes'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Presentation Preview URL
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321'

export default defineConfig({
  name: 'sanity-template-astro-clean',
  title: 'Sanity Astro Starter',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) => S.list().id('content').title('콘텐츠').items([
        S.listItem().id('archiveSettings').title('여행 아카이브 설정').child(
          S.document().schemaType('archiveSettings').documentId('archiveSettings'),
        ),
        S.documentTypeListItem('trip').title('여행'),
        S.documentTypeListItem('archiveEntry').title('여행 콘텐츠'),
        S.documentTypeListItem('archiveProduct').title('굿즈'),
        S.divider(),
        S.documentTypeListItem('post').title('기존 블로그 글'),
      ]),
    }),
    presentationTool({
      previewUrl,
      resolve: {
        // Maps a URL in the preview to the corresponding Sanity document,
        // so opening /post/my-slug in Presentation opens that post in the sidebar.
        mainDocuments: defineDocuments([
          {
            route: '/post/:slug',
            filter: ({params}) => `_type == "post" && slug.current == "${params.slug}"`,
          },
        ]),
        // Maps a post document to its preview URL,
        // so editors can jump straight to the preview from any post in the Studio.
        locations: {
          post: defineLocations({
            select: {title: 'title', slug: 'slug.current'},
            resolve: (doc) => ({
              locations: doc?.slug
                ? [{title: doc?.title || 'Untitled', href: `/post/${doc.slug}`}]
                : [],
            }),
          }),
        },
      },
    }),
    visionTool(),
    codeInput(),
  ],
  schema: {types: schemaTypes},
})
