"use client";

import { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (preRef.current) {
      try {
        const textContent = preRef.current.textContent || "";
        await navigator.clipboard.writeText(textContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  // Only add copy button for shiki code blocks
  const isShikiBlock = className?.includes("shiki");

  if (!isShikiBlock) {
    return (
      <pre className={className} {...props}>
        {children}
      </pre>
    );
  }

  return (
    <div className="relative group">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-md bg-primary hover:bg-primary text-secondary hover:cursor-pointer hover:text-secondary transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label={copied ? "Copied!" : "Copy code"}
        title={copied ? "Copied!" : "Copy code"}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
