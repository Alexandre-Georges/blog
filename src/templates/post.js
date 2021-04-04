import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Tag from '../components/tag';

export default function Post({ data, location }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout location={location}>
      <SEO title={frontmatter.title} />
      <div className="article-container">
        <div className="top-container">
          <div>
            <span className="date">{frontmatter.date}</span>
            &nbsp;-&nbsp;
            <a href={`/categories/${frontmatter.category}`}>{frontmatter.category.toUpperCase()}</a>
          </div>
          <ul className="simple-list tags">
            {frontmatter.tags.map(tag => (
              <li key={tag} className="tag-container">
                <Tag name={tag} />
              </li>
            ))}
          </ul>
        </div>
        <h2 className="title">{frontmatter.title}</h2>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  );
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        category
        title
        tags
        date(formatString: "YYYY MMMM DD")
      }
    }
  }
`;
