import clsx from "clsx";

const Prose = ({ html, className }: { html: string; className?: string }) => {
  return (
    <div
      className={clsx(
        "prose max-w-none text-base leading-7 text-foreground/80 prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-a:font-semibold prose-a:text-coral prose-a:underline prose-a:underline-offset-4 prose-a:hover:text-coral-deep prose-strong:text-foreground prose-ol:list-decimal prose-ol:pl-5 prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-coral",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;
