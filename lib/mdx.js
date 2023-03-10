import fs from "fs";
import path from "path";

import matter from "gray-matter";
import {serialize} from "next-mdx-remote/serialize";
//PUEDO AGREGAR OPCIONES AL SERIALIZE SOBRE QUE OPCIONES RESIVE EL MARKDOWN

const root = process.cwd();

export const getFiles = () => {
  return fs.readdirSync(path.join(root, "data"));
};

export const getFileBySlug = async (slug) => {
  const mdxSource = fs.readFileSync(path.join(root, "data", `${slug}.mdx`), "utf8");

  const {data, content} = matter(mdxSource);

  const source = await serialize(content, {mdxOptions: {development: false}});

  return {
    source,
    frontmatter: {
      slug: slug,
      ...data,
    },
  };
};

export const getAllFilesMetadata = async () => {
  const files = fs.readdirSync(path.join(root, "data"));

  return files.reduce((allPosts, postSlug) => {
    const mdxSource = fs.readFileSync(path.join(root, "data", postSlug), "utf8");
    const {data} = matter(mdxSource);

    return [{...data, slug: postSlug.replace(".mdx", "")}, ...allPosts];
  }, []);
};
