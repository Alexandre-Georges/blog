import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import ShortenPost from '../components/shorten-post';

import capitalize from '../utils/capitalize';

export default function PostListByTag({ data, location, pageContext }) {
  const { allMarkdownRemark } = data;
  const { nodes } = allMarkdownRemark;
  return (
    <Layout location={location}>
      <SEO title={capitalize(pageContext.tag)} />
      <h1 className="page-title">
        {capitalize(pageContext.tag)}
        &nbsp;-&nbsp;
        {nodes.length === 1 ? '1 article' : `${nodes.length} articles`}
      </h1>
      <ul className="simple-list articles">
        {nodes.map(node => (
          <li key={node.frontmatter.slug} className="article-item">
            <ShortenPost node={node} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { eq: $tag } } }
    ) {
      nodes {
        excerpt(pruneLength: 500)
        frontmatter {
          category
          slug
          title
          tags
          date(formatString: "YYYY MMMM DD")
        }
      }
    }
  }
`;
