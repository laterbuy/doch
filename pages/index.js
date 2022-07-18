import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllFiles } from '../lib/mdx';
import { MDXLayoutRenderer } from '../components/MDXComponents';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import("../components/Layout"), {
  ssr: false,
});


export async function getStaticProps() {
  const datas = await getAllFiles();
  return { props: { datas } }
}

export default function Home({ datas }) {
  const [source, setSource] = useState();
  const items = datas.map(v => ({ label: v.frontmatter.name, key: v.frontmatter.name }))
  const router = useRouter();

  useEffect(() => {
    if (datas.length === 0) {
      return
    }
    setSource(datas[0].mdxSource)
    const defaultSelectedKey = datas[0].frontmatter.name;
    router.push(defaultSelectedKey)
  }, [])

  const onClick = ({ key }) => {
    const source = datas.find(v => v.frontmatter.name === key)
    setSource(source.mdxSource);
    router.push(key)
  }
  return (
    <>
      {datas.length === 0 && '没有找到mdx文件'}
      {datas.length > 0 && <Layout items={items} curItem={datas[0].frontmatter.name} onClick={onClick} content={<MDXLayoutRenderer mdxSource={source} />} />}
    </>

  )
}
