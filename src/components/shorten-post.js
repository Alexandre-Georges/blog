import React from 'react';
import { Link } from 'gatsby';
import Tag from '../components/tag';

export default function ShortenPost({ node }) {
  return (
    <div className="article-container">
      <div className="top-container">
        <div>
          <span className="date">{node.frontmatter.date}</span>
          &nbsp;-&nbsp;
          <a href={`/categories/${node.frontmatter.category}`}>
            {node.frontmatter.category.toUpperCase()}
          </a>
        </div>
        <ul className="simple-list tags">
          {node.frontmatter.tags.map(tag => (
            <li key={tag} className="tag-container">
              <Tag name={tag} />
            </li>
          ))}
        </ul>
      </div>
      <h2 className="title">
        <Link to={`/${node.frontmatter.slug}`}>{node.frontmatter.title}</Link>
      </h2>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: node.excerpt }}
      />
      <Link to={`/${node.frontmatter.slug}`} className="read-more-link">
        Read More
      </Link>
    </div>
  );
}
