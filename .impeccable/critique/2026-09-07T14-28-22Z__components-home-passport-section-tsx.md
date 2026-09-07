---
target: BISCUTE POST OFFICE
total_score: 17
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-09-07T14-28-22Z
slug: components-home-passport-section-tsx
---
Method: dual-agent (A: 658e6df4-878a-480d-93d0-52ff5c87144b · B: bfb2a32e-2285-415d-8399-606c6f2ca0f9)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Progress + ghost/inked clear; no signal progress is ephemeral |
| 2 | Match System / Real World | 3 | Postal metaphor lands; LOCKED reads as UI control |
| 3 | User Control and Freedom | 2 | Refresh silently wipes the hunt |
| 4 | Consistency and Standards | 2 | Two visit verbs; VI cancelOffice still English |
| 5 | Error Prevention | 2 | Dead-click LOCKED; progress loss unguarded |
| 6 | Recognition Rather Than Recall | 2 | Auto-ink-on-collection never taught on-surface |
| 7 | Flexibility and Efficiency | n/a | Experience surface — accelerators not expected |
| 8 | Aesthetic and Minimalist Design | 2 | Sticky Visit fights Special Delivery on mobile |
| 9 | Error Recovery | 1 | Session wipe → empty sheet, zero recovery |
| 10 | Help and Documentation | n/a | Experience surface; locked copy is in-world |
| **Total** | | **17/32** | **Acceptable / weak–moderate** |

#### Design Specificity Verdict

**LLM assessment**: Authored for BISCUTE — perforated PostalFrame, ghost→ink TravelStamps, lotus/tower plates. Not category-interchangeable. Risk is tourism-post-office cosplay that under-delivers Persuade end (store visit / sticker claim).

**Deterministic scan**: CLI detect on passport TSX files: 0 findings. Browser inject on full `/en`: 43 anti-patterns (mostly page-wide). Passport-relevant: low-contrast ghosts/chrome, all-caps lede, text-occlusion of VIỆT NAM under title, mobile sticky overlapping locked body. Cream palette / mobile-nav occlusion / hero hits treated as false positives for this surface.

**Visual overlays**: Injection succeeded via Playwright (no native browser tools). Overlays not left open for Human tab; screenshots at `.impeccable/reviews/assessment-b/`.

#### Overall Impression

Strong souvenir postal object; Persuade climax is broken — unlocked state names the address but offers no Directions, and mobile Visit sticky clips the reward rules. Session-only progress makes the hunt a gotcha for Old Quarter tourists.

#### What's Working

1. One-sheet postal world aligned with DESIGN.md and approved comp.
2. Ghost pastel vs inked+cancel is scannable when contrast holds.
3. Reward choreography respects reduced motion and does not gate content on animation.

#### Priority Issues

**[P0] Session-only passport progress**
- What: `lib/passport.ts` in-memory only; refresh = 00/04
- Why: Tourists background Safari; losing a 4-page hunt kills sticker motivation
- Fix: Persist (localStorage) + short reassurance copy
- Suggested command: /impeccable harden

**[P1] Unlocked climax has no store action**
- What: RewardSection unlocked branch has no Directions/Visit control
- Why: Peak-end Persuade dies as dead text
- Fix: Primary Open directions under unlockedBody
- Suggested command: /impeccable clarify

**[P1] Mobile sticky Visit eats Special Delivery**
- What: lockedBody truncated under yellow Visit bar
- Why: Casey never sees reward rules
- Fix: Hide sticky while reward parcel intersects; increase clear space
- Suggested command: /impeccable adapt

**[P2] False affordance + missing mechanic teach**
- What: LOCKED looks tappable; surface never explains visit→ink loop
- Why: Jordan taps LOCKED then abandons
- Fix: Non-interactive seal treatment + plain teach line
- Suggested command: /impeccable clarify

**[P2] Ghost Animals/Tet legibility + bilingual chrome**
- What: Mustard/tan ghosts wash out; VI cancelOffice still POST OFFICE
- Why: Half the board looks disabled; VI feels unfinished
- Fix: Raise ghost mix; localize cancelOffice
- Suggested command: /impeccable polish

#### Persona Red Flags

**Jordan**: Taps LOCKED; never learns auto-ink; refresh loses progress.
**Casey**: 5 CTAs on mobile; reward clipped; pale ghosts look broken.
**Sam**: LOCKED unclear as non-interactive; claim stroke/halo contrast risk.
**Tourist in Hanoi Old Quarter**: Address named but maps not opened; hunt dies on refresh.

#### Minor Observations

- formatCancelDate hardcodes en-GB on /vi
- issueNo digit parse brittle for VI
- Masthead postmark + stamp cancels stack as three postmark signals

#### Questions to Consider

1. If the sticker is the Persuade prize, why unlinkable when revealed?
2. Is a hunt that dies on refresh a souvenir or a gotcha?
3. When sticky Visit and Stamp Hunt share the thumb, which conversion wins?
