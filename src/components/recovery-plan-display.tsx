'use client';

import { Download, Twitter, Facebook, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MarkdownRenderer } from './markdown-renderer';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

type RecoveryPlanDisplayProps = {
  plan: string;
  onStartOver: () => void;
};

const suggestedHashtags = [
  '#WellnessJourney',
  '#HolisticHealth',
  '#NaturalHealing',
  '#MindBodySoul',
  '#SelfCare',
  '#GlobalWellness',
];

export function RecoveryPlanDisplay({
  plan,
  onStartOver,
}: RecoveryPlanDisplayProps) {
  const getHtmlForDownload = (markdown: string) => {
    let processedContent = markdown
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>');
    
    const lines = processedContent.split('\n');
    let html = '';
    let inList = false;
    let listType = '';
    let inTable = false;
    let tableHeaderDone = false;

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('# ')) html += `<h1>${trimmedLine.substring(2)}</h1>`;
        else if (trimmedLine.startsWith('## ')) html += `<h2>${trimmedLine.substring(3)}</h2>`;
        else if (trimmedLine.startsWith('### ')) html += `<h3>${trimmedLine.substring(4)}</h3>`;
        else if (trimmedLine.startsWith('#### ')) html += `<h4>${trimmedLine.substring(5)}</h4>`;
        else if (trimmedLine.startsWith('|')) {
            const cells = trimmedLine.slice(1, -1).split('|').map(c => c.trim());
            if (!inTable) {
                html += '<table>';
                inTable = true;
                tableHeaderDone = false;
            }
            if (cells.every(c => /^-+$/.test(c))) {
                if (!tableHeaderDone) {
                    html = html.replace(/<thead>/g, '<tbody>').replace(/<\/thead>/g, '');
                    html = html.replace(/<th>/g, '<td>').replace(/<\/th>/g, '</td>');
                    tableHeaderDone = true;
                }
            } else if (!tableHeaderDone) {
                html += '<thead><tr>';
                cells.forEach(header => html += `<th>${header}</th>`);
                html += '</tr></thead>';
            } else {
                html += '<tr>';
                cells.forEach(cell => html += `<td>${cell}</td>`);
                html += '</tr>';
            }
        } else if (inTable) {
            html += '</table>';
            inTable = false;
        } else if (trimmedLine.startsWith('* ')) {
            if (!inList || listType !== 'ul') {
                if (inList) html += `</${listType}>`;
                html += '<ul>';
                inList = true;
                listType = 'ul';
            }
            html += `<li>${trimmedLine.substring(2)}</li>`;
        } else if (trimmedLine.match(/^\d+\.\s/)) {
            if (!inList || listType !== 'ol') {
                if (inList) html += `</${listType}>`;
                html += '<ol>';
                inList = true;
                listType = 'ol';
            }
            html += `<li>${trimmedLine.replace(/^\d+\.\s/, '')}</li>`;
        } else {
            if (inList) {
                html += `</${listType}>`;
                inList = false;
            }
            if (trimmedLine) html += `<p>${trimmedLine}</p>`;
        }
    }
    if (inList) html += `</${listType}>`;
    if (inTable) html += '</table>';

    return html;
  };

  const handleDownload = () => {
    try {
      const htmlContent = getHtmlForDownload(plan);
      const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Personalized Wellness Plan</title>
        <style>
          body { font-family: 'Alegreya', serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: auto; color: #333; background-color: #F5F5FF; }
          h1, h2, h3, h4 { font-family: 'Belleza', sans-serif; color: #4a4a7a; }
          h1 { font-size: 2.5em; text-align: center; margin-bottom: 20px; color: #2c2c54; }
          h2 { font-size: 2em; border-bottom: 1px solid #E6E6FA; padding-bottom: 5px; margin-top: 1.5em; }
          h3 { font-size: 1.5em; margin-top: 1em; }
          table { width: 100%; border-collapse: collapse; margin: 1.5em 0; }
          th, td { border: 1px solid #E6E6FA; padding: 12px; text-align: left; }
          th { background-color: #E6E6FA; font-weight: bold; }
          ul, ol { padding-left: 20px; margin-bottom: 1em; }
          .disclaimer { background-color: #fff3cd; border: 1px solid #ffeeba; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <h1>Your Personalized Wellness Plan</h1>
        ${htmlContent}
      </body>
      </html>
    `;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Global-Wellness-Plan.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const shareOnTwitter = () => {
    try {
      const text =
        'I just created a personalized wellness plan with Global Wellness Guide! ✨ #HolisticHealth #WellnessJourney';
      const url = 'https://your-website-url.com';
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`,
        '_blank'
      );
    } catch (error) {
      console.error('Twitter sharing failed:', error);
    }
  };

  const shareOnFacebook = () => {
    try {
      const url = 'https://your-website-url.com';
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        '_blank'
      );
    } catch (error) {
      console.error('Facebook sharing failed:', error);
    }
  };

  // --- New: Append additional therapy guidance for health-related plans on frontend only ---
  const healthKeywords = [
    'diet',
    'recover',
    'recovery',
    'injury',
    'therapy',
    'rehab',
    'post-op',
    'wound',
    'heal',
    'surgery',
    'pain',
  ];

  const containsHealthKeyword = healthKeywords.some(k => new RegExp(`\\b${k}\\b`, 'i').test(plan));

  const alreadyHasDrBRC = /Dr\.?\s*BRC/i.test(plan);
  const alreadyHasBrahmand = /Brahmand\s*Rushi|Vaidic/i.test(plan);

  let displayPlan = plan;

  if (containsHealthKeyword && !(alreadyHasDrBRC && alreadyHasBrahmand)) {
    let additionalContent = '\n\n---\n### Additional therapy — Dr. BRC\nA concise complementary therapy by Dr. BRC to support nutrition-led recovery, sleep, and gentle mobilization. For the full plan and recovery method, see: /docs/diet-plans/dr-brc-health-diet-plan.md\n\n';

    // Brahmand Rushi Vaidic Therapy summary (longevity-focused)
    if (!alreadyHasBrahmand) {
      additionalContent += '### Brahmand Rushi Vaidic Therapy — Longevity Method\n- Emphasizes daily routines (dinacharya) that align with circadian rhythm and digestive health.\n- Practices include gentle pranayama (breathwork), short guided meditation, mindful eating, and light joint mobility.\n- Supportive herbal and dietary suggestions focus on balancing digestion, reducing inflammation, and promoting restorative sleep.\n- Intended as a complementary longevity approach — not a substitute for medical treatment. Consult a licensed practitioner for personalized guidance.\n\n';
    }

    // Add a short disclaimer if not present
    if (!/Disclaimer:/.test(plan)) {
      additionalContent += 'Disclaimer: The additional therapies listed are educational and complementary. They are not a replacement for professional medical care. If you have a serious medical condition, consult your healthcare provider before making changes.\n';
    }

    displayPlan = plan + additionalContent;
  }

  return (
    <Card className="shadow-2xl shadow-primary/10 animate-in fade-in-50 slide-in-from-bottom-10 duration-500 rounded-2xl">
      <CardHeader className="bg-card/50 rounded-t-2xl p-6 border-b border-primary/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="font-headline text-3xl text-primary-foreground">
              Your Personalized Wellness Plan
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              A guide for your journey to well-being, crafted just for you.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={onStartOver}>
              <RefreshCw className="mr-2 h-4 w-4" /> Start Over
            </Button>
            <Button variant="default" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-10">
        <MarkdownRenderer content={displayPlan} />

        <Separator className="my-12" />

        <div className="mt-8">
          <h3 className="font-headline text-xl font-semibold mb-4 text-primary-foreground">
            Share Your Journey
          </h3>
          <p className="text-muted-foreground mb-4">
            Inspire others by sharing your wellness plan. Use these hashtags to
            join the conversation!
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {suggestedHashtags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-base font-normal bg-accent/50 text-accent-foreground hover:bg-accent"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={shareOnTwitter}>
              <Twitter className="mr-2 h-4 w-4" /> Share on Twitter
            </Button>
            <Button variant="outline" onClick={shareOnFacebook}>
              <Facebook className="mr-2 h-4 w-4" /> Share on Facebook
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
