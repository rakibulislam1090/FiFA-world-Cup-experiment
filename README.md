# FIFA World Cup 2050: Bangladesh Hosting Proposal (experiment)

Presentation experiments for a proposal on Bangladesh hosting or co-hosting the FIFA World Cup™ in 2050.
The content comes from the "Analysis" research document, Section E › Hosting Country › Bangladesh.

> ⚠️ This is a **planning proposal and an academic exercise**, not an approved bid.
> Figures marked as estimates or planning assumptions in the source are unverified.

## Contents

| Folder / file | What it is |
|---|---|
| `decks/Bangladesh_2050_FIFA_World_Cup_Bid.pptx` | Version 1: a full 23-slide deck (night-stadium theme) covering all sections of the analysis, with speaker notes |
| `decks/Bangladesh_2050_FIFA_Story_10_Slides.pptx` | Version 2: a 10-slide story deck plus references, with a real map of Bangladesh (Natural Earth data) and original stadium illustrations |
| `claude-design/Claude_Design_Prompt_Bangladesh_2050.md` | A copy-paste kit for claude.ai/design: design-system README, a 10-slide prompt with a Morph animation plan, and a photo list |
| `scripts/` | The Node.js scripts that generated the decks (`pptxgenjs` + `sharp`) |

## Key figures used (from the source analysis)

- Four candidate host cities: Dhaka/Purbachal (85,000 seats), Chattogram (65,000), Cox's Bazar (45,000 → ≈25,000 after the tournament), Sylhet (45,000 → ≈20,000–25,000)
- Central (P50) capital estimate: ≈ USD 7.49bn (2026 USD; not a sanctioned budget)
- Benchmark: USD 13,500 per gross seat; +28% contingency (Flyvbjerg, Holm & Buhl, 2002); 16% interest during construction
- Phase-gated roadmap: 2026 (feasibility) → 2050 (tournament) → 2060 (legacy)

## Known limitations

- The per-venue cost tables in the source sit in linked Google Sheets that were not accessible, so per-venue costs and the P10/P90 values in version 1 are **derived** (labelled on the slides) and should be checked.
- The stadium and site-plan visuals are original concept illustrations, not real designs or surveys.
- Real photos from Wikimedia Commons (CC BY-SA / CC0) are planned for a later version, each with its credit line.

## Rebuilding the decks

The scripts were written for a one-off cloud session and use absolute paths. To rerun them, install
`pptxgenjs`, `sharp`, `react`, `react-dom`, `react-icons`, `world-atlas@2.0.2` and `topojson-client@3.1.0`,
then update the paths at the top of each script.

## Author

Md. Rakibul Islam, BBA (Business Analytics), United International University.
