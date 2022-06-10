const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {},
})
module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})