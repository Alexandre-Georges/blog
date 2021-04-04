exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const categories = {};
  const tags = {};
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        nodes {
          frontmatter {
            category
            tags
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.nodes.forEach((node) => {
    categories[node.frontmatter.category] = true;
    node.frontmatter.tags.forEach(tag => (tags[tag] = true));

    createPage({
      path: node.frontmatter.slug,
      component: require.resolve(`./src/templates/post.js`),
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });

  Object.keys(categories).forEach(category => {
    createPage({
      path: `/categories/${category}`,
      component: require.resolve(`./src/templates/post-list-by-category.js`),
      context: {
        category,
      },
    });
  });

  Object.keys(tags).forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: require.resolve(`./src/templates/post-list-by-tag.js`),
      context: {
        tag,
      },
    });
  });
};
