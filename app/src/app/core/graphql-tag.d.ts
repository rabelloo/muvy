declare module 'graphql-tag' {
  export default function gql(literals: TemplateStringsArray): GraphQLQuery;
  // tslint:disable-next-line: no-empty-interface
  export interface GraphQLQuery {}
}
