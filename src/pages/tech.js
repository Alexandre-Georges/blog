import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ShortenPost from '../components/shorten-post';

const IndexPage = ({ location, data }) => {
  const { allMarkdownRemark } = data;
  const { edges } = allMarkdownRemark;

  return (
    <Layout location={location}>
      <SEO title="Technical Posts" />
      <ul className="simple-list articles">
        {edges.map(edge => (
          <li key={edge.node.frontmatter.slug} className="article-item">
            <ShortenPost edge={edge} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/content/tech-posts/" } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 500)
          frontmatter {
            slug
            title
            date(formatString: "YYYY MMMM DD")
            tags
          }
        }
      }
    }
  }
`;
