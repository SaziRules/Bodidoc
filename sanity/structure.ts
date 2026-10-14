import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'competition'
      ),
      S.divider(),
      S.listItem()
        .title('Competitions')
        .schemaType('competition')
        .child(S.documentTypeList('competition').title('Competitions')),
    ])
