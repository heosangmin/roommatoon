import blockContent from './objects/blockContent'
import seo from './objects/seo'
import post from './documents/post'
import archiveSettings from './documents/archiveSettings'
import trip from './documents/trip'
import archiveEntry from './documents/archiveEntry'
import archiveProduct from './documents/archiveProduct'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [archiveSettings, trip, archiveEntry, archiveProduct, post, blockContent, seo]
