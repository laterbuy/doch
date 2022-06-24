import { useRouter } from 'next/router'
import { getAllFiles } from '../lib/mdx';
import { MDXLayoutRenderer } from '../components/MDXComponents'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import("../components/Layout"), {
  ssr: false,
});



export async function getStaticPaths() {
  const datas = await getAllFiles();
  const paths = datas.map(v => ({ params: { com: v.frontmatter.name } }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const {
    params: { com },
  } = context
  const datas = await getAllFiles();
  const item = datas.find(v => (v.frontmatter.name === com))
  return { props: { com, item, datas } }
}

export default function Com({ com, item, datas }) {
  const items = datas.map(v => v.frontmatter.name)
  const router = useRouter();
  const onClick = (key) => {
    router.push(key)
  }
  return <Layout items={items} curItem={com} onClick={onClick} content={<MDXLayoutRenderer mdxSource={item.mdxSource} />} />
}
