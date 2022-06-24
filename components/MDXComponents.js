import { useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { getMDXComponent } from 'mdx-bundler/client';
import CodeBlock from './CodeBlock';
import styles from './styles.module.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import Snackbar from '@mui/material/Snackbar';


const CustomDiv = props => {
  const [open, setOpen] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  return <div className={styles.cumstom}>
    <div className={styles.cumstomCom}>{props.children}</div>
    <div className={styles.icons}>
      <span onClick={() => { navigator.clipboard.writeText(renderToString(props.children)); setOpenSnackbar(true) }}><ContentCopyIcon /></span>
      <span onClick={() => setOpen(!open)}><UnfoldMoreIcon /></span>
    </div>
    <Snackbar
      open={openSnackbar}
      onClose={() => { setOpenSnackbar(false) }}
      autoHideDuration={2000}
      message="已复制"
    />
    <div className={open ? styles.open : styles.close}>
      <CodeBlock>{renderToString(props.children)}</CodeBlock>
    </div>

  </div>
}

export const MDXLayoutRenderer = ({ mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout {...rest} components={{ Planet: CustomDiv, code: CodeBlock }} />
}
