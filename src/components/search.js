import React, { useState } from 'react';
import { Index } from 'elasticlunr';
import { Link } from 'gatsby';

const Search = ({ searchIndex }) => {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(null);
  const [results, setResults] = useState([]);

  const search = event => {
    const query = event.target.value;
    const newIndex = index ? index : Index.load(searchIndex);
    setIndex(newIndex);
    setQuery(query);
    setResults(
      newIndex
        .search(query, { expand: true })
        .map(({ ref }) => newIndex.documentStore.getDoc(ref))
    );
  };

  return (
    <div className="search-container">
      <label htmlFor="search-field">Search</label>
      <input
        type="text"
        id="search-field"
        className="search-field"
        value={query}
        onChange={search}
      />
      <ul className="simple-list results">
        {results.map(page => (
          <li key={page.id}>
            <Link to={`/${page.slug}`}>
              {page.title}&nbsp;-&nbsp;{page.category}&nbsp;-&nbsp;
              {': ' + page.tags.join(`,`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
