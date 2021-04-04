import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import ShortenPost from '../components/shorten-post';

export default function TagPosts({ data, location, pageContext }) {
  const { allMarkdownRemark } = data;
  const { edges } = allMarkdownRemark;
  return (
    <Layout location={location}>
      <SEO title={pageContext.tag} />
      <h1 className="page-title">
        {pageContext.tag} -{' '}
        {edges.length === 1 ? '1 article' : `${edges.length} articles`}
      </h1>
      <ul className="simple-list articles">
        {edges.map(edge => (
          <li key={edge.node.frontmatter.slug} className="article-item">
            <ShortenPost edge={edge} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}

// query($tag: String!) {
//   markdownRemark(frontmatter: { tags: { elemMatch: $tag } }) {
export const pageQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { eq: $tag } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 500)
          frontmatter {
            slug
            title
            tags
            date(formatString: "YYYY MMMM DD")
          }
        }
      }
    }
  }
`;

// query {
//   markdownRemark {
//     html
//     frontmatter {
//       date(formatString: "YYYY MMMM DD")
//       title
//     }
//   }
// }

// {
//   allMarkdownRemark(
//     sort: { order: DESC, fields: [frontmatter___date] }
//     filter: { frontmatter: { tags: { eq: "blog" } } }
//   ) {
//     edges {
//       node {
//         excerpt(pruneLength: 500)
//         frontmatter {
//           slug
//           title
//           date(formatString: "YYYY MMMM DD")
//           tags
//         }
//       }
//     }
//   }
// }
