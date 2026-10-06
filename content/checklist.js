/* "Is my website ready to launch?" checklist. */
window.CHECKLIST = [
  {
    title: 'Content', icon: '📝',
    items: [
      { text: 'Every page has a clear, unique {{<title>}}', hint: 'It shows on the browser tab and in search results.' },
      { text: 'There’s exactly one {{<h1>}} per page, and headings don’t skip levels' },
      { text: 'All text has been proofread for spelling and grammar', hint: 'Reading it out loud catches a surprising number of mistakes.' },
      { text: 'Contact details or a contact form are easy to find' },
      { text: 'No leftover placeholder text (“Lorem ipsum”, “TODO”, “Your Name”)' },
    ],
  },
  {
    title: 'Links & files', icon: '🔗',
    items: [
      { text: 'Every link works, with no 404s', hint: 'Click through every page, including footer links.' },
      { text: 'The homepage is called {{index.html}}' },
      { text: 'File names are lowercase with no spaces' },
      { text: 'Paths are relative (no {{C:/Users/...}} or {{file:///}} paths)', hint: 'Paths from your own computer break as soon as the site is online.' },
      { text: 'There’s a friendly custom 404 page (optional, but nice)' },
    ],
  },
  {
    title: 'Design & mobile', icon: '📱',
    items: [
      { text: 'The {{<meta name="viewport">}} tag is in every page’s {{<head>}}' },
      { text: 'The site looks good on a phone, tablet, and desktop', hint: 'Use the DevTools device toolbar, then try your real phone.' },
      { text: 'Text is easy to read: big enough, with good contrast against the background' },
      { text: 'Buttons and links are big enough to tap with a thumb' },
      { text: 'There’s no sideways scrolling on small screens' },
    ],
  },
  {
    title: 'Accessibility', icon: '♿',
    items: [
      { text: 'Every meaningful image has descriptive {{alt}} text' },
      { text: 'Every form field has a connected {{<label>}}' },
      { text: 'Semantic tags are used: {{<header>}}, {{<nav>}}, {{<main>}}, {{<footer>}}' },
      { text: 'You can use the whole site with only a keyboard (Tab, Enter, Space)' },
      { text: 'Link text makes sense on its own (no “click here”)' },
      { text: 'The {{<html>}} tag has a {{lang}} attribute, like {{lang="en"}}' },
    ],
  },
  {
    title: 'SEO & sharing', icon: '🔎',
    items: [
      { text: 'Each page has a {{<meta name="description">}}', hint: 'One or two sentences that appear under your link in Google.' },
      { text: 'There’s a favicon (the little icon on the browser tab)' },
      { text: 'Social preview tags (Open Graph) are set so links look nice when shared', hint: 'Covered in Module 7.' },
    ],
  },
  {
    title: 'Performance', icon: '⚡',
    items: [
      { text: 'Images are resized and compressed (ideally under 200 KB each)', hint: 'Try squoosh.app, and consider WebP.' },
      { text: 'Images have {{width}} and {{height}} so the page doesn’t jump while loading' },
      { text: 'There are no errors in the DevTools Console' },
      { text: 'Lighthouse scores are mostly green', hint: 'DevTools → Lighthouse → Analyze. Covered in Module 7.' },
    ],
  },
  {
    title: 'Going live', icon: '🚀',
    items: [
      { text: 'The code is saved in Git and pushed to GitHub', hint: 'Module 8.' },
      { text: 'The site is deployed to a host (GitHub Pages, Netlify, or Vercel)', hint: 'Module 9.' },
      { text: 'HTTPS is on and the padlock shows' },
      { text: 'The custom domain is connected (optional)' },
      { text: 'You’ve tested the live site on your phone and a friend’s device' },
      { text: 'You’ve shared it with the world! 🎉' },
    ],
  },
];
