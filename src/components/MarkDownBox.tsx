import React from "react";
import ReactMarkdown from "react-markdown";
import { ShikiHighlighter, isInlineCode } from "react-shiki";
import remarkGfm from "remark-gfm";

const CodeBlock = ({ code }: { code: string }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };
  return (
    <div className="copy-button-section">
      <button onClick={copyCode}>
        <div className="icon">
          <svg viewBox="0 -2 36 36" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M34,0H14a2,2,0,0,0-2,2V8H2a2,2,0,0,0-2,2V30a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V24H34a2,2,0,0,0,2-2V2A2,2,0,0,0,34,0ZM20,14V27a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V13a1,1,0,0,1,1-1H19a1,1,0,0,1,1,1ZM32,6V19a1,1,0,0,1-1,1H24V10a2,2,0,0,0-2-2H16V5a1,1,0,0,1,1-1H31a1,1,0,0,1,1,1Z"
              fill="#3b3b3bff"
            />
          </svg>
        </div>
        Copy
      </button>
    </div>
  );
};

const MarkDownBox = React.memo(
  ({
    markDownString,
    width = "100%",
    theme = "light",
  }: {
    markDownString: string;
    width?: string;
    theme?: "dark" | "light";
  }) => {
    return (
      <div
        className={`${theme == "dark" ? "dark-mode" : "light-mode"}`}
        style={{ width }}
      >
        <div
          className="markdown"
          style={{
            background: theme == "dark" ? "#0f0f0f" : "#faeaeaff",
            borderRadius: "5px",
          }}
        >
          <ReactMarkdown
            components={{
              code({ node, className, children, ...props }: any) {
                const language = className?.replace("language-", "") || "text";

                // Use isInlineCode to detect inline code (safer than relying on inline prop)
                const inline = isInlineCode(node);

                if (!inline) {
                  return (
                    <div className="markdown-code">
                      <CodeBlock code={String(children).trim()} />
                      <ShikiHighlighter
                        language={language}
                        theme={`${
                          theme == "dark" ? "github-dark" : "github-light"
                        }`}
                        addDefaultStyles
                      >
                        {String(children).trim()}
                      </ShikiHighlighter>
                    </div>
                  );
                }

                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
            remarkPlugins={[remarkGfm]}
          >
            {markDownString}
          </ReactMarkdown>
        </div>
      </div>
    );
  }
);

export default MarkDownBox;
