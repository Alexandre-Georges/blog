exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // filter: { fileAbsolutePath: { regex: "/content\/posts/" } }
  const tags = {};
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              tags
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    node.frontmatter.tags.forEach(tag => (tags[tag] = true));

    createPage({
      path: node.frontmatter.slug,
      component: require.resolve(`./src/templates/post.js`),
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });

  Object.keys(tags).forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: require.resolve(`./src/templates/tag-posts.js`),
      context: {
        tag,
      },
    });
  });
};
