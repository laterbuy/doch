import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router'
import { getAllFiles } from '../lib/mdx';
import { MDXLayoutRenderer } from '../components/MDXComponents'

const {  Sider, Content } = Layout;

export async function getStaticPaths() {
  const datas = await getAllFiles();
  const paths = datas.map(v => ({params: { com: v.frontmatter.name }}))
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
  const  item = datas.find(v => (v.frontmatter.name === com))
  return { props: { com, item, datas } }
}

export default function Com({ com, item, datas }) {
  const  items = datas.map(v => ({label: v.frontmatter.name, key: v.frontmatter.name}))
  const router = useRouter();
  const onClick = ({key}) => {
    const source = datas.find(v => v.frontmatter.name === key)
    router.push(key)
  }
  return (
    <Layout>
      <Sider>
        <Menu items={items} onClick={onClick} defaultSelectedKeys={[com]} />
      </Sider>
      <Layout>
        <Content>
          <MDXLayoutRenderer
            mdxSource={item.mdxSource}
          />
        </Content>
      </Layout>
    </Layout>
  )
}
