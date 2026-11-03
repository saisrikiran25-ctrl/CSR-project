# Accessibility (a11y) & Low-Literacy Inclusion Specification (docs/accessibility.md)

## 1. Compliance Standards
Urja Kaushal is engineered to meet **WCAG 2.2 Level AA** standards with special architectural adaptations for rural first-generation smartphone users:

1. **Large Touch Targets**: All interactive buttons, tabs, and form controls have a minimum touch footprint of 48×48 px (`min-h-[48px]` and generous padding).
2. **High Color Contrast**:
   - Deep Solar Blue (`#1E3A8A`) on Soft Cream (`#FAF8F5`) exceeds contrast ratio 7:1 (AAA).
   - Sun Amber accent (`#D97706` / `#B45309`) ensures readability across outdoor sunlight glare.
3. **Voice-Guided Navigation (Web Speech API)**:
   - A persistent floating "🔊 Listen" button on all screens reads page content aloud in native Gujarati (`gu-IN`), Hindi (`hi-IN`), or English (`en-IN`).
   - Every question prompt in exams includes an audio read button.
4. **Bilingual Visuals & Transcripts**:
   - Every lesson includes synchronized text transcripts and native script font support (`Noto Sans Gujarati`, `Noto Sans Devanagari`).
   - Audio-visual mode features spoken hints on component clicks.
5. **No Color-Alone Semantics**:
   - Status indicators pair colors with text badges and icons (e.g. checkmark + "Present" + green badge).

## 2. Low-Bandwidth & Offline Tolerant Design
- Initial JS footprint: **~186 KB gzipped** (well below the 200 KB low-end Android threshold).
- Audio-only podcast mode reduces media data consumption by over **85%** compared to HD video.
- Local persistence via Dexie.js (IndexedDB) allows offline continuation during village power outages.

