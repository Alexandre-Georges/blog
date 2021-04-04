import React from 'react';
import { Link } from 'gatsby';
import Tag from '../components/tag';

export default function ShortenPost({ edge }) {
  return (
    <div className="article-container">
      <div className="date-tags-container">
        <span className="date">{edge.node.frontmatter.date}</span>
        <ul className="simple-list tags">
          {edge.node.frontmatter.tags.map(tag => (
            <li key={tag} className="tag-container">
              <Tag name={tag} />
            </li>
          ))}
        </ul>
      </div>
      <h2 className="title">
        <Link to={`/${edge.node.frontmatter.slug}`}>
          {edge.node.frontmatter.title}
        </Link>
      </h2>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: edge.node.excerpt }}
      />
      <Link to={`/${edge.node.frontmatter.slug}`} className="read-more-link">
        Read More
      </Link>
    </div>
  );
}
