import {MDXRemote} from "next-mdx-remote";

import {getFileBySlug, getFiles} from "../lib/mdx";

export default function Post({source, frontmatter}) {
  return (
    <>
      <MDXRemote {...source} />
    </>
  );
}

export async function getStaticPaths() {
  const posts = getFiles();
  const paths = posts.map((post) => ({
    params: {
      slug: post.replace(/\.mdx/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const {source, frontmatter} = await getFileBySlug(params.slug);

  return {
    props: {source, frontmatter},
  };
}
