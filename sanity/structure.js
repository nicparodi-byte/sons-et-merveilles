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
    ])
