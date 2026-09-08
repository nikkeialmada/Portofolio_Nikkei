/* =============================================================
   Renderer teks kaya ringan — tanpa dependensi.
   Mendukung: paragraf (dipisah baris kosong), sub-judul "### ",
   dan daftar berbutir "- " / "* ". Cukup untuk isi studi kasus & blog.
   ============================================================= */
import { Fragment, type ReactNode } from "react";

function renderInline(text: string): ReactNode {
  // Dukungan **tebal** sederhana.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function RichText({ text, className }: { text: string; className?: string }) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(
      <p key={key++} className="mb-4 leading-relaxed text-ink-dim">
        {renderInline(paragraph.join(" "))}
      </p>,
    );
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    blocks.push(
      <ul
        key={key++}
        className="mb-4 list-disc space-y-1.5 pl-5 text-ink-dim marker:text-ink-mute"
      >
        {list.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("### ") || line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h3
          key={key++}
          className="mb-2 mt-7 text-sm font-semibold text-ink first:mt-0"
        >
          {line.replace(/^#{2,3}\s+/, "")}
        </h3>,
      );
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph();
      list.push(line.slice(2));
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return <div className={className}>{blocks}</div>;
}
