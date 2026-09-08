/* ============================================================
   A very small PDF writer.

   Why this exists: window.print() can make a PDF, but it always opens the
   print dialog and then a "where do you want to save it?" box. Building the
   file here instead means the browser can just download it, already named,
   with no questions asked.

   It only needs to do one job — black text on white pages — so it uses the
   14 fonts every PDF reader already has built in. Nothing is embedded, there
   are no images, and no library is loaded. The trade-off is the WinAnsi
   character set: accented letters are fine, emoji are not, so those get
   stripped on the way in.
   ============================================================ */

const LakePdf = (function () {
  'use strict';

  const PAGE = { width: 612, height: 792, margin: 56 };   // US Letter, in points
  const FONTS = { regular: 'F1', bold: 'F2', italic: 'F3' };

  /* ---------- text encoding ---------- */

  // Characters PDF's WinAnsiEncoding knows by a different number than Unicode.
  const WINANSI = {
    '€': 128, '‚': 130, 'ƒ': 131, '„': 132, '…': 133,
    '†': 134, '‡': 135, 'ˆ': 136, '‰': 137, 'Š': 138,
    '‹': 139, 'Œ': 140, 'Ž': 142, '‘': 145, '’': 146,
    '“': 147, '”': 148, '•': 149, '–': 150, '—': 151,
    '˜': 152, '™': 153, 'š': 154, '›': 155, 'œ': 156,
    'ž': 158, 'Ÿ': 159
  };

  // Anything the base fonts can't draw (emoji, CJK, …) is dropped rather than
  // shown as a box, so a student's sentence still reads cleanly.
  function toWinAnsi(text) {
    let out = '';
    for (const ch of String(text)) {
      if (WINANSI[ch] !== undefined) { out += String.fromCharCode(WINANSI[ch]); continue; }
      const code = ch.codePointAt(0);
      if (ch === '\n') { out += '\n'; continue; }            // keep paragraphs
      if (code === 9) { out += '    '; continue; }           // tab
      if (code < 32) continue;                               // other control chars
      if (code <= 255) { out += String.fromCharCode(code); continue; }
      // emoji and anything else the base fonts can't draw: leave it out
    }
    // dropped emoji can leave a gap behind, so tidy runs of spaces
    return out.replace(/ {2,}/g, ' ').replace(/[ \t]+(\n|$)/g, '$1');
  }

  function escapePdf(text) {
    return text.replace(/[\\()]/g, (m) => '\\' + m);
  }

  /* ---------- measuring ---------- */

  // Canvas measures Arial, which shares its metrics with Helvetica closely
  // enough for line breaking. Slightly conservative so nothing overruns.
  let measurer = null;
  function widthOf(text, size, weight) {
    if (!measurer) {
      const canvas = document.createElement('canvas');
      measurer = canvas.getContext('2d');
    }
    if (!measurer) return text.length * size * 0.5;
    measurer.font = (weight || '') + ' ' + size + 'px Helvetica, Arial, sans-serif';
    return measurer.measureText(text).width * 1.01;
  }

  function wrap(text, size, weight, maxWidth) {
    const lines = [];

    String(text).split('\n').forEach(function (paragraph) {
      const words = paragraph.split(/\s+/).filter(Boolean);
      if (!words.length) { lines.push(''); return; }

      let line = words[0];
      for (let i = 1; i < words.length; i++) {
        const attempt = line + ' ' + words[i];
        if (widthOf(attempt, size, weight) > maxWidth) {
          lines.push(line);
          line = words[i];
        } else {
          line = attempt;
        }
      }
      lines.push(line);
    });

    return lines;
  }

  /* ---------- laying text into pages ---------- */

  function paginate(blocks) {
    const usable = PAGE.width - PAGE.margin * 2;
    const bottom = PAGE.margin + 24;   // leave room for the page number
    const pages = [];
    let page = [];
    let y = PAGE.height - PAGE.margin;

    function newPage() {
      pages.push(page);
      page = [];
      y = PAGE.height - PAGE.margin;
    }

    blocks.forEach(function (block) {
      if (block.rule) {
        if (y - 12 < bottom) newPage();
        y -= block.gapBefore || 0;
        page.push({ rule: true, y: y, x: PAGE.margin, width: usable });
        y -= block.gapAfter || 0;
        return;
      }

      y -= block.gapBefore || 0;

      const indent = block.indent || 0;
      const weight = block.font === FONTS.bold ? 'bold' : '';
      const lines = wrap(block.text, block.size, weight, usable - indent);

      // Don't strand a question at the foot of a page with its answer overleaf:
      // if the heading and a couple of lines under it won't fit, turn first.
      if (block.keepWithNext) {
        const needed = lines.length * block.leading + 30;
        if (y - needed < bottom) newPage();
      }

      lines.forEach(function (line) {
        if (y - block.leading < bottom) newPage();
        y -= block.leading;
        page.push({
          text: line, x: PAGE.margin + indent, y: y,
          font: block.font, size: block.size
        });
      });

      y -= block.gapAfter || 0;
    });

    pages.push(page);
    return pages;
  }

  /* ---------- writing the file ---------- */

  function build(data) {
    const blocks = [];

    // everything is converted to the encoding the built-in fonts use, once,
    // before it is measured — so wrapping matches what actually gets drawn
    const clean = toWinAnsi;

    blocks.push({ text: clean(data.title), font: FONTS.bold, size: 18, leading: 22, gapAfter: 6 });
    (data.meta || []).forEach(function (row) {
      blocks.push({ text: clean(row), font: FONTS.regular, size: 10.5, leading: 14 });
    });
    blocks.push({ rule: true, gapBefore: 12, gapAfter: 6 });

    (data.items || []).forEach(function (item, i) {
      blocks.push({
        text: clean((i + 1) + '. ' + item.question),
        font: FONTS.bold, size: 11, leading: 14, gapBefore: 12, keepWithNext: true
      });
      if (item.requirement) {
        blocks.push({ text: clean(item.requirement), font: FONTS.italic, size: 9, leading: 11.5 });
      }
      blocks.push({
        text: clean(item.answer), font: FONTS.regular, size: 10.5, leading: 14,
        indent: 14, gapBefore: 3
      });
    });

    const pages = paginate(blocks);

    /* --- assemble the objects --- */
    const chunks = [];
    let length = 0;
    const offsets = [];

    function put(str) { chunks.push(str); length += str.length; }
    function obj(num, body) {
      offsets[num] = length;
      put(num + ' 0 obj\n' + body + '\nendobj\n');
    }

    put('%PDF-1.4\n');

    const pageIds = pages.map((_, i) => 6 + i * 2);

    obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
    obj(2, '<< /Type /Pages /Kids [' + pageIds.map(id => id + ' 0 R').join(' ') +
           '] /Count ' + pages.length + ' >>');
    obj(3, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    obj(4, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    obj(5, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');

    pages.forEach(function (items, index) {
      const pageId = pageIds[index];
      const contentId = pageId + 1;

      let stream = '';
      items.forEach(function (item) {
        if (item.rule) {
          stream += '0.75 w 0.78 G\n' +
                    item.x + ' ' + item.y.toFixed(2) + ' m ' +
                    (item.x + item.width) + ' ' + item.y.toFixed(2) + ' l S\n';
          return;
        }
        if (!item.text) return;
        stream += 'BT /' + item.font + ' ' + item.size + ' Tf 0 g 1 0 0 1 ' +
                  item.x.toFixed(2) + ' ' + item.y.toFixed(2) + ' Tm (' +
                  escapePdf(item.text) + ') Tj ET\n';
      });

      // page number, centred at the foot
      const footer = 'Page ' + (index + 1) + ' of ' + pages.length;
      stream += 'BT /' + FONTS.regular + ' 8.5 Tf 0.45 g 1 0 0 1 ' +
                ((PAGE.width - widthOf(footer, 8.5, '')) / 2).toFixed(2) + ' ' +
                (PAGE.margin - 16) + ' Tm (' + escapePdf(footer) + ') Tj ET\n';

      obj(pageId,
        '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + PAGE.width + ' ' + PAGE.height + ']' +
        ' /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >>' +
        ' /Contents ' + contentId + ' 0 R >>');

      obj(contentId, '<< /Length ' + stream.length + ' >>\nstream\n' + stream + 'endstream');
    });

    /* --- cross-reference table --- */
    const total = offsets.length;
    const xrefStart = length;

    let xref = 'xref\n0 ' + total + '\n0000000000 65535 f \n';
    for (let i = 1; i < total; i++) {
      const at = offsets[i] || 0;
      xref += String(at).padStart(10, '0') + ' 00000 n \n';
    }
    put(xref);
    put('trailer\n<< /Size ' + total + ' /Root 1 0 R >>\nstartxref\n' + xrefStart + '\n%%EOF\n');

    /* --- one byte per character --- */
    const text = chunks.join('');
    const bytes = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) bytes[i] = text.charCodeAt(i) & 0xff;
    return bytes;
  }

  return { build: build, clean: toWinAnsi };
})();
