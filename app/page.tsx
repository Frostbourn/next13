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
  display: "flex",
  flexDirection: "column",
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
      () => fetch("/api/data").then((res) => res.json()) as Promise<any>
    )
  );

  const handleSubmit = (e: any) => {
    const postData = async () => {
      const data = {
        mdx: e.target[0].value,
      };

      const response = await fetch("/api/preview", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };
    postData().then((data) => {
      alert(data.message);
    });
  };

  const [markdown, setMarkdown] = useState(plainText);
  const handleMarkdownChange = useCallback((e: any) => {
    setMarkdown(e.target.value);
  }, []);

  return (
    <div style={container}>
      <div style={divStyle}>
        <div>Form</div>
        <form onSubmit={handleSubmit} style={formStyle}>
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
