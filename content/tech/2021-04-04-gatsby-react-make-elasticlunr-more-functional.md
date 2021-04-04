---
category: 'tech'
slug: '2021-04-04-gatsby-react-make-elasticlunr-more-functional'
title: 'Gatsby / React: Make Elasticlunr more functional!'
date: '2021-04-04T18:26:19.055Z'
tags:
  - 'gatbsy'
  - 'react'
  - 'functional'
  - 'JS'
metaDescription: 'Conversion from a React class to a functional component of the Elasticlunr search field for Gatsby.'
---

I wanted to add a simple searching tool to this blog and I found a really good fit: [Elastic Lunr](https://github.com/gatsby-contrib/gatsby-plugin-elasticlunr-search).

I was disappointed when I saw that the example provided uses a class. I prefer functional components (sue me).

Here is the example provided:

```javascript
import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.query} onChange={this.search} />
        <ul>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={"/" + page.path}>{page.title}</Link>
              {": " + page.tags.join(`,`)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, {})
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}
```

And here is the functional component:

```javascript
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
      <input type="text" value={query} onChange={search} />
      <ul className="simple-list results">
        {results.map(page => (
          <li key={page.id}>
            <Link to={`/${page.slug}`}>{page.title}&nbsp;-&nbsp;{page.category}&nbsp;-&nbsp;{': ' + page.tags.join(`,`)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
```

Hopefully that might help somebody!
