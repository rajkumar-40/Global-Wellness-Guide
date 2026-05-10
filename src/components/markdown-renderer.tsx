'use client';

import { useMemo } from 'react';

type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const htmlContent = useMemo(() => {
    if (!content) return '';

    let processedContent = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\\n/g, '\n');

    processedContent = processedContent
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-foreground">$1</strong>'
      )
      .replace(/__(.*?)__/g, '<strong class="font-semibold text-foreground">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>');

    const lines = processedContent.split('\n');
    let html = [];
    let inList = false;
    let listType = ''; // 'ul' or 'ol'
    let inTable = false;
    let tableHeaderDone = false;

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('#### ')) {
        html.push(
          `<h4 class="font-headline text-lg font-semibold mt-6 mb-2 text-foreground/90">${trimmedLine.substring(
            5
          )}</h4>`
        );
        continue;
      }
      if (trimmedLine.startsWith('### ')) {
        html.push(
          `<h3 class="font-headline text-xl font-semibold mt-8 mb-3 text-foreground">${trimmedLine.substring(
            4
          )}</h3>`
        );
        continue;
      }
      if (trimmedLine.startsWith('## ')) {
        html.push(
          `<h2 class="font-headline text-2xl font-bold mt-10 mb-4 border-b border-primary pb-2 text-primary-foreground">${trimmedLine.substring(
            3
          )}</h2>`
        );
        continue;
      }
      if (trimmedLine.startsWith('# ')) {
        html.push(
          `<h1 class="font-headline text-3xl font-bold mt-12 mb-6 text-primary-foreground">${trimmedLine.substring(
            2
          )}</h1>`
        );
        continue;
      }

      // Handle Tables
      if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
        const cells = trimmedLine
          .slice(1, -1)
          .split('|')
          .map(c => c.trim());

        if (!inTable) {
          if (inList) {
            html.push(`</${listType}>`);
            inList = false;
          }
          html.push(
            '<div class="overflow-x-auto my-6"><table class="w-full text-left border-collapse">'
          );
          inTable = true;
          tableHeaderDone = false;
        }

        if (cells.every(c => /^-+$/.test(c))) {
          // This is the separator line
          tableHeaderDone = true;
          html.push('</thead><tbody>');
        } else if (!tableHeaderDone) {
          html.push('<thead><tr class="border-b-2 border-primary/50">');
          cells.forEach(header => {
            html.push(
              `<th class="p-3 font-semibold text-primary-foreground">${header}</th>`
            );
          });
          html.push('</tr>');
        } else {
          html.push('<tr class="border-b border-border/50">');
          cells.forEach(cell => {
            html.push(`<td class="p-3">${cell}</td>`);
          });
          html.push('</tr>');
        }
        continue;
      }

      if (inTable) {
        html.push('</tbody></table></div>');
        inTable = false;
        tableHeaderDone = false;
      }

      // Handle Lists
      const isUnorderedListItem = trimmedLine.startsWith('* ');
      const isOrderedListItem = trimmedLine.match(/^\d+\.\s/);

      if (isUnorderedListItem || isOrderedListItem) {
        const currentListType = isUnorderedListItem ? 'ul' : 'ol';
        if (!inList || listType !== currentListType) {
          if (inList) html.push(`</${listType}>`);
          html.push(
            currentListType === 'ul'
              ? '<ul class="list-disc list-inside mb-4 space-y-2 pl-4">'
              : '<ol class="list-decimal list-inside mb-4 space-y-2 pl-4">'
          );
          inList = true;
          listType = currentListType;
        }
        const itemContent = isUnorderedListItem
          ? trimmedLine.substring(2)
          : trimmedLine.replace(/^\d+\.\s/, '');
        html.push(
          `<li class="text-foreground/90 marker:text-accent">${itemContent}</li>`
        );
        continue;
      }

      if (inList) {
        html.push(`</${listType}>`);
        inList = false;
      }

      // Handle Paragraphs
      if (trimmedLine.length > 0) {
        html.push(`<p class="mb-4 leading-relaxed">${trimmedLine}</p>`);
      } else if (html.length > 0 && !html[html.length -1].endsWith('<br />')) {
        // Preserve single empty lines between paragraphs, but not multiple
        html.push('<br />');
      }
    }

    if (inList) html.push(`</${listType}>`);
    if (inTable) html.push('</tbody></table></div>');

    return html.join('\n').replace(/(<br \/>\n)+/g, '<br />');
  }, [content]);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
