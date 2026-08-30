import { jsPDF } from 'jspdf';
import { FullRenderedReportContent } from './report-content-engine';

export interface AuditPdfInputData {
  audit_id: string;
  name: string;
  email: string;
  company: string;
  industry: string;
  product: string;
  market: string;
  website_url?: string;
  created_at?: string;
  compiled_report: FullRenderedReportContent;
}

export function generateAuditPdfBuffer(data: AuditPdfInputData): Buffer {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;

  const { compiled_report: report } = data;
  const auditDate = data.created_at || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  // --- PAGE 1: DIAGNOSIS & ANALYSIS ---

  // 1. Header Banner
  doc.setFillColor(15, 23, 42); // #0F172A Slate Dark
  doc.rect(0, 0, pageWidth, 80, 'F');

  doc.setFillColor(16, 185, 129); // #10B981 Emerald
  doc.rect(margin, 20, 140, 16, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('DIGIXPRO SYSTEMS AUDIT', margin + 8, 31);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Independent Technology Audit & Diagnosis', margin, 60);

  doc.setTextColor(148, 163, 184); // #94A3B8
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Audit ID: ${data.audit_id}`, pageWidth - margin - 150, 31);
  doc.text(`Date: ${auditDate}`, pageWidth - margin - 150, 46);

  let y = 98;

  // 2. Client Identity Box
  doc.setFillColor(248, 250, 252); // #F8FAFC
  doc.setDrawColor(226, 232, 240); // #E2E8F0
  doc.roundedRect(margin, y, contentWidth, 54, 6, 6, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`Prepared for:`, margin + 12, y + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.name || 'Client'} — ${data.company || 'Business'}`, margin + 80, y + 18);

  doc.setFont('helvetica', 'bold');
  doc.text(`Industry / Scope:`, margin + 12, y + 36);
  doc.setFont('helvetica', 'normal');
  const scopeText = `${data.industry || 'Commercial'}${data.website_url ? ` • ${data.website_url}` : ''}`;
  doc.text(scopeText.length > 60 ? scopeText.substring(0, 57) + '...' : scopeText, margin + 80, y + 36);

  y += 66;

  // 3. Section 1: Client Situation
  doc.setFillColor(236, 253, 245); // #ECFDF5 Light emerald
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(1);

  const situationLines = doc.splitTextToSize(report.client_situation || '', contentWidth - 24);
  const situationBoxHeight = Math.max(48, situationLines.length * 12 + 30);

  doc.roundedRect(margin, y, contentWidth, situationBoxHeight, 6, 6, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(6, 95, 70); // Dark emerald
  doc.text('1. CLIENT SITUATION SUMMARY', margin + 12, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(4, 120, 87);
  doc.text(situationLines, margin + 12, y + 32);

  y += situationBoxHeight + 14;

  // 4. Section 2: Primary Diagnosis
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y, contentWidth, 54, 6, 6, 'F');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('2. PRIMARY DIAGNOSIS', margin + 12, y + 16);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(report.primary_diagnosis || 'System Constraint Identified', margin + 12, y + 32);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  const verdictText = report.verdict_headline || '';
  doc.text(verdictText.length > 75 ? verdictText.substring(0, 72) + '...' : verdictText, margin + 12, y + 46);

  y += 66;

  // 5. Section 3: Why This Matters
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('3. WHY THIS MATTERS FOR YOUR BUSINESS', margin, y);
  y += 12;

  const whyLines = doc.splitTextToSize(report.why_it_matters || '', contentWidth);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(whyLines, margin, y);

  y += whyLines.length * 12 + 14;

  // 6. Section 4: Technical Evidence (CONDITIONAL)
  if (report.has_technical_evidence && report.technical_evidence) {
    const tech = report.technical_evidence;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`4. TECHNICAL AUDIT EVIDENCE — ${tech.url}`, margin, y);
    y += 12;

    // Score boxes
    const scoreItems: Array<{ label: string; score: number }> = [];
    if (tech.performance_score !== undefined && tech.performance_score !== null) {
      scoreItems.push({ label: 'Speed Performance', score: tech.performance_score });
    }
    if (tech.seo_score !== undefined && tech.seo_score !== null) {
      scoreItems.push({ label: 'Technical SEO', score: tech.seo_score });
    }
    if (tech.accessibility_score !== undefined && tech.accessibility_score !== null) {
      scoreItems.push({ label: 'Accessibility', score: tech.accessibility_score });
    }

    const count = Math.max(1, scoreItems.length);
    const cardW = (contentWidth - (count - 1) * 12) / count;

    scoreItems.forEach((s, idx) => {
      const cx = margin + idx * (cardW + 12);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(cx, y, cardW, 44, 4, 4, 'FD');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(s.label, cx + 10, y + 16);

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(s.score < 50 ? 220 : s.score < 80 ? 200 : 16, s.score < 50 ? 38 : s.score < 80 ? 120 : 185, 129);
      doc.text(`${s.score}/100`, cx + 10, y + 35);
    });

    y += 54;
  }

  // Page 1 Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('DigiXPro Systems Audit • Page 1 of 2', margin, pageHeight - 20);

  // --- PAGE 2: ACTION PLAN & RECOMMENDATIONS ---
  doc.addPage();
  y = 36;

  // Header Sub-Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 45, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('DigiXPro Systems Audit — Action Plan & Roadmap', margin, 28);
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(`Audit ID: ${data.audit_id}`, pageWidth - margin - 150, 28);

  y = 60;

  // 7. Section 5: What We Recommend
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('5. RECOMMENDED SYSTEM ARCHITECTURE', margin, y);
  y += 14;

  const recLines = doc.splitTextToSize(report.what_we_recommend || '', contentWidth);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(recLines, margin, y);

  y += recLines.length * 12 + 16;

  // 8. Section 6: What We Don't Recommend
  doc.setFillColor(254, 243, 199); // #FEF3C7 Soft amber
  doc.setDrawColor(251, 191, 36);
  doc.setLineWidth(1);

  const nonRecLines = doc.splitTextToSize(report.what_we_do_not_recommend || '', contentWidth - 24);
  const nonRecBoxH = Math.max(44, nonRecLines.length * 12 + 28);

  doc.roundedRect(margin, y, contentWidth, nonRecBoxH, 6, 6, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(146, 64, 14); // Dark amber
  doc.text('6. WHAT WE DO NOT RECOMMEND', margin + 12, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 83, 9);
  doc.text(nonRecLines, margin + 12, y + 30);

  y += nonRecBoxH + 12;

  // Section: Implementation & Scope Framework
  if (report.investment_framework) {
    const recLevel = report.investment_framework.levels.find(l => l.is_recommended) || report.investment_framework.levels[0];
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, 34, 4, 4, 'FD');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`RECOMMENDED IMPLEMENTATION SCOPE: ${recLevel.name.toUpperCase()}`, margin + 10, y + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const scopeLines = doc.splitTextToSize(recLevel.scope_summary, contentWidth - 20);
    doc.text(scopeLines[0] || '', margin + 10, y + 25);

    y += 40;
  }

  // 9. Section 7: Priority Implementation Roadmap
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('7. PRIORITY IMPLEMENTATION ROADMAP', margin, y);
  y += 14;

  const roadmap = report.priority_roadmap || [];
  roadmap.forEach((item) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 42, 4, 4, 'FD');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text(item.level.toUpperCase(), margin + 10, y + 14);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(item.title, margin + 10, y + 27);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    const descText = item.description || '';
    doc.text(descText.length > 70 ? descText.substring(0, 67) + '...' : descText, margin + 180, y + 27);

    y += 48;
  });

  y += 8;

  // 10. Section 8 & 9: Relevant Capability & Evidence
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`8. RELEVANT DIGIXPRO CAPABILITY: ${report.relevant_capability.service_name}`, margin, y);
  y += 14;

  if (report.has_relevant_evidence && report.relevant_evidence) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text(`9. VERIFIED CASE STUDY: ${report.relevant_evidence.label}`, margin, y);
    y += 16;
  }

  // 11. Section 10: 30-Minute Architecture Review CTA
  const ctaLines = doc.splitTextToSize(report.call_value_proposition || '', contentWidth - 32);
  const takeawayText = report.takeaway ? `Included Takeaway: ${report.takeaway}` : '';
  const takeawayDescLines = report.takeaway_description ? doc.splitTextToSize(report.takeaway_description, contentWidth - 32) : [];
  const ctaBoxH = Math.max(82, ctaLines.length * 11 + (takeawayText ? 56 + takeawayDescLines.length * 9 : 42));

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y, contentWidth, ctaBoxH, 8, 8, 'F');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  const ctaHeadingText = report.cta_heading ? `10. ${report.cta_heading.toUpperCase()}` : '10. YOUR NEXT STEP — 30-MINUTE ARCHITECTURE REVIEW';
  doc.text(ctaHeadingText, margin + 16, y + 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text(ctaLines, margin + 16, y + 34);

  let bottomOffset = y + ctaBoxH - 14;
  if (takeawayText) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(52, 211, 153);
    const takeawayY = y + 34 + ctaLines.length * 11 + 6;
    doc.text(takeawayText, margin + 16, takeawayY);

    if (takeawayDescLines.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(takeawayDescLines, margin + 16, takeawayY + 11);
    }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(16, 185, 129);
  doc.text(`Book Online: calendly.com/shukla-ajay05/30min`, margin + 16, bottomOffset);

  y += ctaBoxH + 12;

  // Disclaimer / Footer
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('DigiXPro Digital Solution • digixpro.in • Production experience dating back to 2016 • Page 2 of 2', margin, pageHeight - 20);

  return Buffer.from(doc.output('arraybuffer'));
}
