# DigiXPro Growth & Intelligence System — Final Architecture (v4, LOCKED)

> यह डॉक्यूमेंट DigiXPro के पूरे automation/growth system का लॉक्ड, अंतिम architecture है। इसे future सत्रों में context के तौर पर अपलोड करें ताकि दोबारा से architecture डिज़ाइन न करना पड़े — सीधे technical implementation पर जाया जा सके।

**Status: LOCKED.** आगे कोई नया stage प्रस्तावित नहीं किया जाएगा जब तक स्पष्ट रूप से न कहा जाए। अगला काम सिर्फ़ हर locked stage को phase-by-phase technical spec में बदलना और बनाना है।

---

## 0. Core Closed Loop

```
IDENTITY → LEAD → CONVERSATION/MEMORY → QUALIFICATION → DEAL →
PAYMENT → CUSTOMER → PROJECT → DELIVERY → FEEDBACK →
WEEKLY INTELLIGENCE → CONTENT → DISTRIBUTION → TRAFFIC → वापस IDENTITY
```

**Core Principle:** Horizontal capabilities (identity resolution, memory, sequencing engine) एक बार बनेंगी; Vertical business processes (audit-sequence, cold-outbound, onboarding, content-pipeline) उनके ऊपर plug-in होंगे। कोई भी हिस्सा दूसरे से disconnected नहीं होगा — हर automation एक ही केंद्रीय `lead_id` के इर्द-गिर्द घूमता है।

---

## 1. तीन Automation Levels

हर stage/step को इनमें से किसी एक level पर रखा जाएगा:

- **Level 1 — पूरा Automatic (कम risk):** lead capture, memory update, sequence scheduling, suppression-list check, internal alerts, dashboard updates, weekly data aggregation
- **Level 2 — AI बनाए, इंसान Approve करे (quality-sensitive):** outbound cold email, long-form article, social post, Quora/Reddit/community जवाब, guest-post pitch, testimonial request
- **Level 3 — सिर्फ़ इंसान (business judgement ज़रूरी):** proposal, pricing, client commitment, sensitive बातचीत, deal-won मार्क करना

---

## STAGE 1 — Input & Memory Foundation ✅ (बन चुका, verified)

### Input Channels
1. `/audit-brief` — पूरा business-report form
2. `/audit-lead` — सिर्फ़ URL audit वाला हल्का form
3. Sales Chat (AI Assist widget) — जब visitor email टाइप करे
4. Cold-scraped list — manual upload (आपकी अपनी prospecting list)
5. भविष्य — Social DMs (platform अभी तय नहीं)

### Identity Resolution
हर नए input पर email check होता है:
- मौजूद है → पुरानी `lead_id` पर upsert (नई row नहीं बनती)
- नहीं मिला → नई `lead_id` बनती है (lowercased/trimmed email, या anonymous के लिए `anon-<timestamp>`)
- **Ambiguous match पर सिस्टम कभी guess नहीं करेगा** — साफ़ मैच न मिले तो नया record बनेगा, ग़लत जोड़ना नहीं

### Data Quality Guardrails
- Fake/disposable email domain reject
- Honeypot field (bot-submissions पकड़ने के लिए)
- Rate-limiting by IP/session
- Duplicate detection (एक व्यक्ति बार-बार भरे तो नई row नहीं)
- Suppression-list check — unsubscribed व्यक्ति कभी किसी sequence में दोबारा नहीं जाएगा

### `customer_context` Table Schema (सिर्फ़ AI memory — कभी commercial/ownership data नहीं)
```
lead_id
primary_source_channel      ← (rename: कई channels से आ सकता है, यह मुख्य/पहला स्रोत है)
conversation_summary
business_context
requirements
pain_points
audit_summary
audit_recommendations
last_summary
updated_at
```

---

## STAGE 2 — Sequence & Escalation Engine ✅ (बन चुका, एक guard जोड़ना बाक़ी)

### Nurture Sequences (source के हिसाब से अलग)
- **Audit leads:** 24h → 96h → 168h, 3 automated मेल
- **Cold prospects:** पहले company-research (AI website पढ़े), फिर personalized पहला मेल, controlled cadence (10–20/day), **audit-leads के साथ कभी mix नहीं**

### Stop-Conditions (पूरी सूची)
```
Reply आया
Call booked
Human ने manually contact कर लिया     ← नया, ज़रूरी guard
Proposal भेजी गई
Won
Lost
Unsubscribed
Email Bounce
```
"Human contacted" सबसे ज़रूरी नया guard है — बिना इसके, आप ख़ुद जिससे बात कर चुके हों, उसे automated मेल फिर भी जा सकती थी।

---

## STAGE 3 — Offline Onboarding & Execution Loop ⭐ (अगला बनने वाला हिस्सा)

*चूँकि DigiXPro high-ticket advisory है (Paddle से खुद-ब-खुद बिकने वाला product नहीं), यही असली revenue-engine है।*

### सही State Machine (Won ≠ Payment मिलना — यह अंतर बहुत ज़रूरी है)
```
Discovery Call
   ↓
Deal Won (आप मैन्युअल मार्क करते हैं — Level 3)
   ↓
Commercial Confirmation
   ↓
Invoice भेजी गई        (invoice_status: sent)
   ↓
Payment Confirmed      (payment_status: paid)  ← Onboarding यहीं से शुरू, "Won" से नहीं
   ↓
Onboarding शुरू
```

### Onboarding Sequence (payment confirm होने के बाद)
```
Day 0 (payment confirm होते ही):
  → "Welcome & Kickoff" मेल + अगले कदम साफ़ बताना

Day 1:
  → सही Notion Portal Template duplicate होकर client के लिए बनता है
  → Portal access-link मेल

Day 3:
  → "Required Assets & Documents" checklist (service-specific)
  → कुछ न आया तो Day 5 पर एक gentle auto-reminder

Project चलते समय (milestone-based, fixed दिन नहीं):
  → हर बड़े milestone पर एक अपडेट मेल (Level 2 — AI draft, आप approve)

Delivery पूरी होने पर:
  → "Delivery Confirmation" मेल
  → 48h बाद structured feedback-form (rating + comments +
    permission_to_publish फ़ील्ड सहित)

Feedback आने पर:
  → धन्यवाद मेल
  → Testimonial सिर्फ़ तभी माँगा जाए जब आप ख़ुद feedback देखकर
    approve करें (AI का "अच्छा लगा तो माँग लो" वाला auto-decision कभी नहीं)
  → Feedback डेटा सीधे Weekly Intelligence में जाता है
```

### Notion Portal Templates (सादा — dynamic-engine नहीं, बस सही template चुनना)
1. Website/Design projects template
2. AI Automation/Process Automation projects template
3. Advisory/IT Consulting projects template
4. Branding/Creative projects template

हर template में सेक्शन: Project Overview, Timeline, Content/Assets, Credentials, Review, Delivery।

> **नोट (architecture-lock के लिए blocker नहीं, पर technical-spec बनाते वक़्त तय होंगे):**
> - Client को Notion guest-access कैसे मिलेगा
> - कौन-से sections client देख सकता है
> - Sensitive credentials **कभी Notion में स्टोर नहीं होंगे** (कहाँ रखे जाएँगे, यह अलग से तय होगा — जैसे किसी password-manager में)
> - Portal duplication fail हो जाए तो fallback क्या होगा
> - Client invite accept न करे तो क्या होगा (reminder cadence)

### `customer_lifecycle` Table Schema (Commercial/Project State — memory से बिल्कुल अलग)
```
lead_id
deal_status                     (Won / Lost)
deal_won_at
service_purchased
invoice_status                  (sent / paid / failed / partial / refunded)
payment_status
onboarding_stage                (Day0 / Day1 / Day3 / InProgress / Delivered / FeedbackPending / Complete)
portal_url
assigned_to                     ← यहीं रहेगा, customer_context में कभी नहीं
project_status
delivery_date
feedback_rating
feedback_permission_to_publish
testimonial_status
call_booked_at                  ← अलग timestamp
call_completed_at               ← अलग timestamp (deal_won_at से अलग)
```
(भविष्य में एक व्यक्ति के कई calls होने लगें, तभी अलग `call_events` table बनेगी — अभी ज़रूरत नहीं।)

---

## STAGE 4 — Weekly Intelligence

*⚠️ जान-बूझकर रोका गया है — जब तक Stage 3 से असली lifecycle/onboarding data जमा न हो जाए, इसे बनाना बेकार होगा (नकली/ख़ाली data पर intelligence नहीं चलेगी)।*

हर हफ़्ते इन सबको मिलाकर पढ़ा जाएगा: AI Assist chats, audit submissions, email replies, cold-outbound responses, discovery-call outcomes (booked/completed अलग गिनकर), Won/Lost reasons, customer feedback (Stage 3 से)। **n8n के execution logs को कभी "customer intelligence" नहीं माना जाएगा।**

**निकाला जाएगा:** Top Pain Points, Top Questions, Top Objections, Services Explored, Lost Reasons, Content Opportunities।

---

## STAGE 5 — Content Generation (Dual-AI, मज़बूत Editorial Gate)

*(Stage 4 की तरह अभी रोका गया)*

Topic पहले असली customer-language से निकलेगा (Stage 4 से), फिर बाहरी validation:
- **Google Trends** — सिर्फ़ validation-signal (कभी sole topic-generator नहीं — कोई official API नहीं है, unofficial library/paid service चाहिए होगी)
- **Answer The Public (Pro, API-automation confirmed)** — related-questions/search-language expansion

**Groq (Maker):** long-form article + derivatives (LinkedIn, Facebook, short-post, FAQ, email-insight)

**Gemini (Checker, विस्तृत editorial भूमिका):** factual accuracy, brand voice (sakshi bhav, zero I/me/my), technical accuracy, no fabricated claims, DigiXPro positioning, SEO intent, customer-problem alignment

---

## STAGE 6 — Distribution Network (विस्तारित)

मूल model हमेशा: **digixpro.in पर original article पहले (canonical/primary source)** → बाक़ी सब सिर्फ़ पहुँच बढ़ाने के लिए (ranking-hack नहीं)।

### A. Website Blog
digixpro.in पर पहला/असली publish (CMS decision अभी बाक़ी — नीचे "Parked Items" देखें)

### B. Social Media
मौजूदा Groq→Gemini→Image pipeline reuse, Telegram approval, LinkedIn + Facebook

### C. Syndication (Supplementary, guaranteed SEO-mechanism नहीं)
Medium, Blogger, WordPress.com — **सही भाषा:** "Syndication supplementary distribution है; canonical/attribution settings वहीं लागू होंगी जहाँ platform यह सुविधा देता है। Primary SEO asset हमेशा digixpro.in का original article रहेगा — syndication traffic-diversification के लिए है।" 1-2 contextual backlinks, mass-link-dump कभी नहीं।

### D. Community/Q&A Platforms (सिर्फ़ Quora-Reddit तक सीमित नहीं — सभी relevant platforms, एक जैसा governance)
```
असली customer समस्या (Stage 4 से)
   ↓
संबंधित platform पर मौजूद असली सवाल/चर्चा ढूँढना
   ↓
Platform की rules/guidelines check करना
   ↓
AI genuinely useful, zero-fluff जवाब draft करे
   ↓
Human approval (Telegram/Notion)
   ↓
Publish
   ↓
Comments/reactions monitor करना (वापस Stage 4 में feed होगा)
```
शामिल हो सकते हैं (topic/industry अनुसार चुनना, सब पर एक साथ नहीं): Quora, Reddit (relevant subreddits), Indie Hackers, Hacker News (genuinely तकनीकी चर्चा वाली जगह), relevant LinkedIn Groups, Stack Exchange (तकनीकी सवाल), industry-specific forums/Slack-Discord communities। **यह सब community/authority channels हैं, कभी SEO-backlink channels नहीं।** मास auto-posting कभी नहीं।

### E. Guest Posts
relevant sites identify → relevance/guidelines check → topic-proposal → human approval → outreach → accepted होने पर article → published-URL record

### F. PDF / Lead-Magnets
best articles से checklist/framework/guide, legitimate document-platforms पर useful-resource के तौर पर (spam-dump नहीं)

---

## STAGE 7 — Dashboard (Notion, विस्तृत Human Command Center)

- **Leads:** New / Qualified / Nurture / Call Booked / Call Completed / Proposal / Won / Lost
- **Customers:** Payment Status / Onboarding Stage / Assets Pending / In Progress / Delivered / Feedback
- **Content:** Idea / Research / Draft / Review / Approved / Published
- **Distribution:** LinkedIn / Facebook / Guest Post / Community Platforms / PDF — हर एक की अपनी status
- **Human Approval Queue:** सबसे ज़रूरी सेक्शन — Reddit/Quora/community drafts, testimonial requests, guest-post pitches — सब यहीं इंतज़ार करेंगे

Notion कभी "source of truth" नहीं है — यह सिर्फ़ human-facing view है, असली डेटा `customer_context` और `customer_lifecycle` में रहता है।

---

## Data Model सारांश (3 अलग चीज़ें, कभी न मिलें)

| Table | किसके लिए | कभी नहीं होना चाहिए |
|---|---|---|
| `customer_context` | AI memory (बातचीत, ज़रूरतें, pain-points) | कोई commercial/ownership field नहीं |
| `customer_lifecycle` | Deal/project/payment/call state | AI memory डेटा नहीं |
| Notion Dashboard | सिर्फ़ human-facing view, दोनों tables से पढ़ता है | ख़ुद कोई "source of truth" नहीं |

---

## Parked Items (locked नहीं, scope से बाहर भी नहीं)

1. **Paddle-lite digital delivery:** अभी कोई digital product मौजूद नहीं (Canva kits वाला प्लान अभी नहीं बिक रहा) — जब कोई digital product असल में बिकने लायक़ बने, तभी एक अलग, छोटे sub-project के तौर पर डिज़ाइन होगा
2. **Blog CMS decision:** digixpro.in के वर्तमान Next.js/no-CMS सेटअप में blog कैसे publish होगा (Sanity लाना है या नहीं) — यह तय करना अभी बाक़ी है

---

## Build Order (Approved)

1. ✅ Stage 1 (Memory Foundation) — बन चुका
2. ✅ Stage 2 (Sequence Engine) — बन चुका, **"human-contacted" guard जोड़ना बाक़ी**
3. ⭐ **Stage 3 (Offline Onboarding) — अगला, क्योंकि सीधे revenue से जुड़ा**
4. Stage 4-5 (Intelligence + Content) — **जान-बूझकर रोका गया** जब तक Stage 3 से असली lifecycle/onboarding data जमा न हो जाए
5. Stage 6-7 (Distribution + Dashboard) — Content तैयार होते ही साथ-साथ

---

*Document version: v4 — Locked. Corrections इसमें शामिल: (1) `source_channel` → `primary_source_channel` rename, (2) call-events को अलग timestamps में तोड़ना, (3) Notion Portal के operational सवाल technical-spec के लिए टाले गए (architecture-lock के लिए blocker नहीं), (4) syndication की भाषा से "guaranteed SEO mechanism" वाला ग़लत दावा हटाया गया।*
