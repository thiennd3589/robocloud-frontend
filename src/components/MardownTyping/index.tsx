// import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import cls from "classnames";
import styles from "./markdown.module.scss";

const TypingMarkdown = ({ markdownText = "", _typingSpeed = 0.1 }) => {
  // const [visibleLength, setVisibleLength] = useState(0);

  // useEffect(() => {
  //   let index = 0;
  //   const interval = setInterval(() => {
  //     if (index <= markdownText.length) {
  //       setVisibleLength(index);
  //       index++;
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, typingSpeed);

  //   return () => clearInterval(interval);
  // }, [markdownText, typingSpeed]);

  return (
    <div
      className={cls("w-[70vw] prose prose-invert", styles.markdown)}
      style={{}}
    >
      <ReactMarkdown
        components={{
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              // eslint-disable-next-line
              // @ts-ignore
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                customStyle={{
                  overflowY: "scroll",
                }}
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={{
                  ...atomDark,
                }}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {/* {markdownText.substring(0, visibleLength)} */}
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};
export default TypingMarkdown;
