# DigiXPro — Brand Voice, Content & Entity Rules (Permanent, बिना पुष्टि बदलें नहीं)

यह फ़ाइल हर नए पेज/कॉपी-राइटिंग टास्क से पहले पढ़ी जाए। यह content-strategy.md से अलग है —
वहां *क्या* बनाना है (slugs/keywords), यहां *कैसे* लिखना है।

## 1. लेखन-नियम (सख़्ती से लागू, सभी पेजों पर)

- **"I", "me", "my" कभी इस्तेमाल न करें** — dropped-subject declarative construction (sakshi philosophy)।
  ग़लत: "I help founders make technology decisions"
  सही: "Founders are helped in making clear technology decisions" / passive-observational tone
- CV-स्टाइल क्रेडेंशियल (डिग्री, पुराने टीचिंग-पद, honorary title की व्याख्या) prose-bio में नहीं —
  सिर्फ़ structured Education/Certifications फ़ील्ड (LinkedIn-जैसी जगह) में।
- फ़ीस-आधारित बनाम फ़ीस-रहित काम पर कोई भी मिशन-वाक्य पब्लिश न करें — यह सिर्फ़ internal/conversation-only है।

## 2. गुरु/आध्यात्मिक-पहचान नियम

- **gyanmarg.guru और गुरु का नाम (Shri Tarun Pradhan ji) LinkedIn या digixpro.in के किसी सामान्य/sitewide पब्लिक पेज (जैसे PersonSchema) पर नहीं आएगा।**
- **तथ्य-सटीकता:** gyanmarg.guru पर भूमिका **"teacher" (शिक्षक)** है, **"founder" नहीं** — Muktibodh पत्रिका गुरु (Shri Tarun Pradhan ji) के तत्वावधान में प्रकाशित होती है, इसे कभी भी "founder of gyanmarg.guru" जैसे ग़लत दावे के तौर पर न लिखें।
- **अपवाद:** digixpro.in के design-services/branding-services "About/E-E-A-T" सेक्शन पर ही यह strategically इस्तेमाल हो सकता है, वहां भी सिर्फ़ trust-building context में, guru-status का सीधा दावा नहीं, और "teacher under Shri Tarun Pradhan ji's guidance" जैसी सटीक भाषा में।
- nirvandham.in पर टीम-प्रोफ़ाइल असली, लाइव URL है: `https://www.nirvandham.in/tatv/ajay` — अभी वहां सिर्फ़ "अजय" (बिना सरनेम, बिना digixpro.in लिंक) है; यह nirvandham.in साइड का पेंडिंग बदलाव है (digixpro.in कोडबेस का हिस्सा नहीं), जब मौक़ा मिले वहां "Ajay Shukla" + digixpro.in लिंक जुड़वाएं ताकि entity-graph दोनों तरफ़ से पूरा हो।

## 3. Entity/Schema Consistency (Person Schema — E-E-A-T)

`PersonSchema.tsx` के `sameAs` array में यह लिंक हमेशा साथ रहें:
- LinkedIn: `linkedin.com/in/ajay-shukla-digixpro`
- nirvandham.in टीम-प्रोफ़ाइल
- gyanmarg.guru प्रोफ़ाइल (अगर पब्लिकली लिंक-योग्य हो)

नाम हर जगह एक जैसा — "Ajay Shukla" (न कि सिर्फ़ "Ajay", न "Dr. Ajay Shukla" कभी-कभी, कभी सिर्फ़ "Ajay" — inconsistency Google के entity-recognition को तोड़ती है)।

## 4. Track-वार टोन

- **Technology Advisory (/advisory hub):** गंभीर, एनालिटिकल, enterprise-सलाहकार टोन — मौजूदा "Independent Architecture Advisory" वाली भाषा जारी रहे।
- **Design Services (/design-services hub):** थोड़ा गर्म, portfolio-प्रूफ़-हेवी, पर फिर भी "I" नहीं — dropped-subject बना रहे, सिर्फ़ टोन गर्म हो, ग्रामर-नियम नहीं बदलेगा।

## 5. WordPress पोज़िशनिंग (Website Design Services पेज विशेष)

- "WordPress" शब्द सर्विस-लिस्टिंग/हेडलाइन/pricing-भाषा में नहीं आएगा।
- सिर्फ़ एक FAQ-आइटम या सपोर्टिंग सेक्शन में तुलना की जगह है: *"WordPress से आगे क्यों?"*
- मुख्य पॉज़िटिव-भाषा: "custom-built", "modern JS-stack", "Next.js-powered" — negative-framing ("WordPress alternative") कभी हेडलाइन में नहीं।

## 6. हमेशा बाहर रखें

- numerologybasics.net, trueajay.in — इन्हें किसी भी नए कंटेंट में मत जोड़ें, ये बंद/अप्रासंगिक हैं।

## 7. Dark/Light Mode व Bilingual (i18n) — नए स्थायी नियम (अगस्त 2026 से लागू)

- **हर नया कंपोनेंट/पेज dark-mode-रेडी लिखा जाए** — कोई भी hardcoded `bg-white`/`text-black` जैसा रंग सीधे न हो, OKLCH token-आधारित `dark:` variant साथ में हो। यह अभी तक बने पुराने कंपोनेंट्स पर retroactively लागू नहीं (अलग टास्क), पर हर नया पेज/एडिट इसी नियम से बने।
- **Hindi अनुवाद (Phase B/C) पर भी सेक्शन 1 का "कोई 'मैं/मुझे/मेरा' नहीं" नियम पूरी सख़्ती से लागू होगा** — अंग्रेज़ी "We evaluate..." का हिंदी अनुवाद स्वाभाविक रूप से "मैं मूल्यांकन करता हूं" जैसा first-person बन सकता है अगर स्पष्ट न किया जाए। हिंदी में भी dropped-subject/passive-observational निर्माण अनिवार्य है (जैसे "मूल्यांकन किया जाता है", "founders को मदद मिलती है")।
- **English कंटेंट को सीधे JSX में hardcode न करें आगे से** — नए पेज/कॉपी next-intl के translation-key पैटर्न में लिखे जाएं (भले अभी सिर्फ़ English message-file भरी हो), ताकि Phase B में दोबारा-refactor न करना पड़े।

## 8. तथ्य-सत्यापन — स्थायी, गैर-परक्राम्य नियम (अगस्त 2026 से लागू)

**कोई भी specific संख्या, percentage, ₹-रेंज, या "statistic" किसी भी कंटेंट (blog, service-page, schema) में तब तक नहीं जोड़ी जाएगी जब तक उसका असली स्रोत सत्यापित न हो।**

- अगर कोई आंकड़ा किसी बाहरी/इंडस्ट्री रिसर्च से है (जैसे "ERP failure rate") — असली स्रोत का नाम + साल कंटेंट में साथ लिखना अनिवार्य है (जैसे "Source: Panorama Consulting Group, 2025 ERP Report")। बिना स्रोत के कोई भी % या आंकड़ा लिखना पूर्णतः वर्जित है।
- अगर कोई आंकड़ा DigiXPro की अपनी सेवा/pricing के बारे में है (जैसे retainer-cost, turnaround-time) — यह सिर्फ़ तभी लिखा जाए जब Ajay ने ख़ुद वह संख्या स्पष्ट रूप से कन्फ़र्म की हो। किसी भी हालत में pricing/turnaround/किसी भी ऑपरेशनल दावे का अनुमान लगाकर लिखना वर्जित है — प्लेसहोल्डर नंबर भी नहीं।
- अनिश्चितता की स्थिति में हमेशा safe, गैर-specific भाषा चुनें ("consultation-based pricing," "scoped after discovery call," "typically") — ग़लत specific संख्या से बेहतर है सही, सामान्य भाषा।
- यह नियम "trust सबसे बड़ी संपत्ति है" वाले सिद्धांत पर आधारित है — किसी भी अपुष्ट तथ्य का प्रकाशन एक trust-violation माना जाएगा, छोटी ग़लती नहीं।
