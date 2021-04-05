import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ShortenPost from '../components/shorten-post';

const IndexPage = ({ location, data }) => {
  const { allMarkdownRemark } = data;
  const { nodes } = allMarkdownRemark;

  return (
    <Layout location={location}>
      <SEO title="Home" />
      <ul className="simple-list articles">
        {nodes.map(node => (
          <li key={node.frontmatter.slug} className="article-item">
            <ShortenPost node={node} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      nodes {
        excerpt(pruneLength: 500)
        frontmatter {
          category
          slug
          title
          date(formatString: "YYYY MMMM DD")
          tags
        }
      }
    }
  }
`;
