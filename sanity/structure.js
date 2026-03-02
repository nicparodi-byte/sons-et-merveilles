export const structure = (S) =>
  S.list()
    .title('Sons & Merveilles')
    .items([
      S.listItem()
        .title('Réalisations')
        .schemaType('realisation')
        .child(S.documentTypeList('realisation').title('Réalisations')),

      S.listItem()
        .title("Membres de l'équipe")
        .schemaType('teamMember')
        .child(S.documentTypeList('teamMember').title("Membres de l'équipe")),

      S.divider(),

      S.listItem()
        .title('Page « Pourquoi un podcast ? »')
        .id('pourquoiPage')
        .schemaType('pourquoiPage')
        .child(
          S.document()
            .schemaType('pourquoiPage')
            .documentId('pourquoiPage')
            .title('Page « Pourquoi un podcast ? »'),
        ),

      S.listItem()
        .title('Coulisses')
        .id('behindTheScenes')
        .schemaType('behindTheScenes')
        .child(
          S.document()
            .schemaType('behindTheScenes')
            .documentId('behindTheScenes')
            .title('Coulisses'),
        ),
    ])
