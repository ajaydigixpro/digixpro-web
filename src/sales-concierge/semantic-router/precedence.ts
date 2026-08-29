import { RoutingResult, VisitorSessionState } from './types';

export function evaluateTier0Precedence(
  text: string,
  sessionId: string,
  currentPage?: string,
  session?: VisitorSessionState
): RoutingResult | null {
  const norm = text.trim().toLowerCase();

  // Language Detection (Hindi / Hinglish / English)
  const isHindi = /\b(mujhe|apni|karwana|karwani|chahiye|karni|banwani|meri|kitna|hoga|ab|kaise|kya|yahan|hai|hoon|namaste)\b/i.test(norm);

  // =========================================================================
  // HARD SCRIPT #1 & PHASE 4 DECISION INTELLIGENCE RULES
  // =========================================================================

  if (
    /\b(how long have you been doing this|how long has digixpro|how long have you been in business|how many years of experience|tell me how long digixpro)\b/i.test(norm)
  ) {
    return makeResult(text, norm, "FAM-10", "INTENT-10-GREETING", "DigiXPro Heritage & 2016 Credibility.", sessionId, false, currentPage, isHindi);
  }

  if (session?.primary_intent === 'WEB' && norm.includes("not sure — help me decide")) {
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-PURPOSE", "Web Purpose Discovery.", sessionId, false, currentPage, isHindi);
  }

  // Contextual Follow-up Query Guard (Preserve active journey & route to contextual clarification)
  if (
    session && (session.primary_intent || session.collected_context?.traffic || session.existing_website || session.original_goal) &&
    /\b(how do i know|can you check|what (exactly )?would you look at|can you start small|would shopify be enough|why (would|do) i need custom|spend (money )?on seo|website itself be causing|what would you need from us|can you guarantee|figure out first)\b/i.test(norm)
  ) {
    return makeResult(text, norm, session.primary_intent === 'SEO' ? "FAM-01" : session.primary_intent === 'WEB' ? "FAM-02" : session.primary_intent === 'AUTO' ? "FAM-03" : session.primary_intent === 'CTO' ? "FAM-04" : "FAM-06", "INTENT-CONTEXTUAL-CLARIFY", "Contextual Follow-up Query.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(if this were your (own )?business|what would you do if this were your business|what would you do if this were your own business|what would you do in my position|what would you do first\??|what would you do first|what would you recommend|what would you do\??|what would you do|what should i do|someone told me|can you actually help me decide|help me decide whether rebuilding)\b/i.test(norm)
  ) {
    if (session?.primary_intent === 'SEO' || session?.collected_context?.traffic === 'none') {
      return makeResult(text, norm, "FAM-03", "INTENT-01-SEO-NOTRAFFIC", "Search Visibility & Indexation Diagnosis.", sessionId, false, currentPage, isHindi);
    }
    if (session?.primary_intent === 'WEB') {
      return makeResult(text, norm, "FAM-02", "INTENT-02-WEB", "Capability: Web Engineering.", sessionId, false, currentPage, isHindi);
    }
    if (session?.primary_intent === 'AUTO') {
      return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO-CRM", "Workflow Bottleneck: CRM Automation.", sessionId, false, currentPage, isHindi);
    }
    if (session?.primary_intent === 'CTO') {
      return makeResult(text, norm, "FAM-04", "INTENT-04-CTO", "Capability: Technology Advisory.", sessionId, false, currentPage, isHindi);
    }
    if (session) session.primary_intent = 'AUDIT';
    return makeResult(text, norm, "FAM-06", "INTENT-06-AUDIT-INTAKE", "Direct Senior Consultant Recommendation.", sessionId, true, currentPage, isHindi);
  }

  // 0. Consultation Booking Request
  if (
    /\b(book a 30-minute call|book the 30-minute call|book 30 min call|book 30-minute call|30-minute architecture call|book a call|book consultation)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'BOOKING';
    return makeResult(text, norm, "FAM-08", "INTENT-08-BOOKING", "Booking Consultation Request.", sessionId, true, currentPage, isHindi);
  }

  // 0. Human Handoff Request (Highest Precedence)
  if (
    /^(i'd rather discuss (it|this) with a human|i want to speak to a human|can i talk to (the )?founder|can someone review this with me|speak to a human|talk to an engineer|can i speak with a human|i want to speak with a real technical person|commercial proposal)$/i.test(norm) ||
    /\b(rather discuss with a human|talk to the founder|speak to a human|talk to a human|human handoff|talk to an engineer|speak to an engineer|don't want to talk to a chatbot|don't want to continue with a chatbot|speak with a real technical person|real technical person|speak to human|talk to human|rather speak to a human|commercial proposal|discuss scope and investment|review our proposal with me|discuss investment with me|i know exactly what i need|want to discuss the project|discuss our project|discuss the project|discuss my project|can i talk to someone|talk to someone|speak to someone|speak to a person|talk to a person|can i talk to a person)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'BOOKING';
    return makeResult(text, norm, "FAM-08", "INTENT-08-BOOKING", "Human Handoff Request.", sessionId, true, currentPage, isHindi);
  }

  // Explicit Decision Summary Request
  if (
    /\b(summarize what you think my situation is|summarize my situation|summary of my situation|summarize what we discussed|what do you think my situation is)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'AUDIT';
    return makeResult(text, norm, "FAM-06", "INTENT-DECISION-SUMMARY", "Explicit Situation Summary Request.", sessionId, true, currentPage, isHindi);
  }

  // Recommendation Revision & Multi-Turn Problem Switches
  if (
    /\b(manually entered into our crm|manually copies every lead into the crm|manually copy|manual crm entry|handles them manually|crm entry is manual|manual crm|leads are copied manually|copied manually|manually copied|crm is the problem|leads are handled manually|handled manually|leads handled manually)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'AUTO';
      session.multi_service_intents = session.multi_service_intents || [];
      if (!session.multi_service_intents.includes('AUTO')) session.multi_service_intents.push('AUTO');
    }
    return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO-CRM", "Workflow Bottleneck: CRM Automation.", sessionId, false, currentPage, isHindi);
  }

  if (session?.primary_intent === 'AUTO' && /\b(do we need a new website|need a new website|what would you fix first)\b/i.test(norm)) {
    return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO-CRM", "Workflow Automation Priority over Rebuild.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(nobody finds us on google|google ranking is poor|our current seo is poor)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'SEO';
    return makeResult(text, norm, "FAM-01", "INTENT-01-SEO", "Search Visibility Revision.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(people just don't enquire|hardly any enquiries|traffic is good.*don't enquire|5,000 visitors.*hardly any enquiries|should i buy more seo|buy more seo|should i spend more on seo|would you still spend money on seo|still spend money on seo|we have an existing website|have an existing website|we have a website|have a website|we already have a website|already have a website|existing website.*enquiries|visitors but no.*enquiries|visitors but no patient enquiries|no patient enquiries|leads are low|leads low|low leads)\b/i.test(norm) ||
    ((session?.collected_context?.traffic === 'plenty' || session?.existing_website || session?.primary_intent === 'AUDIT') && /\b(we need more enquiries|need more enquiries|want more enquiries|let's continue)\b/i.test(norm))
  ) {
    if (session) {
      session.existing_website = true;
      session.primary_intent = 'AUDIT';
    }
    return makeResult(text, norm, "FAM-06", "INTENT-06-AUDIT-INTAKE", "Conversion Bottleneck Audit Revision.", sessionId, true, currentPage, isHindi);
  }

  if (
    /\b(cheapest|what's the cheapest|cheapest option|lowest price|cheapest you can do)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'PRICE';
    return makeResult(text, norm, "FAM-05", "INTENT-05-PRICE", "Scope-Based Investment Inquiry.", sessionId, true, currentPage, isHindi);
  }

  if (
    /\b(i want the audit|start the audit|give me the audit|get the audit|let's do the audit|do the audit|take me to audit|audit my current website|audit my current site|audit my site|do i actually need a new website|if i actually need a new website|improve what's there|just improve what's there|improve our current site|fix what's there|think we should rebuild|should we rebuild|need to rebuild it|don't know whether seo is|is seo really the problem|think we should rebuild it|maybe seo isn't the problem|seo isn't the problem|seo is not the problem|maybe seo isn't the problem either|whether rebuilding|rebuilding is necessary|rebuilding is even necessary)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'AUDIT';
    return makeResult(text, norm, "FAM-06", "INTENT-06-AUDIT-INTAKE", "Explicit Audit Action Request.", sessionId, true, currentPage, isHindi);
  }

  if (
    /\b(evaluating a custom website design|seo-ready web engineering|custom website design, website redesign|small business website|small business websites|custom web application|custom web applications|landing page design|landing page for our ad|landing page for ad)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB", "Capability: Web Engineering.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(it consulting|technology strategy|digital transformation|legacy system modernization|legacy monolith portal|software architecture review|architecture review|technical architecture|vendor evaluation|technology due diligence|fractional cto|review of a (software )?vendor proposal|review vendor proposal|vendor proposal review)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'CTO';
    return makeResult(text, norm, "FAM-04", "INTENT-04-CTO", "Capability: Technology Advisory.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(existing website seo audit|existing website seo|seo for existing website|apni website ka seo|website ka seo karwana hai)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'SEO';
    return makeResult(text, norm, "FAM-01", "INTENT-01-SEO-EXISTING", "SEO Discovery Answer: Existing Website Audit.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(new website seo setup|new website seo|seo for new website)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'SEO';
    return makeResult(text, norm, "FAM-01", "INTENT-01-SEO-NEW", "SEO Discovery Answer: New Website Setup.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(google rankings|google ranking)\b/i.test(norm) && session?.primary_intent === 'SEO'
  ) {
    return makeResult(text, norm, "FAM-01", "INTENT-01-SEO-RECOMMEND", "SEO Discovery Answer: Target Goal.", sessionId, false, currentPage, isHindi);
  }

  if (
    /^(actually, i need a new website\.|actually, i need a website\.|actually i need a website)$/i.test(norm)
  ) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB", "Explicit Topic Switch to Web Engineering.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(lead capture & crm sync|lead capture crm sync|automate form leads|form leads into crm|lead capture & crm|lead capture and crm|ai lead capture)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'AUTO';
      session.multi_service_intents = session.multi_service_intents || [];
      if (!session.multi_service_intents.includes('AUTO')) session.multi_service_intents.push('AUTO');
    }
    return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO-CRM", "Lead Capture & CRM Sync.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(whatsapp follow-ups|whatsapp|follow-up automation|follow-ups for people who enquire)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'AUTO';
      session.multi_service_intents = session.multi_service_intents || [];
      if (!session.multi_service_intents.includes('AUTO')) session.multi_service_intents.push('AUTO');
    }
    return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO-INTEGRATE", "Lead Capture & WhatsApp Automation Integration.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(show me proof|how does that prove|how does this prove|how does that help|show me the case study|show the case study|open the case study|show case study|show me evidence|show evidence)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'EVIDENCE';
    return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE", "Evidence Capability Verification.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(what would you actually check|what would you check|what do you check|what will this tell me|what would you check first)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'AUDIT';
    return makeResult(text, norm, "FAM-06", "INTENT-06-AUDIT-WHY", "Consultative Diagnostic Criteria Explanation.", sessionId, true, currentPage, isHindi);
  }

  if (
    /\b(cheapest site|cheapest option|cheapest site possible|cheapest solution|cheapest thing|give me a rough idea|rough idea of price|rough estimate|ballpark|can you just build the website|just build the website|what am i paying for|what exactly am i paying for|what do i pay for|budget of|1 lakh|unnecessary things|agency selling us)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'PRICE';
      session.commercial_sensitivity = 'avoid_unnecessary_scope';
    }
    return makeResult(text, norm, "FAM-05", "INTENT-05-PRICE", "Cheapest Site Commercial Inquiry Interrupt.", sessionId, true, currentPage, isHindi);
  }

  // Semantic Decision Concept 1: Traffic Exists + Conversion / Enquiry Deficit
  const hasTrafficTerm = /\b(traffic|visitors|visit|rank|ranks|google|search)\b/i.test(norm);
  const hasLowEnquiryTerm = /\b(no enquiries|few enquiries|no calls|nobody calls|no one calls|leads poor|leads are poor|enquiries weak|enquiries are weak|little business|don't contact|nobody contacts|hardly anyone contacts|low conversion|conversion is poor)\b/i.test(norm);
  if (hasTrafficTerm && hasLowEnquiryTerm) {
    if (session) {
      session.primary_intent = 'AUDIT';
      session.collected_context = {
        ...session.collected_context,
        existing_quality: 'conversion'
      };
    }
    return makeResult(text, norm, "FAM-06", "INTENT-06-AUDIT-INTAKE", "Conversion vs Traffic Bottleneck Diagnosis.", sessionId, true, currentPage, isHindi);
  }

  if (
    /\b(sattvaos|sattva os|sattvaos case study|enterprise due diligence case study|enterprise due diligence example|enterprise due diligence proof|software due diligence case study|vendor due diligence case study)\b/i.test(norm)
  ) {
    if (session) {
      session.industry = 'advisory';
      session.primary_intent = 'CTO';
    }
    return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-CTO", "Contextual Evidence: SattvaOS Enterprise Due Diligence Case Study.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(digital magazine|magazine|publishing|editorial|editors|publish articles)\b/i.test(norm)
  ) {
    if (session) {
      session.business_type = 'editorial';
      session.industry = 'publishing';
    }
    return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-EDITORIAL", "Contextual Evidence: Editorial & Digital Magazine Case Study.", sessionId, false, currentPage, isHindi);
  }

  // Semantic Decision Concept 2: Healthcare & Small Business Stemming
  if (
    /\b(local business|small business|physio|physiotherapist|physiotherapy|clinic|doctor|dentist|dental|healthcare|medical|therapist|therapy)\b/i.test(norm)
  ) {
    if (session) {
      session.business_type = 'small_business';
      session.industry = 'healthcare';
    }
    return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-SMALLBIZ", "Contextual Evidence: Healthcare & Local Business Case Study.", sessionId, false, currentPage, isHindi);
  }

  // Semantic Decision Concept 3: Small E-Commerce Scope
  if (
    /\b(30 products|50 products|online store|few products|small catalog|basic order|no marketplace|simple store)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'WEB';
      session.industry = 'ecommerce';
      session.collected_context = {
        ...session.collected_context,
        catalogue_scale: 'small'
      };
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-RECOMMEND", "Standard E-Commerce Web Engineering.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(cheapest site|cheapest option|cheapest site possible|cheapest solution|cheapest thing|give me a rough idea|rough idea of price|rough estimate|ballpark|can you just build the website|just build the website|what am i paying for|what exactly am i paying for|what do i pay for)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'PRICE';
    return makeResult(text, norm, "FAM-05", "INTENT-05-PRICE", "Cheapest Site Commercial Inquiry Interrupt.", sessionId, true, currentPage, isHindi);
  }

  if (
    /\b(suppose the audit|if the audit|what happens if the audit|what if the audit|if my website is fine|trying to sell me|sell me a website|salesperson|sales pitch|what if the problem isn't the website|problem isn't the website|does that prove|guarantee patients|prove you'll get|guarantee results)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'AUDIT';
    return makeResult(text, norm, "FAM-06", "INTENT-06-AUDIT-HONEST", "Independent Diagnostic Honesty Guarantee.", sessionId, true, currentPage, isHindi);
  }

  if (
    /\b(what do i actually need|what do i need|what do we actually need)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'AUDIT';
    return makeResult(text, norm, "FAM-06", "INTENT-02-CONSULTANT-DIRECT", "Direct Consultant Synthesis.", sessionId, true, currentPage, isHindi);
  }

  if (
    /\b(vendor proposal evaluation|proposal evaluation)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'CTO';
    return makeResult(text, norm, "FAM-04", "INTENT-04-CTO-STAGE", "Technology Advisory: Vendor Proposal Stage.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(spend \d+ lakh|20 lakh|software platform|software proposal|vendor proposal|vendor says|independently review|review the proposal|it consulting services|it consulting|technology strategy|it strategy|erp consultant|erp software)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'CTO';
      session.collected_context = {
        ...session.collected_context,
        spend: '20_lakh'
      };
    }
    return makeResult(text, norm, "FAM-04", "INTENT-04-ADVISORY-DIRECT", "Technology Advisory & Independent Due Diligence.", sessionId, true, currentPage, isHindi);
  }

  if (
    /\b(website design services|web design services|graphic design service|branding services)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-NAV-DESIGN", "Custom Website Design & Web Engineering Services.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(ai automation agency|ai automation|ai consulting services|ai consulting)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'AUTO';
    return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO-CRM", "AI Search & Workflow Automation Pipeline.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(what is this page about|what is this page|what is on this page|explain this page)\b/i.test(norm)
  ) {
    return makeResult(text, norm, "FAM-04", "INTENT-PAGE-EXPLAIN", "Direct Page Explanation Request.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(online magazine|publishing platform|publishing company|magazine|editorial|articles|editors)\b/i.test(norm)
  ) {
    if (session) {
      session.industry = 'publishing';
      session.business_type = 'editorial';
    }
  }

  if (
    /\b(30 products|sell 30 products|online store|ecommerce|e-commerce|marketplace)\b/i.test(norm)
  ) {
    if (session) {
      session.industry = 'ecommerce';
      session.business_type = 'ecommerce';
    }
  }

  if (
    /\b(physiotherapy clinic|physiotherapy|clinic|patient enquiries|patients)\b/i.test(norm)
  ) {
    if (session) {
      session.industry = 'healthcare';
      session.business_type = 'small_business';
    }
  }

  if (
    /\b(why did you send me here|why am i here|what should i look at here|what should i look at|i've opened it|opened it|what do i look at|why send me here|what next|what's next|what do i do next)\b/i.test(norm)
  ) {
    if (currentPage && (currentPage === '/audit' || currentPage.startsWith('/audit'))) {
      return makeResult(text, norm, "FAM-06", "INTENT-PAGE-EXPLAIN-AUDIT", "Page Continuity: Systems Audit.", sessionId, false, currentPage, isHindi);
    }
    if (currentPage && (currentPage === '/design-services' || currentPage.startsWith('/design-services'))) {
      return makeResult(text, norm, "FAM-02", "INTENT-PAGE-CONTEXT", "Page Continuity: Design Services.", sessionId, false, currentPage, isHindi);
    }
    if (currentPage && (currentPage === '/search-automation' || currentPage.startsWith('/search-automation'))) {
      return makeResult(text, norm, "FAM-03", "INTENT-PAGE-CONTEXT", "Page Continuity: Search & Automation.", sessionId, false, currentPage, isHindi);
    }
    if (currentPage && (currentPage === '/advisory' || currentPage.startsWith('/advisory'))) {
      return makeResult(text, norm, "FAM-04", "INTENT-PAGE-CONTEXT", "Page Continuity: Advisory.", sessionId, false, currentPage, isHindi);
    }
    if (currentPage && currentPage.startsWith('/evidence')) {
      if (currentPage.includes('dr-aggarwal') || session?.industry === 'healthcare' || session?.business_type === 'small_business') {
        return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-SMALLBIZ", "Page Continuity: Dr. Aggarwal Evidence.", sessionId, false, currentPage, isHindi);
      }
      return makeResult(text, norm, "FAM-07", "INTENT-PAGE-CONTEXT", "Page Continuity: Evidence Vault.", sessionId, false, currentPage, isHindi);
    }
  }

  if (
    /\b(seo & traffic growth case studies|seo case studies|seo case study|seo evidence)\b/i.test(norm) ||
    (session?.primary_intent === 'EVIDENCE' && /\b(seo|traffic|rankings)\b/i.test(norm))
  ) {
    if (session) {
      session.primary_intent = 'EVIDENCE';
      session.industry = 'seo';
    }
    return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-SEO", "Evidence Filter: SEO Case Study.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(publishing|magazine|e-magazine|editorial|articles|news site|journal)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'EVIDENCE';
      session.industry = 'publishing';
    }
    return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-PUBLISHING", "Evidence Filter: Publishing & Editorial Case Study.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(ecommerce|e-commerce|online store|online shop|buy online|marketplace|sell books|books|listing books|other sellers|5,000 products|multiple sellers)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'EVIDENCE';
      session.industry = 'ecommerce';
    }
    return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-REDESIGN", "Evidence Filter: E-commerce & Marketplace Redesign Case Study.", sessionId, false, currentPage, isHindi);
  }

  // 1. Explicit Direct Navigation Commands (Highest Precedence)
  if (
    /^(take me to (the )?audit|open (the )?audit|i want (to see )?(the )?audit|show me (the )?audit|go to audit|i need a site audit|site audit)$/i.test(norm) ||
    /\b(take me to the audit|open the audit|i want to see the audit|take me to audit|need a site audit|site audit)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'AUDIT';
    return makeResult(text, norm, "FAM-06", "INTENT-06-AUDIT-INTAKE", "Direct Navigation Command: Audit.", sessionId, true, currentPage, isHindi);
  }
  if (
    /^(show me (the )?design services( page)?|take me to (the )?design services|open design services|go to design services)$/i.test(norm) ||
    /\b(show me design services|show me design services page|take me to design services)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-NAV-DESIGN", "Direct Navigation Command: Design Services.", sessionId, false, currentPage, isHindi);
  }
  if (
    /^(take me to (the )?advisory( page)?|show me (the )?advisory( page)?|open advisory|go to advisory)$/i.test(norm) ||
    /\b(take me to advisory|show me advisory|take me to advisory page|show me advisory page)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'CTO';
    return makeResult(text, norm, "FAM-04", "INTENT-04-NAV-ADVISORY", "Direct Navigation Command: Advisory.", sessionId, false, currentPage, isHindi);
  }
  if (
    /^(take me to (the )?search( &| and)? automation|show me (the )?search( &| and)? automation|open search automation|go to search automation)$/i.test(norm) ||
    /\b(take me to search & automation|show me search & automation|show me search and automation|show me seo and search automation|open search automation)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'SEO';
    return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO-NAV", "Direct Navigation Command: Search & Automation.", sessionId, false, currentPage, isHindi);
  }
  if (
    /^(why\??|why an audit first|why do you recommend an audit|why audit first|why start with an audit)$/i.test(norm) ||
    /\b(why an audit first|why do you recommend an audit|why audit first|why start with an audit)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'AUDIT';
    return makeResult(text, norm, "FAM-06", "INTENT-06-AUDIT-WHY", "Consultative Answer: Why Audit First.", sessionId, true, currentPage, isHindi);
  }
  if (
    /\b(how is this different from asking the vendor|different from asking the vendor|different from vendor|why not ask the vendor|why not just trust the vendor|trust the vendor)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'CTO';
    return makeResult(text, norm, "FAM-04", "INTENT-04-CTO-VENDOR-DIFF", "Consultative Answer: Independent CTO vs Vendor Bias.", sessionId, false, currentPage, isHindi);
  }
  if (
    /^(what next\??|what's next\??|what should i do next\??|ok, what next\??|okay, what next\??)$/i.test(norm) ||
    /\b(what next|what's next|what should i do next|ok what next|okay what next)\b/i.test(norm)
  ) {
    if (session?.primary_intent === 'CTO') {
      return makeResult(text, norm, "FAM-08", "INTENT-08-HANDOFF", "Next Action: Architecture Consultation.", sessionId, true, currentPage, isHindi);
    }
    if (session?.primary_intent === 'AUTO' || session?.multi_service_intents?.includes('SEO')) {
      return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO-NAV", "Next Action: Search & Automation.", sessionId, false, currentPage, isHindi);
    }
    if (session?.diagnostic_uncertainty || session?.primary_intent === 'AUDIT') {
      return makeResult(text, norm, "FAM-06", "INTENT-02-WEB-RECOMMEND-DIAGNOSTIC", "Next Action: Systems Audit.", sessionId, false, currentPage, isHindi);
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-NAV-DESIGN", "Next Action: Design Services.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(build seo into the website from the beginning|build seo from the beginning|seo into the website|build seo into the new site)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-01-SEO-BUILTIN", "Consultative Answer: Built-In SEO Architecture.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(enquiries to reach our crm|reach our crm|crm sync|crm pipeline|lead capture to crm|crm automation|could we also automate|automate some of this|automate lead capture)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'AUTO';
      session.multi_service_intents = session.multi_service_intents || [];
      if (!session.multi_service_intents.includes('AUTO')) session.multi_service_intents.push('AUTO');
    }
    return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO-INTEGRATE", "Lead Capture & CRM Automation Integration.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(show me redesign case study|redesign case study|redesign proof)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'EVIDENCE';
    return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-REDESIGN", "Direct Evidence Request: Redesign Case Study.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(show me an example of what you mean|example of what you mean|show an example of what you mean|show me an example|show an example|give me an example|show me something you've actually built|show me something built|something you've built)\b/i.test(norm)
  ) {
    if (session?.industry === 'publishing') {
      return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-PUBLISHING", "Contextual Evidence: Publishing Example.", sessionId, false, currentPage, isHindi);
    }
    if (session?.business_type === 'small_business' || session?.industry === 'healthcare' || session?.commercial_sensitivity === 'avoid_unnecessary_scope') {
      return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-SMALLBIZ", "Contextual Evidence: Small Business Example.", sessionId, false, currentPage, isHindi);
    }
    if (session?.primary_intent === 'CTO') {
      return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-CTO", "Contextual Evidence: Advisory Example.", sessionId, false, currentPage, isHindi);
    }
    if (session?.primary_intent === 'SEO' || session?.multi_service_intents?.includes('SEO')) {
      return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-SEO", "Contextual Evidence: SEO Example.", sessionId, false, currentPage, isHindi);
    }
    return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE", "Contextual Evidence Request.", sessionId, false, currentPage, isHindi);
  }

  // 2. Commercial / Pricing Interrupt (High Precedence)
  if (
    /^(how much (does a website cost|would this cost|does it cost|do you charge)\??|what('s| is) (your price|the price|the cost|the budget)\??|pricing kitni hai\??|fee kitni hai\??)$/i.test(norm) ||
    /\b(how much does a website cost|how much would this cost|what is your price|pricing kitni hai|how much do you charge|how much would this normally cost|how much would a website like this cost)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'PRICE';
    return makeResult(text, norm, "FAM-05", "INTENT-05-PRICE", "Scope-Based Investment Inquiry Interrupt.", sessionId, true, currentPage, isHindi);
  }

  if (
    /\b(would you agree with them|would you agree|do you agree with them|do you agree)\b/i.test(norm)
  ) {
    if (session) {
      session.existing_website = true;
      session.diagnostic_uncertainty = true;
    }
    return makeResult(text, norm, "FAM-06", "INTENT-02-WEB-REBUILD-VERIFY", "Developer Rebuild Claim Verification.", sessionId, true, currentPage, isHindi);
  }
  if (
    /\b(physiotherapy clinic|physio clinic|local clinic|health clinic)\b/i.test(norm)
  ) {
    if (session) {
      session.business_type = 'small_business';
      session.collected_context = {
        ...session.collected_context,
        business_type: 'small_business'
      };
    }
  }
  if (
    /\b(book marketplace|secondhand book|online book)\b/i.test(norm)
  ) {
    if (session) {
      session.project_type = 'REDESIGN';
      session.collected_context = {
        ...session.collected_context,
        web_project_type: 'redesign'
      };
    }
  }
  if (
    /\b(care more about enquiries|want more enquiries|care about leads|enquiries matter more|care more about leads)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'WEB';
      session.collected_context = {
        ...session.collected_context,
        existing_quality: 'conversion'
      };
    }
    return makeResult(text, norm, "FAM-06", "INTENT-02-WEB-QUALIFY-CONVERSION", "Traffic vs Conversion Bottleneck Qualification.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(what makes your approach different|what makes digixpro different|how is your approach different|why digixpro|what makes you different)\b/i.test(norm)
  ) {
    return makeResult(text, norm, "FAM-12", "INTENT-12-VALUEPROP", "DigiXPro Value Proposition.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(independent technology vendor architecture evaluation|vendor architecture evaluation|technology vendor evaluation)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'CTO';
      session.collected_context = {
        ...session.collected_context,
        primary_intent: 'CTO'
      };
    }
  }
  if (
    /\b(tell me that|actually tell me that|would you actually tell me)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'AUDIT';
    return makeResult(text, norm, "FAM-06", "INTENT-06-AUDIT-HONEST", "Independent Diagnostic Honesty Guarantee.", sessionId, true, currentPage, isHindi);
  }
  if (
    /\b(seo|search engine optimization|google ranking|google rankings|google search visibility|rank on google|ranking on google|google ranking improve|seo improve|ranking improve|google ranking kaise badhaye|seo kaise kare)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'SEO';
      session.collected_context = {
        ...session.collected_context,
        seo_goal: 'rankings'
      };
    }
    return makeResult(text, norm, "FAM-03", "INTENT-01-SEO", "Search Visibility & Indexation Requirement.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(get almost no google traffic|no google traffic|have no traffic|no search traffic)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'SEO';
      session.collected_context = {
        ...session.collected_context,
        traffic: 'none'
      };
    }
    return makeResult(text, norm, "FAM-03", "INTENT-01-SEO-NOTRAFFIC", "Search Visibility & Indexation Diagnosis.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(get thousands of visitors|thousands of visitors|plenty of traffic|decent amount of google traffic|not many people contact us|don't get many enquiries|not getting many enquiries|few enquiries|few people contact us)\b/i.test(norm)
  ) {
    if (session) {
      if (session.collected_context?.traffic !== 'none') {
        session.primary_intent = 'WEB';
      }
      session.diagnostic_uncertainty = true;
    }
    return makeResult(text, norm, "FAM-06", "INTENT-02-WEB-QUALIFY-CONVERSION", "Traffic vs Conversion Bottleneck Qualification.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(looks terrible on mobile|terrible on mobile|outdated design|dated on mobile|looks dated|website is old|old website)\b/i.test(norm)
  ) {
    if (session) {
      session.existing_website = true;
      session.collected_context = {
        ...session.collected_context,
        existing_quality: 'terrible_mobile'
      };
    }
    if (/\b(what would you do|what would you do first|what should we do first|what would you recommend|don't want an agency selling me|don't want a rebuild|i think we should rebuild|should we rebuild)\b/i.test(norm)) {
      if (session) session.primary_intent = 'AUDIT';
      return makeResult(text, norm, "FAM-06", "INTENT-02-CONSULTANT-DIRECT", "Direct Consultant Synthesis for Mobile Redesign Uncertainty.", sessionId, true, currentPage, isHindi);
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-REDESIGN", "Mobile UX & Redesign Quality Requirement.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(happy with the design|happy with design|happy with mobile)\b/i.test(norm)
  ) {
    if (session) {
      session.existing_website = true;
      session.collected_context = {
        ...session.collected_context,
        existing_quality: 'happy_mobile'
      };
    }
    return makeResult(text, norm, "FAM-06", "INTENT-02-WEB-REBUILD-UNCERTAIN", "Existing Website Rebuild Necessity Assessment.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(do we need a rebuild|need a rebuild|rebuild necessary|is a rebuild really necessary)\b/i.test(norm)
  ) {
    if (session?.collected_context?.existing_quality === 'happy_mobile') {
      return makeResult(text, norm, "FAM-06", "INTENT-02-WEB-REBUILD-UNCERTAIN", "Existing Website Rebuild Necessity Assessment.", sessionId, false, currentPage, isHindi);
    }
    if (session?.collected_context?.existing_quality === 'terrible_mobile') {
      return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-REDESIGN", "Mobile UX & Redesign Quality Requirement.", sessionId, false, currentPage, isHindi);
    }
  }
  if (
    /\b(budget isn't really a constraint|budget is not a constraint|no budget constraint)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'WEB';
      session.commercial_sensitivity = 'unlimited_budget';
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-PLATFORM", "Enterprise Scale Platform Engineering.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(five-page local business website|five page website|five page local business)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'WEB';
      session.business_type = 'small_business';
      session.collected_context = {
        ...session.collected_context,
        business_type: 'small_business',
        web_project_type: 'small_business_site'
      };
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-QUALIFY-EXISTING", "Small Business Next.js Architecture.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(marketplace with vendor accounts|vendor accounts, payments|marketplace with vendor|admin system)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'WEB';
      session.project_type = 'NEW_WEBSITE';
      session.collected_context = {
        ...session.collected_context,
        web_project_type: 'custom_platform'
      };
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-PLATFORM", "Complex Custom Platform Engineering.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(would you build this with next\.js|build this with next\.js|why next\.js)\b/i.test(norm)
  ) {
    if (session?.collected_context?.web_project_type === 'custom_platform') {
      return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-PLATFORM", "Complex Custom Platform Architecture.", sessionId, false, currentPage, isHindi);
    }
    return makeResult(text, norm, "FAM-02", "INTENT-01-SEO-BUILTIN", "Small Business Next.js Architecture.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(i have no website|have no website|no website at all)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-NEW", "Initial Web Engineering Discovery.", sessionId, false, currentPage, isHindi);
  }

  if (
    /\b(if this were your (own )?business|what would you do if this were your business|what would you do if this were your own business|what would you do in my position|what would you do\??)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'AUDIT';
    return makeResult(text, norm, "FAM-06", "INTENT-02-CONSULTANT-DIRECT", "Direct Senior Consultant Recommendation.", sessionId, true, currentPage, isHindi);
  }
  if (
    /\b(get a decent amount of google traffic|hardly anyone contacts us|get traffic but nobody contacts|get traffic but no enquiries|does that mean we need seo)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-QUALIFY-CONVERSION", "Traffic vs Conversion Bottleneck Qualification.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(developer says we need to rebuild|developer says the site is old|developer says site is old|how would you decide whether they're right|is a rebuild really necessary)\b/i.test(norm)
  ) {
    if (session) {
      session.existing_website = true;
      session.diagnostic_uncertainty = true;
    }
    return makeResult(text, norm, "FAM-06", "INTENT-02-WEB-REBUILD-VERIFY", "Developer Rebuild Claim Verification.", sessionId, true, currentPage, isHindi);
  }
  if (
    /\b(not (very )?technical|don't (really )?care (whether|if) it's|just want a website that brings|just want customers)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-NONTECH", "Non-Technical Client Outcome Orientation.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(what would you look at first|what would you evaluate first|what would you inspect first|what should we look at first)\b/i.test(norm)
  ) {
    if (session) {
      session.existing_website = true;
      session.diagnostic_uncertainty = true;
    }
    return makeResult(text, norm, "FAM-06", "INTENT-02-WEB-RECOMMEND-DIAGNOSTIC", "Diagnostic Bottleneck Determination.", sessionId, true, currentPage, isHindi);
  }
  if (
    /\b(expensive custom website|do we really need all that|do we really need all of that|money is tight)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'AUDIT';
    return makeResult(text, norm, "FAM-06", "INTENT-06-AUDIT-WHY", "Consultative Answer: Scope Justification.", sessionId, true, currentPage, isHindi);
  }
  if (
    /\b(which one should we do first|which should we do first|what should we do first)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'WEB';
      session.multi_service_intents = ['WEB', 'SEO'];
    }
    return makeResult(text, norm, "FAM-02", "INTENT-01-SEO-NEW-WEB", "Website & SEO Dependency Sequence.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(what exactly could you independently check|independently check|what could you check)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'CTO';
    return makeResult(text, norm, "FAM-04", "INTENT-04-NAV-ADVISORY", "Vendor Proposal Due Diligence Scope.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(what have you actually done|what have you done|anyone can say they know this stuff)\b/i.test(norm)
  ) {
    if (session?.primary_intent === 'CTO') {
      return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-CTO", "Evidence Filter: Advisory Case Studies.", sessionId, false, currentPage, isHindi);
    }
    return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE", "Evidence Filter.", sessionId, false, currentPage, isHindi);
  }
  if (
    /\b(before doing anything, i'd rather know what's wrong|know what's wrong|rather know what's wrong)\b/i.test(norm)
  ) {
    if (session) {
      session.existing_website = true;
      session.diagnostic_uncertainty = true;
    }
    return makeResult(text, norm, "FAM-06", "INTENT-02-WEB-RECOMMEND-DIAGNOSTIC", "Diagnostic Bottleneck Determination.", sessionId, true, currentPage, isHindi);
  }

  // 3. SEO for Existing Website (Traffic Poor, Don't Want to Rebuild)
  if (
    /\b(traffic from google is poor|don't want to rebuild the site|help with seo|can you help with seo|improve rankings without rebuilding|i want to improve rankings)\b/i.test(norm)
  ) {
    if (session) session.primary_intent = 'SEO';
    return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO-NAV", "SEO Optimization for Existing Website.", sessionId, false, currentPage, isHindi);
  }

  // 4. Website + SEO Integration (Don't Hurt Google Rankings)
  if (
    /\b(don't want the new site to hurt google rankings|hurt google rankings|seo is equally important|website and seo)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'WEB';
      session.multi_service_intents = ['WEB', 'SEO'];
    }
    return makeResult(text, norm, "FAM-02", "INTENT-01-SEO-NEW-WEB", "Website & SEO Architecture Integration.", sessionId, false, currentPage, isHindi);
  }

  // 5. Complex Custom Platform Engineering
  if (
    /\b(user accounts|custom workflows|more like a platform|fairly complex business|complex web application|saas platform)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'WEB';
      session.project_type = 'NEW_WEBSITE';
      session.collected_context = {
        ...session.collected_context,
        web_project_type: 'custom_platform'
      };
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-PLATFORM", "Complex Custom Platform Engineering.", sessionId, false, currentPage, isHindi);
  }

  // 6. Diagnostic Uncertainty (Website rebuild vs redesign uncertainty, bottleneck determination)
  if (
    /\b(not sure whether i need a redesign or rebuild|redesign or rebuild|don't know (if|whether) the problem is|problem is the website or|not getting enough enquiries|site looks okay|problem is the website or our google visibility|not sure whether rebuilding|rebuilding is necessary|rebuild is necessary|problem is design, seo or something else|honestly don't know whether|tell me where i should start|where i should start|tell me where to start|assess what is wrong|just assess what is wrong)\b/i.test(norm)
  ) {
    if (session) {
      session.existing_website = true;
      session.diagnostic_uncertainty = true;
      session.collected_context = {
        ...session.collected_context,
        existing_website: 'true',
        diagnostic_uncertainty: 'true'
      };
    }
    return makeResult(text, norm, "FAM-06", "INTENT-02-WEB-RECOMMEND-DIAGNOSTIC", "Diagnostic Bottleneck Determination.", sessionId, false, currentPage, isHindi);
  }

  // 7. Redesign Qualification (Explicit redesign request or outdated site without rebuild uncertainty)
  if (
    !/\b(redesign or rebuild|redesign or rebuilding)\b/i.test(norm) &&
    /\b(redesign|looks outdated|website works, but it looks outdated|still get enquiries|don't think we need a completely new platform|would you redesign it)\b/i.test(norm)
  ) {
    if (session) {
      session.primary_intent = 'WEB';
      session.project_type = 'REDESIGN';
      session.existing_website = true;
      session.collected_context = {
        ...session.collected_context,
        web_project_type: 'redesign',
        existing_website: 'true'
      };
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-REDESIGN", "Redesign Qualification.", sessionId, false, currentPage, isHindi);
  }

  // 7. Multi-Service Visitor Requirement
  if (
    !/\b(existing website seo audit|new website seo setup|seo for existing website|seo for new website)\b/i.test(norm) &&
    ((/\b(website|web design|web)\b/i.test(norm) && /\b(seo|google|search ranking)\b/i.test(norm)) ||
    /\b(i need a website,? seo,? and automation|website and seo|website and google ranking)\b/i.test(norm))
  ) {
    if (session) {
      session.multi_service_intents = ['WEB', 'SEO'];
      session.collected_context = {
        ...session.collected_context,
        multi_service: 'true'
      };
    }
    return makeResult(text, norm, "FAM-13", "INTENT-13-MULTI-SERVICE", "Multi-Service Visitor Prioritization.", sessionId, false, currentPage, isHindi);
  }

  // 4. Small Business Scope & Cost Sensitivity Constraint
  if (
    /\b(don't want to spend|spend money on things|don't actually need|avoid unnecessary spend|avoid overspending|don't want to pay for things|only want what i need|limited budget|small business)\b/i.test(norm)
  ) {
    if (session) {
      session.commercial_sensitivity = 'avoid_unnecessary_scope';
      session.collected_context = {
        ...session.collected_context,
        commercial_sensitivity: 'avoid_unnecessary_scope'
      };
    }
  }

  // Turn 1: Initial Web Uncertainty ("considering a new website, but not really sure what I need yet")
  if (
    /\b(considering a new website|not (really )?sure what i need|not sure what i need|don't know what i need)\b/i.test(norm) &&
    !session?.business_type
  ) {
    if (session) {
      session.primary_intent = 'WEB';
      session.diagnostic_uncertainty = true;
      session.collected_context = {
        ...session.collected_context,
        diagnostic_uncertainty: 'true'
      };
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-UNCERTAIN", "Initial Web Uncertainty Acknowledgment.", sessionId, false, currentPage, isHindi);
  }

  // Small Business Qualification & Context Tracking
  if (
    /\b(small business|small local business|local business)\b/i.test(norm)
  ) {
    if (session) {
      session.business_type = 'small_business';
      session.collected_context = {
        ...session.collected_context,
        business_type: 'small_business'
      };
    }
  }
  if (
    /\b(don't want unnecessary spend|don't want to spend|avoid unnecessary spend|avoid overspending)\b/i.test(norm)
  ) {
    if (session) {
      session.commercial_sensitivity = 'avoid_unnecessary_scope';
      session.collected_context = {
        ...session.collected_context,
        commercial_sensitivity: 'avoid_unnecessary_scope'
      };
    }
  }

  // Turn 2: Small business + enquiry generation + cost/scope sensitivity (DO NOT assume existing website yet!)
  if (
    /\b(don't want to spend|spend money on things|don't actually need|avoid unnecessary spend|avoid overspending|small business and i don't want|unnecessary spend)\b/i.test(norm) ||
    (/\b(small business|small local business|local business)\b/i.test(norm) && /\b(enquiries|enquiry|more enquiries)\b/i.test(norm))
  ) {
    if (session) {
      session.primary_intent = 'WEB';
      session.business_type = 'small_business';
      session.business_objective = 'lead_generation';
      session.commercial_sensitivity = 'avoid_unnecessary_scope';
      session.collected_context = {
        ...session.collected_context,
        business_type: 'small_business',
        business_objective: 'lead_generation',
        commercial_sensitivity: 'avoid_unnecessary_scope'
      };
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-QUALIFY-EXISTING", "Small Business Enquiry Focus with Scope Sensitivity.", sessionId, false, currentPage, isHindi);
  }

  // Turn 3: "What would you recommend I figure out first?" or "We already have a website. What would you recommend I do first?"
  if (
    /^(what would you recommend( i)? (figure out|do)( first)?\??|what (should|do) i (figure out|do)( first)?\??|what do you recommend\??)$/i.test(norm) ||
    /\b(what would you recommend|what should i figure out first|what to figure out first|what would you recommend i do first)\b/i.test(norm)
  ) {
    if (session?.existing_website || /\b(already have a|have a) website\b/i.test(norm)) {
      return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-RECOMMEND-DIAGNOSTIC", "Direct Consultant Recommendation: Establish Bottleneck First.", sessionId, false, currentPage, isHindi);
    }
    if (session?.primary_intent === 'WEB' || session?.business_type === 'small_business' || /website|web/i.test(session?.original_goal || '')) {
      return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-RECOMMEND-DIAGNOSTIC", "Direct Consultant Recommendation: Establish Bottleneck First.", sessionId, false, currentPage, isHindi);
    }
  }

  // Turn 4: "We already have a basic website, but honestly I'm not sure whether rebuilding it is even necessary."
  if (
    /\b(already have a basic website|already have a website|have a basic website|rebuilding it is even necessary|whether rebuilding|rebuilding is necessary|rebuild is necessary|not sure whether i need a redesign or rebuild)\b/i.test(norm)
  ) {
    if (session) {
      session.existing_website = true;
      session.diagnostic_uncertainty = true;
      session.collected_context = {
        ...session.collected_context,
        existing_website: 'true',
        diagnostic_uncertainty: 'true'
      };
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-REBUILD-UNCERTAIN", "Existing Website Rebuild Necessity Assessment.", sessionId, false, currentPage, isHindi);
  }

  // Turn 5: "If I show you the current site, can you help me decide whether redesign or rebuilding makes more sense?"
  if (
    /\b(show you the current site|current site|help me decide whether redesign or rebuilding|redesign or rebuilding|redesign or rebuild)\b/i.test(norm)
  ) {
    return makeResult(text, norm, "FAM-06", "INTENT-02-WEB-DIAGNOSTIC-INTAKE", "Diagnostic Site Evaluation Request.", sessionId, true, currentPage, isHindi);
  }

  // Context-Aware Evidence Requests & Filters
  if (
    /^(show me proof|show me evidence|show proof|show me your work|proof|case studies|portfolio|our work|show case studies and portfolio|proof dekhao)$/i.test(norm) ||
    /\b(show me proof|show me evidence|show proof|show me your work|case studies and portfolio|proof dekhao|show me evidence that|evidence that digixpro)\b/i.test(norm)
  ) {
    if (session?.primary_intent === "CTO" || /advisory|vendor|architecture/i.test(norm)) {
      return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-CTO", "Evidence Filter: Advisory Case Studies.", sessionId, false, currentPage, isHindi);
    }
    if (session?.collected_context?.web_project_type === 'redesign' || session?.existing_website || session?.last_intent === 'INTENT-02-WEB-REDESIGN') {
      return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-REDESIGN", "Evidence Filter: Redesign & Rebuild Evidence.", sessionId, false, currentPage, isHindi);
    }
    if (session?.business_type === 'small_business' || session?.business_objective === 'lead_generation') {
      return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-SMALLBIZ", "Evidence Filter: Small Business Lead Growth Evidence.", sessionId, false, currentPage, isHindi);
    }
    if (session?.primary_intent === "SEO" || /seo/i.test(norm)) {
      return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-SEO", "Evidence Filter: SEO Case Studies.", sessionId, false, currentPage, isHindi);
    }
    if (session?.primary_intent === "WEB" || /web/i.test(norm)) {
      return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-WEB", "Evidence Filter: Web Application Evidence.", sessionId, false, currentPage, isHindi);
    }
    return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE", "Evidence Filter.", sessionId, false, currentPage, isHindi);
  }

  if (/^(actually,|instead,)?\s*(i think the website needs fixing|website needs fixing|website needs work|fix the website|i need a website|i need a new website|i am evaluating a custom website|evaluating a custom website|i need website redesign|i need a website redesign|i need seo|i need automation|i need tech advisory|nayi website chahiye|seo karwana hai|website redesign karwani hai)\b/i.test(norm) || /\b(website needs fixing|fix the website|website needs work)\b/i.test(norm)) {
    if (/seo/i.test(norm)) {
      if (session) session.primary_intent = 'SEO';
      return makeResult(text, norm, "FAM-01", "INTENT-01-SEO", "Explicit Topic Switch to SEO.", sessionId, false, currentPage, isHindi);
    }
    if (/redesign/i.test(norm)) {
      if (session) {
        session.primary_intent = 'WEB';
        session.project_type = 'REDESIGN';
        session.existing_website = true;
        session.collected_context = {
          ...session.collected_context,
          web_project_type: 'redesign',
          existing_website: 'true'
        };
      }
      return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-REDESIGN", "Explicit Redesign Discovery.", sessionId, false, currentPage, isHindi);
    }
    if (/website|web/i.test(norm)) {
      if (session) session.primary_intent = 'WEB';
      return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-NEW", "Initial Web Engineering Discovery.", sessionId, false, currentPage, isHindi);
    }
    if (/automation/i.test(norm)) {
      if (session) session.primary_intent = 'AUTO';
      return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO", "Explicit Topic Switch to Automation.", sessionId, false, currentPage, isHindi);
    }
    if (/advisory|cto/i.test(norm)) {
      if (session) session.primary_intent = 'CTO';
      return makeResult(text, norm, "FAM-04", "INTENT-04-CTO", "Explicit Topic Switch to Advisory.", sessionId, false, currentPage, isHindi);
    }
  }

  // Direct Page Explanation Queries
  if (
    /^(what is this page about\??|explain this page\??|what page is this\??|about this page\??|is page par kya hai\??)$/i.test(norm) ||
    /\b(what is this page about|explain this page|about this page|is page par kya hai)\b/i.test(norm)
  ) {
    return makeResult(text, norm, "FAM-12", "INTENT-PAGE-EXPLAIN", "Direct Page Explanation Query.", sessionId, false, currentPage, isHindi);
  }

  // Contextual Guidance & Destination Page Continuation
  if (
    /^(explore page kya karu yahan\??|what should i (look at|inspect)( here)?\??|what is relevant( for me)?( here)?\??|what (do|should) i do (next|here)\??|i don't understand this page\??|i saw it|what next\??|how does this apply to me\??|can you do this for me\??|explore page|main yahan kya dekhu\??|ab kya karna hai\??|ab yahan kya dekhna hai\??)$/i.test(norm) ||
    /\b(what should i look at|what should i inspect|what is relevant for me|what do i do next|i don't understand this page|i saw it|what next|how does this apply to me|can you do this for me|main yahan kya dekhu|ab kya karna hai|ab yahan kya dekhna hai)\b/i.test(norm) ||
    (/\b(search-automation|design-services|advisory|audit|evidence|contact|how-we-work)\b/i.test(norm) && /\b(kya karu|what to do|what should i do|here|yeha|now|explain|dekhu)\b/i.test(norm))
  ) {
    return makeResult(text, norm, "FAM-12", "INTENT-PAGE-CONTEXT", "Page-Aware Contextual Guidance.", sessionId, false, currentPage, isHindi);
  }

  // Navigation Actions
  if (/^(explore design services|web engineering \(\/design-services\)|explore \/design-services|explore advisory|explore \/advisory|explore search & automation|explore \/search-automation|explore seo framework recommendation|explore page)$/i.test(norm) || /\b(explore design services|explore advisory|explore seo framework recommendation)\b/i.test(norm)) {
    if (/advisory/i.test(norm)) {
      return makeResult(text, norm, "FAM-04", "INTENT-04-NAV-ADVISORY", "Advisory Navigation Click.", sessionId, false, currentPage, isHindi);
    }
    if (/seo|search/i.test(norm)) {
      return makeResult(text, norm, "FAM-01", "INTENT-01-SEO-RECOMMEND", "SEO Navigation Click.", sessionId, false, currentPage, isHindi);
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-NAV-DESIGN", "Design Services Navigation Click.", sessionId, false, currentPage, isHindi);
  }

  // Evidence Requests & Filters
  if (/^(show me proof|show me evidence|show proof|show me your work|proof|case studies|portfolio|our work|show case studies and portfolio|proof dekhao)$/i.test(norm) || /\b(show me proof|show me evidence|show proof|show me your work|case studies and portfolio|proof dekhao)\b/i.test(norm) || /^(seo & traffic growth case studies|web application production evidence|healthcare & medical case studies)$/i.test(norm)) {
    if (session?.primary_intent === "SEO" || /seo/i.test(norm)) {
      return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-SEO", "Evidence Filter: SEO Case Studies.", sessionId, false, currentPage, isHindi);
    }
    if (session?.primary_intent === "WEB" || /web/i.test(norm)) {
      return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE-WEB", "Evidence Filter: Web Application Evidence.", sessionId, false, currentPage, isHindi);
    }
    return makeResult(text, norm, "FAM-07", "INTENT-07-EVIDENCE", "Evidence Filter.", sessionId, false, currentPage, isHindi);
  }

  // Tech Advisory Discovery Answers
  if (/^(vendor proposal evaluation|software code & architecture audit|fractional cto strategy)$/i.test(norm) || /\b(vendor proposal evaluation|software code & architecture audit|fractional cto strategy)\b/i.test(norm)) {
    if (session) session.primary_intent = 'CTO';
    return makeResult(text, norm, "FAM-04", "INTENT-04-CTO-STAGE", "Advisory Discovery Answer: Project Stage.", sessionId, false, currentPage, isHindi);
  }
  if (/\b(technical quality & architecture|whether the proposal is fairly scoped|vendor capability & delivery risk|all of the above)\b/i.test(norm)) {
    if (session) session.primary_intent = 'CTO';
    return makeResult(text, norm, "FAM-04", "INTENT-04-CTO-PRIORITY", "Advisory Discovery Answer: Priority.", sessionId, false, currentPage, isHindi);
  }
  if (/\b(before signing the vendor|within the next 2 weeks|currently in active build)\b/i.test(norm)) {
    if (session) session.primary_intent = 'CTO';
    return makeResult(text, norm, "FAM-04", "INTENT-04-CTO-RECOMMEND", "Advisory Discovery Answer: Timeline.", sessionId, false, currentPage, isHindi);
  }

  // Web Engineering Discovery Answers
  if (/^(build a new website|website design & build|new website|build new website|i need a new website|new website banwani hai)$/i.test(norm) || /\b(build a new website|website design & build|new website build|i need a new website|need a new website|new website banwani hai)\b/i.test(norm)) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-NEW", "Web Discovery Answer: Build New Website.", sessionId, false, currentPage, isHindi);
  }
  if (/^(redesign my existing website|redesign existing website|website redesign|i need to redesign my existing website|website redesign karwani hai|i need a website redesign for an existing business)$/i.test(norm) || /\b(redesign my existing website|redesign existing website|website redesign|need to redesign|website redesign karwani hai)\b/i.test(norm)) {
    if (session) {
      session.primary_intent = 'WEB';
      session.project_type = 'REDESIGN';
      session.existing_website = true;
      session.collected_context = {
        ...session.collected_context,
        web_project_type: 'redesign',
        existing_website: 'true'
      };
    }
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-REDESIGN", "Web Discovery Answer: Redesign.", sessionId, false, currentPage, isHindi);
  }
  if (/^(not sure — help me decide|not sure|help me decide|i'm still not sure)$/i.test(norm) || /\b(not sure — help me decide|help me decide)\b/i.test(norm)) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-PURPOSE", "Web Discovery Answer: Help Me Decide.", sessionId, false, currentPage, isHindi);
  }
  if (/\b(business \/ corporate website|corporate website|e-commerce|marketplace|something more complex)\b/i.test(norm)) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-PURPOSE", "Web Discovery Answer: Project Type.", sessionId, false, currentPage, isHindi);
  }
  if (/\b(present my business|present business|generate more enquiries|generate enquiries|sell online|sell products|build credibility|explain complex services|support an existing sales process|something more specialised)\b/i.test(norm)) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-PRESENCE", "Web Discovery Answer: Purpose.", sessionId, false, currentPage, isHindi);
  }
  if (/\b(starting from scratch|from scratch|replacing a legacy system|replacing existing website)\b/i.test(norm)) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB-RECOMMEND", "Web Discovery Answer: Existing Presence.", sessionId, false, currentPage, isHindi);
  }

  // SEO Discovery Answers
  if (/^(new website seo setup|new website seo|seo for new website|nayi website ke liye seo|nayi website seo setup)$/i.test(norm) || /\b(new website seo setup|new website seo|nayi website ke liye seo|nayi website seo setup)\b/i.test(norm)) {
    if (session) session.primary_intent = 'SEO';
    return makeResult(text, norm, "FAM-01", "INTENT-01-SEO-NEW", "SEO Discovery Answer: New Website Setup.", sessionId, false, currentPage, isHindi);
  }
  if (/^(existing website seo audit|existing website seo|seo for existing website|existing website|apni website ka seo|website ka seo karwana hai)$/i.test(norm) || /\b(existing website seo audit|existing website seo|apni website ka seo|website ka seo karwana hai)\b/i.test(norm)) {
    if (session) session.primary_intent = 'SEO';
    return makeResult(text, norm, "FAM-01", "INTENT-01-SEO-EXISTING", "SEO Discovery Answer: Existing Website Audit.", sessionId, false, currentPage, isHindi);
  }
  if (/\b(google rankings|google ranking|ai search \(geo\) visibility|local google business profile|technical seo architecture|fix technical seo errors|google ranking improve)\b/i.test(norm)) {
    if (session) session.primary_intent = 'SEO';
    return makeResult(text, norm, "FAM-01", "INTENT-01-SEO-RECOMMEND", "SEO Discovery Answer: Target Goal.", sessionId, false, currentPage, isHindi);
  }

  // Automation Discovery Answers
  if (/^(lead capture & crm sync|automated whatsapp follow-ups|custom api & webhook pipelines)$/i.test(norm) || /\b(lead capture & crm sync|automated whatsapp follow-ups|custom api & webhook pipelines)\b/i.test(norm)) {
    if (session) session.primary_intent = 'AUTO';
    return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO-CRM", "Automation Discovery Answer: Process Type.", sessionId, false, currentPage, isHindi);
  }
  if (/\b(hubspot \/ salesforce|hubspot|salesforce|custom \/ notion \/ google sheets|planning a new crm setup)\b/i.test(norm)) {
    if (session) session.primary_intent = 'AUTO';
    return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO-RECOMMEND", "Automation Discovery Answer: CRM Platform.", sessionId, false, currentPage, isHindi);
  }

  // Actionable Audit Intake
  if (/\b(audit karwana hai|check site|speed audit|technical audit|i want an audit|start audit|website audit|free audit)\b/i.test(norm)) {
    if (session) session.primary_intent = 'AUDIT';
    return makeResult(text, norm, "FAM-06", "INTENT-06-AUDIT-INTAKE", "Actionable Diagnostic Audit Intake.", sessionId, true, currentPage, isHindi);
  }

  // Initial Capabilities Precedence
  if (/\b(existing website seo audit|existing website seo|seo for existing website|apni website ka seo|website ka seo karwana hai)\b/i.test(norm)) {
    if (session) session.primary_intent = 'SEO';
    return makeResult(text, norm, "FAM-01", "INTENT-01-SEO-EXISTING", "SEO Discovery Answer: Existing Website Audit.", sessionId, false, currentPage, isHindi);
  }
  if (/\b(evaluating a custom website design|custom website design|website redesign|custom website|web design|website build|build a website|web engineering)\b/i.test(norm)) {
    if (session) session.primary_intent = 'WEB';
    return makeResult(text, norm, "FAM-02", "INTENT-02-WEB", "Capability: Web Engineering.", sessionId, false, currentPage, isHindi);
  }
  if (/\b(fractional cto|cto|advisory|tech roadmap|vendor evaluation|architecture governance)\b/i.test(norm)) {
    if (session) session.primary_intent = 'CTO';
    return makeResult(text, norm, "FAM-04", "INTENT-04-CTO", "Capability: Fractional CTO & Advisory.", sessionId, false, currentPage, isHindi);
  }
  if (/\b(seo|technical seo|local seo|geo|search ranking|ai search|google ranking)\b/i.test(norm)) {
    if (session) session.primary_intent = 'SEO';
    return makeResult(text, norm, "FAM-01", "INTENT-01-SEO", "Capability: SEO & AI Search.", sessionId, false, currentPage, isHindi);
  }
  if (/\b(n8n|automation|workflow|lead capture automation|crm sync|api integration)\b/i.test(norm)) {
    if (session) session.primary_intent = 'AUTO';
    return makeResult(text, norm, "FAM-03", "INTENT-03-AUTO", "Capability: n8n Workflow Automation.", sessionId, false, currentPage, isHindi);
  }

  // Booking Call
  if (/\b(book call|schedule call|30 min call|meeting|speak to someone|i want to speak to someone|baat karni hai)\b/i.test(norm)) {
    if (session) session.primary_intent = 'BOOKING';
    return makeResult(text, norm, "FAM-08", "INTENT-08-BOOKING", "30-Minute Consultation Booking.", sessionId, true, currentPage, isHindi);
  }

  // Standalone Pricing Request
  if (/\b(aapki fee kitni hai|pricing kitni hai|how much cost|how much do you charge|retainer rates|pricing|cost|how much|budget kitna hoga)\b/i.test(norm)) {
    if (session) session.primary_intent = 'PRICE';
    return makeResult(text, norm, "FAM-05", "INTENT-05-PRICE", "Scope-Based Investment Inquiry.", sessionId, true, currentPage, isHindi);
  }

  // Greeting Welcome
  if (/^(hello|hi|hey|good morning|good afternoon|namaste|start)$/i.test(norm) || /\b(hello hi|hi there|hello concierge|namaste)\b/i.test(norm)) {
    return makeResult(text, norm, "FAM-10", "INTENT-10-GREETING", "Greeting Welcome.", sessionId, false, currentPage, isHindi);
  }

  return null;
}

function makeResult(
  input: string,
  normalized: string,
  family: string,
  intent: string,
  reason: string,
  sessionId: string,
  highRisk = false,
  currentPage?: string,
  isHindi = false
): RoutingResult {
  return {
    input,
    normalized_input: normalized,
    tier0_match: true,
    candidate_family: family,
    candidate_intent: intent,
    top1_score: 0.99,
    top2_score: 0.60,
    margin: 0.39,
    confidence_status: "HIGH",
    clarification_required: false,
    rejection_required: false,
    high_risk: highRisk,
    state_validation: true,
    routing_reason: `Tier-0 Precedence: ${reason}${isHindi ? ' [Hindi/Hinglish Detected]' : ''}`,
    prototype_reference: `CANONICAL-${intent}-RULE`,
    router_version: "v1.0",
    session_id: sessionId,
    current_page: currentPage,
    is_hindi: isHindi,
    detected_language: isHindi ? (/\b(meri|apni|mujhe|chahiye|hai|kya|yahan|banwani|karwani|karwana|karni|bada|diya)\b/i.test(normalized) ? 'hinglish' : 'hi') : 'en'
  };
}
