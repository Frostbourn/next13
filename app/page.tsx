"use client";

import { use, useCallback, useState } from "react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import { Title } from "../components/Title";
import { makeQueryClient } from "../utils/queryClient";

const container = {
  display: "grid",
  gridTemplateColumns: "40vw 40vw",
  justifyContent: "center",
  gap: "40px",
};

const divStyle = {
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
};

const inputStyle = {
  height: "50vh",
  padding: "10px",
};

const formStyle = {
  position: "sticky",
  top: 0,
  display: "flex",
  flexDirection: "column",
};

const sticky = {
  position: "sticky",
  top: 0,
};

const components = {
  Title,
  Image,
};

const queryClient = makeQueryClient();

export default function Home() {
  const { mdxSource, plainText } = use(
    queryClient(
      "data",
      () =>
        fetch("http://localhost:3000/api/data").then((res) =>
          res.json()
        ) as Promise<any>
    )
  );

  const handlePreview = async (e: any) => {
    return await fetch("http://localhost:3000/api/preview", {
      method: "POST",
      body: JSON.stringify({ mdx: e.target[0].value,}),
    });
  };

  const [markdown, setMarkdown] = useState(plainText);
  const handleMarkdownChange = useCallback((e: any) => {
    setMarkdown(e.target.value);
  }, []);

  return (
    <div style={container}>
      <div style={divStyle}>
        <div style={sticky}>Form</div>
        <form onSubmit={handlePreview} style={formStyle}>
          <textarea
            maxLength={100000}
            style={inputStyle}
            value={markdown}
            onChange={(e) => handleMarkdownChange(e)}></textarea>
          <button type='submit'>Preview</button>
          <div>Frontmatter</div>
          {JSON.stringify(mdxSource.frontmatter, null, 2)}
        </form>
      </div>
      <div style={divStyle}>
        <div>Preview</div>
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </div>
  );
}
