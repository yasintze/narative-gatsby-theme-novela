/**
 * add frontend routes for secret page
 * @2019/11/12
 */
module.exports = async ({ page, actions }) => {
  const { createPage } = actions;
  const pagex = page;
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/secret/)) {
    pagex.matchPath = '/secret/*';

    // Update the page.
    createPage(pagex);
  }
};
