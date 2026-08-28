# Hindi Translation Review

## Status

| Measure | Count |
|---|---:|
| Public routes inventoried | 43 |
| Existing Hindi routes | 1 (`/hi`) |
| New Hindi sub-routes published | 0 |
| New translation draft files | 0 |
| Mandatory-review routes | 14 |

The existing `/hi` page is a Hindi placeholder, not a full translation of the English homepage. It is therefore not accurate to represent the remaining 42 routes as translated. No non-routable page drafts have been created from untranslated English source text.

The authoritative route inventory and review flags are in `./hi-translation-inventory.md`.

## Mandatory-review excerpts

### `/founder` — Beyond Technology (locked English source)

| English source | Hindi draft for reviewer |
|---|---|
| Community service, karma yoga, and Advaita-based teaching continue through Nirvandham, spanning multiple paths within its gurukul tradition. Yuj Foundation extends this into structured life-education curriculum across several tracks. Teaching also continues within gyanmarg.guru's gurukul, with structured oral and written assessment as part of its ongoing program. Across all three, the approach stays consistent: clarity built through practice and direct experience, not lecture. | निरवंधम के गुरुकुल-परंपरा के विभिन्न मार्गों में सामुदायिक सेवा, कर्मयोग और अद्वैत-आधारित शिक्षा का कार्य जारी है। युज फ़ाउंडेशन इसे कई धाराओं में व्यवस्थित जीवन-शिक्षा पाठ्यक्रम के रूप में आगे बढ़ाता है। gyanmarg.guru के गुरुकुल में भी नियमित मौखिक और लिखित मूल्यांकन सहित अध्ययन चलता है। तीनों स्थानों पर मूल दृष्टि एक ही है: केवल व्याख्यान नहीं, अभ्यास और प्रत्यक्ष अनुभव से विकसित स्पष्टता। |

**Reviewer focus:** this is an approved/locked English section and includes named institutions and philosophical terms; publication requires separate approval.

### `/knowledge/why-erp-implementations-fail` — Panorama statistic

| English source | Hindi draft for reviewer |
|---|---|
| Industry research from Panorama Consulting's 2025 ERP Report puts the overall ERP failure rate at 68%, with estimates across major analyst firms ranging from 55% to 75%. | Panorama Consulting की 2025 ERP Report के अनुसार ERP परियोजनाओं की समग्र विफलता-दर 68% बताई गई है; प्रमुख विश्लेषक संस्थाओं के अनुमान 55% से 75% के बीच हैं। |

**Reviewer focus:** preserve the source, date, number, qualification and citation exactly.

### `/knowledge/website-redesign-cost-guide` — Akamai/Google statistic

| English source | Hindi draft for reviewer |
|---|---|
| Research from Akamai and Google indicates that every 100ms delay in mobile page load time can reduce conversion rates by up to 7%. | Akamai और Google के शोध के अनुसार, मोबाइल पेज लोड होने में हर अतिरिक्त 100ms की देरी conversion rate को अधिकतम 7% तक कम कर सकती है। |

**Reviewer focus:** retain the conditional wording (“up to”) and validate the cited research before publication.

### Legal pages

`/disclaimer`, `/privacy-policy`, and `/terms` are flagged for a qualified legal review before any Hindi text is created or published. A translation draft must not be treated as legal advice or a legally operative replacement for the approved English text.

## Non-flagged route handling

The remaining routes are appropriate for routine Hindi translation once the route-by-route source copy is approved. Preserve metadata, FAQs, alt text, CTA targets, internal links and the brand-language rules from `./hi-translation-inventory.md`.

## Publishing guardrail

No `/hi/*` sub-route has been added to `sitemap.ts`, navigation, the build route tree, Git, or deployment. Any future `page.draft.tsx` files must remain non-routable until Ajay reviews this document and a separate publishing specification is approved.
