const gql = (query: TemplateStringsArray, ...substitutions: unknown[]): string => String.raw(query, ...substitutions);

export const queries = {
  titleQuery: gql`
    query titleQuery($anyBaseWiki: [String], $query: String) {
      articles(wiki: $anyBaseWiki, titleKeyword: $query, page: 1, pageSize: 20) {
        nodes {
          title
          url
          author
          rating
          upvotes
          downvotes
          comments
        }
        pageInfo {
          total
          page
          pageSize
          hasNextPage
        }
      }
    }
  `,
 userQuery: `
    query userQuery($query: String!, $baseWiki: String!) {
      authorWikiRank(wiki: $baseWiki, name: $query, by: RATING) {
        rank
        name
        value
      }
      articles(author: $query, wiki: [$baseWiki]) {
        pageInfo {
          total
        }
      }
      recent: articles(wiki: [$baseWiki], author: $query, pageSize: 1) {
        nodes {
          title
          url
          created_at
        }
      }
    }
  `,
  userGlobalQuery: `
    query userGlobalQuery($query: String!) {
      authorGlobalRank(name: $query, by: RATING) {
        rank
        name
        value
      }
      articles(author: $query) {
        pageInfo {
          total
        }
      }
      recent: articles(author: $query, pageSize: 1) {
        nodes {
          title
          url
          created_at
        }
      }
    }
  `,
  userRankQuery: gql`
    query userRankQuery($baseWiki: String) {
      authorRanking(wiki: $baseWiki, by: RATING) {
        rank
        name
        value
      }
    }
  `,
};
