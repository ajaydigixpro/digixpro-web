import fs from 'fs';
import path from 'path';
import { renderTemplateToPng } from '../renderer/png-renderer';
import { TemplatePayload } from '../renderer/types';

const outputDir = path.resolve('C:/Users/shukl/.gemini/antigravity/brain/8336251b-55e8-4bd0-8e24-71a22b3f4a5e/scratch/rendered_tests/batch_2');
fs.mkdirSync(outputDir, { recursive: true });

interface TestCase {
  id: string;
  name: string;
  payload: TemplatePayload;
  expectFailure?: boolean;
}

const batch2Tests: TestCase[] = [
  // ==========================================
  // MASTER 05 — DATA / SIGNAL
  // ==========================================
  {
    id: 'm05_canonical',
    name: 'Master 05 - Canonical Render (Canva Reference Equivalence)',
    payload: {
      template_id: 'master_05_data_signal',
      data_headline: 'API INTEGRATION LATENCY REDUCTION',
      metric: '87%',
      metric_label: 'FASTER SYSTEM THROUGHPUT',
      short_context: 'Deterministic execution pipelines eliminate recurring cloud latency bottlenecks.',
      source_period_context: 'Q3 2026 BENCHMARK AUDIT',
      category_badge_text: 'DATA / SIGNAL',
    },
  },
  {
    id: 'm05_short_metric',
    name: 'Master 05 - Short Metric (Percentage)',
    payload: {
      template_id: 'master_05_data_signal',
      data_headline: 'SYSTEM UPTIME RELIABILITY',
      metric: '99.9%',
      metric_label: 'CONTINUOUS PRODUCTION UPTIME',
      short_context: 'Proactive diagnostics prevent unhandled exception cascades.',
      source_period_context: '30-DAY TELEMETRY LOG',
      category_badge_text: 'DATA',
    },
  },
  {
    id: 'm05_currency_metric',
    name: 'Master 05 - Currency / Financial Value Metric',
    payload: {
      template_id: 'master_05_data_signal',
      data_headline: 'ANNUAL RECURRING CLOUD SAVINGS',
      metric: '₹4.8L',
      metric_label: 'SAVED IN RECURRING API FEES',
      short_context: 'Replacing external image microservices with self-hosted Satori rendering.',
      source_period_context: 'ENTERPRISE AUDIT 2026',
      category_badge_text: 'SAVINGS',
    },
  },
  {
    id: 'm05_long_metric',
    name: 'Master 05 - Long Metric (Count)',
    payload: {
      template_id: 'master_05_data_signal',
      data_headline: 'AUTOMATED DOCUMENT ASSETS GENERATED',
      metric: '50,000+',
      metric_label: 'ZERO-ERROR COMPILATIONS',
      short_context: 'High-throughput Rust rendering engine executes in under 300ms per image.',
      source_period_context: 'PRODUCTION RUNTIME METRICS',
      category_badge_text: 'DATA',
    },
  },
  {
    id: 'm05_short_hi',
    name: 'Master 05 - Short Hindi Context',
    payload: {
      template_id: 'master_05_data_signal',
      data_headline: 'सिस्टम दक्षता में ऐतिहासिक सुधार',
      metric: '4.5X',
      metric_label: 'तेज़ कार्य निष्पादन',
      short_context: 'स्वचालित वर्कफ़्लो से समय और लागत में भारी बचत हुई।',
      source_period_context: 'डिजिटल ऑडिट 2026',
      category_badge_text: 'डेटा',
    },
  },
  {
    id: 'm05_long_hi',
    name: 'Master 05 - Long Hindi Context',
    payload: {
      template_id: 'master_05_data_signal',
      data_headline: 'क्लाउड सेवाओं की निर्भरता में अभूतपूर्व कमी',
      metric: '100%',
      metric_label: 'शून्य आवर्ती एपीआई लागत',
      short_context: 'स्व-होस्टेड रेंडरिंग इंजन द्वारा प्रति माह हजारों सोशल मीडिया पोस्ट का सुरक्षित और त्वरित निर्माण।',
      source_period_context: 'वार्षिक रिपोर्ट 2026',
      category_badge_text: 'डेटा सिग्नल',
    },
  },
  {
    id: 'm05_mixed_hi_en',
    name: 'Master 05 - Mixed Hindi + English',
    payload: {
      template_id: 'master_05_data_signal',
      data_headline: 'AUTOMATED WORKFLOW THROUGHPUT GAIN',
      metric: '12.4X',
      metric_label: 'FASTER REPORT DISPATCH',
      short_context: 'DIAGNOSTIC TRACE से सिस्टम एरर रेट घटकर शून्य हो गया।',
      source_period_context: 'LIVE TELEMETRY TRACE',
      category_badge_text: 'SIGNAL',
    },
  },

  // ==========================================
  // MASTER 08 — ANNOUNCEMENT (Partner Logo Tests)
  // ==========================================
  {
    id: 'm08_canonical_with_logo_dr_aggarwal',
    name: 'Master 08 - Canonical with Wide Partner Logo (Dr. Aggarwal)',
    payload: {
      template_id: 'master_08_announcement',
      announcement_headline: 'PARTNERSHIP ANNOUNCEMENT',
      announcement_subtitle: 'EXPANDING DIGITAL CLINICAL AUTOMATION',
      partner_logo_id: 'dr_aggarwal_logo',
      announcement_message: 'DigiXPro has partnered with Dr. Aggarwal PhysioCentre to deploy automated patient report distribution systems.',
      announcement_supporting_detail: 'Eliminating manual administrative friction through secure WhatsApp & Email automation.',
      announcement_date_context: 'SEPTEMBER 2026',
      category_badge_text: 'ANNOUNCEMENT',
    },
  },
  {
    id: 'm08_with_logo_scan_centre',
    name: 'Master 08 - With Compact Partner Logo (360 Neck Shoulder Centre)',
    payload: {
      template_id: 'master_08_announcement',
      announcement_headline: 'NEW CLINICAL INFRASTRUCTURE DEPLOYMENT',
      announcement_subtitle: '360 REHABILITATION CENTRE UPGRADE',
      partner_logo_id: 'scan_centre_logo',
      announcement_message: 'Deploying high-speed diagnostic telemetry and centralized scheduling for over 500 daily rehabilitation appointments.',
      announcement_supporting_detail: 'Seamless patient records management with zero recurring cloud subscription overhead.',
      announcement_date_context: 'OCTOBER 2026',
      category_badge_text: 'ANNOUNCEMENT',
    },
  },
  {
    id: 'm08_no_logo_omission',
    name: 'Master 08 - Logo Omission Test (Clean Render Without Partner Logo)',
    payload: {
      template_id: 'master_08_announcement',
      announcement_headline: 'PLATFORM 2.0 INFRASTRUCTURE RELEASE',
      announcement_subtitle: 'ZERO-COST MEDIA ENGINE ONLINE',
      announcement_message: 'DigiXPro Visual Engine 2.0 is now live across all internal production workflows.',
      announcement_supporting_detail: 'High-precision SVG to PNG compilation running natively on Rust resvg architecture.',
      announcement_date_context: 'AUGUST 2026',
      category_badge_text: 'RELEASE',
    },
  },
  {
    id: 'm08_short_hi',
    name: 'Master 08 - Short Hindi Announcement',
    payload: {
      template_id: 'master_08_announcement',
      announcement_headline: 'नई साझेदारी की घोषणा',
      announcement_subtitle: 'डिजिटल स्वास्थ्य सेवा में प्रगति',
      partner_logo_id: 'dr_aggarwal_logo',
      announcement_message: 'डिजीएक्सप्रो और डॉ. अग्रवाल फिजियोसेंटर ने एकीकृत ऑटोमेशन सिस्टम सफलतापूर्वक लॉन्च किया।',
      announcement_supporting_detail: 'मरीजों को तुरंत रिपोर्ट और परामर्श की सुविधा।',
      announcement_date_context: 'सितंबर 2026',
      category_badge_text: 'घोषणा',
    },
  },
  {
    id: 'm08_long_hi',
    name: 'Master 08 - Long Hindi Announcement',
    payload: {
      template_id: 'master_08_announcement',
      announcement_headline: 'स्वास्थ्य सेवा और क्लिनिकल ऑटोमेशन में ऐतिहासिक विस्तार',
      announcement_subtitle: 'उन्नत पुनर्वास केंद्र का संपूर्ण डिजिटल रूपांतरण',
      partner_logo_id: 'scan_centre_logo',
      announcement_message: '360 नेक शोल्डर एडवांस्ड रिहैबिलिटेशन सेंटर में डिजीएक्सप्रो ऑटोमेशन इंजन पूरी तरह से सक्रिय हो गया है।',
      announcement_supporting_detail: 'सैकड़ों मरीजों के दैनिक अपॉइंटमेंट और डिजिटल रिकॉर्ड अब बिना किसी देरी के सुरक्षित रूप से प्रबंधित हो रहे हैं।',
      announcement_date_context: 'अक्टूबर 2026',
      category_badge_text: 'घोषणा',
    },
  },

  // ==========================================
  // MASTER 10 — TESTIMONIAL (Identity Rule Proofs)
  // ==========================================
  {
    id: 'm10_case_a_with_photo',
    name: 'Master 10 - Case A: With Client Photo (Founder Portrait)',
    payload: {
      template_id: 'master_10_testimonial',
      client_name: 'DR. AJAY SHUKLA',
      company_role: 'FOUNDER & CHIEF ARCHITECT',
      client_photo_id: 'dr_ajay_shukla_photo',
      quote: 'DigiXPro automation transformed our operational velocity. Building self-healing, zero-cost systems gives us complete architectural sovereignty.',
      optional_context: 'VERIFIED FOUNDER REVIEW • 2026',
      category_badge_text: 'TESTIMONIAL',
    },
  },
  {
    id: 'm10_case_b_with_logo_dr_aggarwal',
    name: 'Master 10 - Case B: With Client Logo (Dr. Aggarwal PhysioCentre)',
    payload: {
      template_id: 'master_10_testimonial',
      client_name: 'DR. AGGARWAL',
      company_role: 'DIRECTOR, PHYSIOCENTRE',
      client_logo_id: 'client_logo_dr_aggarwal',
      quote: 'Our patient report delivery time dropped from hours to seconds. The automated WhatsApp and email pipelines run flawlessly with zero maintenance.',
      optional_context: 'CLINICAL AUTOMATION PARTNER',
      category_badge_text: 'CLIENT REVIEW',
    },
  },
  {
    id: 'm10_case_b_with_logo_scan_centre',
    name: 'Master 10 - Case B: With Client Logo (360 Neck Shoulder Centre)',
    payload: {
      template_id: 'master_10_testimonial',
      client_name: 'EXECUTIVE DIRECTOR',
      company_role: '360 ADVANCED REHABILITATION',
      client_logo_id: 'client_logo_scan_centre',
      quote: 'The centralized appointment workflow eliminated scheduling overlaps completely. Patients receive instant confirmations and timely reminders.',
      optional_context: 'HEALTHCARE OPERATIONS PARTNER',
      category_badge_text: 'TESTIMONIAL',
    },
  },
  {
    id: 'm10_short_hi',
    name: 'Master 10 - Short Hindi Testimonial',
    payload: {
      template_id: 'master_10_testimonial',
      client_name: 'डॉ. अजय शुक्ला',
      company_role: 'संस्थापक, डिजीएक्सप्रो',
      client_photo_id: 'dr_ajay_shukla_photo',
      quote: 'सटीक और मजबूत आर्किटेक्चर से हमने समय और लागत की बड़ी बचत हासिल की है।',
      optional_context: 'सत्यापित समीक्षा • 2026',
      category_badge_text: 'प्रशंसापत्र',
    },
  },
  {
    id: 'm10_long_hi',
    name: 'Master 10 - Long Hindi Testimonial',
    payload: {
      template_id: 'master_10_testimonial',
      client_name: 'डॉ. अग्रवाल',
      company_role: 'निदेशक, फिजियोसेंटर',
      client_logo_id: 'client_logo_dr_aggarwal',
      quote: 'डिजीएक्सप्रो के ऑटोमेशन सिस्टम से हमारे क्लिनिक के दैनिक संचालन में भारी सुधार हुआ है। मरीजों को समय पर रिपोर्ट मिलना अब पूरी तरह स्वचालित है।',
      optional_context: 'क्लिनिकल ऑटोमेशन पार्टनर',
      category_badge_text: 'प्रशंसापत्र',
    },
  },

  // ==========================================
  // MASTER 10 — HARD IDENTITY REJECTION PROOFS
  // ==========================================
  {
    id: 'm10_case_c_both_fail',
    name: 'Master 10 - Case C: BOTH Photo AND Logo Present (MUST HARD FAIL)',
    payload: {
      template_id: 'master_10_testimonial',
      client_name: 'DR. AJAY SHUKLA',
      company_role: 'DIRECTOR',
      client_photo_id: 'dr_ajay_shukla_photo',
      client_logo_id: 'client_logo_dr_aggarwal',
      quote: 'This invalid payload must be strictly rejected.',
    },
    expectFailure: true,
  },
  {
    id: 'm10_case_d_neither_fail',
    name: 'Master 10 - Case D: NEITHER Photo NOR Logo Present (MUST HARD FAIL)',
    payload: {
      template_id: 'master_10_testimonial',
      client_name: 'ANONYMOUS USER',
      company_role: 'UNKNOWN',
      quote: 'This invalid payload without an identity asset must be strictly rejected.',
    },
    expectFailure: true,
  },
];

async function runBatch2Tests() {
  console.log('====================================================');
  console.log('BATCH 2 EXECUTION & VERIFICATION TEST SUITE');
  console.log('====================================================\n');

  let passedCount = 0;

  for (const test of batch2Tests) {
    console.log(`[TEST] Running ${test.name}...`);

    try {
      const result = await renderTemplateToPng(test.payload);

      if (test.expectFailure) {
        console.error(`  -> FAILED: Test was expected to FAIL, but passed!`);
      } else {
        const outPath = path.join(outputDir, `${test.id}.png`);
        fs.writeFileSync(outPath, result.png);

        console.log(`  -> QA Passed: ${result.qa.passed}`);
        console.log(`  -> Dimensions: ${result.qa.width}x${result.qa.height}`);
        console.log(`  -> Render Time: ${result.qa.telemetry.render_time_ms}ms`);
        console.log(`  -> PNG Buffer Size: ${result.qa.telemetry.png_size_bytes} bytes`);
        console.log(`  -> Background Source: ${result.qa.background_info.source_type} (${result.qa.background_info.background_id})`);
        console.log(`  -> Saved: ${outPath}`);

        if (result.qa.passed) {
          passedCount++;
        }
      }
    } catch (err: any) {
      if (test.expectFailure) {
        console.log(`  -> SUCCESS (Expected Hard Policy Rejection): ${err.message}`);
        passedCount++;
      } else {
        console.error(`  -> ERROR: Unexpected render failure: ${err.message}`);
      }
    }

    console.log('----------------------------------------------------');
  }

  console.log(`\n====================================================`);
  console.log(`BATCH 2 RESULTS: ${passedCount} / ${batch2Tests.length} PASSED`);
  console.log(`====================================================\n`);
}

runBatch2Tests().catch(console.error);
