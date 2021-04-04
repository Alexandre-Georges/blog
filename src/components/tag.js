import * as React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ name }) => {
  return (
    <a className="tag" href={`/tags/${name}`}>
      {name}
    </a>
  );
};

Tag.propTypes = {
  name: PropTypes.node.isRequired,
};

export default Tag;
