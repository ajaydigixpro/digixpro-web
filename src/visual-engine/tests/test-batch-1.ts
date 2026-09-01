import fs from 'fs';
import path from 'path';
import { renderTemplateToPng } from '../renderer/png-renderer';
import { TemplatePayload } from '../renderer/types';

const outputDir = path.resolve('C:/Users/shukl/.gemini/antigravity/brain/8336251b-55e8-4bd0-8e24-71a22b3f4a5e/scratch/rendered_tests/batch_1');
fs.mkdirSync(outputDir, { recursive: true });

interface TestCase {
  id: string;
  name: string;
  payload: TemplatePayload;
}

const batch1Tests: TestCase[] = [
  // ==========================================
  // MASTER 02 — PROBLEM / SOLUTION
  // ==========================================
  {
    id: 'm02_canonical',
    name: 'Master 02 - Canonical Render (Canva Reference Equivalence)',
    payload: {
      template_id: 'master_02_problem_solution',
      problem_headline: 'WHY AUTOMATION FAILS IN GROWING TEAMS',
      problem_supporting_text: 'MANUAL HANDOFFS AND DISCONNECTED APIS CREATE INVISIBLE WORK INEFFICIENCIES.',
      solution_headline: 'SYSTEM DIAGNOSTICS & CENTRALIZED ORCHESTRATION',
      solution_supporting_text: 'UNIFY LOGIC ACROSS SERVICES WITH DETERMINISTIC TRACING AND FAULT ISOLATION.',
      category_badge_text: 'AUTOMATION',
    },
  },
  {
    id: 'm02_short_en',
    name: 'Master 02 - Case A: Short English',
    payload: {
      template_id: 'master_02_problem_solution',
      problem_headline: 'SILOED DATA HUBS',
      problem_supporting_text: 'TEAMS WORK ON OUTDATED SPREADSHEETS.',
      solution_headline: 'UNIFIED ARCHITECTURE',
      solution_supporting_text: 'REAL-TIME DATA FLOWS ACROSS APIS.',
      category_badge_text: 'AUTOMATION',
    },
  },
  {
    id: 'm02_long_en',
    name: 'Master 02 - Case B: Long English',
    payload: {
      template_id: 'master_02_problem_solution',
      problem_headline: 'FRAGMENTED INFRASTRUCTURE LEADS TO HIGH RECURRING API COSTS AND LATENCY',
      problem_supporting_text: 'WHEN WORKFLOWS SCALE WITHOUT CENTRAL MONITORING, ERROR RATES COMPOUND DRAMATICALLY.',
      solution_headline: 'ROBUST ARCHITECTURAL FOUNDATIONS ELIMINATE REDUNDANCY AND SYSTEM DRIFT',
      solution_supporting_text: 'IMPLEMENT PROACTIVE HEALTH CHECKS, STRICT SCHEMAS, AND ZERO-COST ASSET PIPELINES.',
      category_badge_text: 'AUTOMATION',
    },
  },
  {
    id: 'm02_short_hi',
    name: 'Master 02 - Case C: Short Hindi',
    payload: {
      template_id: 'master_02_problem_solution',
      problem_headline: 'असंगठित प्रक्रियाएं',
      problem_supporting_text: 'मैनुअल काम से समय और संसाधनों का भारी नुकसान होता है।',
      solution_headline: 'स्वचालित वर्कफ़्लो',
      solution_supporting_text: 'सटीक और तेज़ परिणाम के लिए एकीकृत सिस्टम बनाएं।',
      category_badge_text: 'ऑटोमेशन',
    },
  },
  {
    id: 'm02_long_hi',
    name: 'Master 02 - Case D: Long Hindi',
    payload: {
      template_id: 'master_02_problem_solution',
      problem_headline: 'बिना सिस्टम डायग्नोस्टिक्स के ऑटोमेशन हमेशा विफल होता है और लागत बढ़ाता है',
      problem_supporting_text: 'प्रक्रिया की मूल बाधा को पहचाने बिना कोड लिखना केवल त्रुटियों को तेज करता है।',
      solution_headline: 'मजबूत आर्किटेक्चर और केंद्रीय निगरानी से वास्तविक विकास संभव है',
      solution_supporting_text: 'व्यवसाय के हर चरण को सटीक डेटा और स्वचालित एकीकरण से सशक्त बनाएं।',
      category_badge_text: 'ऑटोमेशन',
    },
  },
  {
    id: 'm02_mixed_hi_en',
    name: 'Master 02 - Case E: Mixed Hindi + English',
    payload: {
      template_id: 'master_02_problem_solution',
      problem_headline: 'API BOTTLENECK से WORKFLOW धीमा हो जाता है',
      problem_supporting_text: 'DISCONNECTED SERVICES व्यावसायिक क्षमता को सीमित करती हैं।',
      solution_headline: 'STANDARDIZED INTEGRATION ही वास्तविक SOLUTION है',
      solution_supporting_text: 'END-TO-END TRACING से सिस्टम का प्रदर्शन हमेशा स्थिर रहता है।',
      category_badge_text: 'AUTOMATION',
    },
  },
  {
    id: 'm02_max_content',
    name: 'Master 02 - Case F: Maximum Content Limits',
    payload: {
      template_id: 'master_02_problem_solution',
      problem_headline: 'UNCOORDINATED DATA PIPELINES CAUSE SEVERE OPERATIONAL LATENCY ACROSS DEPARTMENTS',
      problem_supporting_text: 'WITHOUT CONTINUOUS INTEGRATION STANDARDS, TRANSACTION FAILURES MULTIPLY AT CRITICAL SCALE.',
      solution_headline: 'SELF-HEALING EVENT-DRIVEN ARCHITECTURE GUARANTEES CONTINUOUS PRODUCTION UPTIME',
      solution_supporting_text: 'ISOLATING EDGE FAILURES AND ENFORCING SCHEMA INTEGRITY DRIVES PREDICTABLE SYSTEM VELOCITY.',
      category_badge_text: 'AUTOMATION',
    },
  },

  // ==========================================
  // MASTER 03 — FRAMEWORK (Strictly Icon-Free)
  // ==========================================
  {
    id: 'm03_canonical',
    name: 'Master 03 - Canonical Render (Canva Reference Equivalence)',
    payload: {
      template_id: 'master_03_framework',
      framework_headline: 'THE 3-STEP SCALING FRAMEWORK',
      framework_summary: 'PRECISION AT EVERY LAYER DRIVES COMPOUNDING SYSTEM EFFICIENCY.',
      framework_step_1: 'AUDIT & DIAGNOSE',
      framework_description_1: 'Trace integration friction and locate hidden latency leaks across APIs.',
      framework_step_2: 'STANDARDIZE SCHEMA',
      framework_description_2: 'Enforce deterministic payload contracts and strict type safety.',
      framework_step_3: 'SCALE WORKFLOWS',
      framework_description_3: 'Deploy automated self-hosted engines with continuous telemetry.',
      category_badge_text: 'FRAMEWORK',
    },
  },
  {
    id: 'm03_short_en',
    name: 'Master 03 - Case A: Short English',
    payload: {
      template_id: 'master_03_framework',
      framework_headline: 'CORE SYSTEM CYCLE',
      framework_summary: 'REPEATABLE PROCESSES LEAD TO HIGH QUALITY.',
      framework_step_1: 'DISCOVERY',
      framework_description_1: 'Identify bottlenecks.',
      framework_step_2: 'EXECUTION',
      framework_description_2: 'Implement solutions.',
      framework_step_3: 'OPTIMIZATION',
      framework_description_3: 'Iterate for speed.',
      category_badge_text: 'FRAMEWORK',
    },
  },
  {
    id: 'm03_long_en',
    name: 'Master 03 - Case B: Long English',
    payload: {
      template_id: 'master_03_framework',
      framework_headline: 'ENTERPRISE PRODUCTION ARCHITECTURE MATURITY MODEL',
      framework_summary: 'FOUNDATIONAL ENGINEERING PRACTICES OUTLAST TEMPORARY FRAMEWORK HYPES.',
      framework_step_1: 'DIAGNOSTIC ISOLATION',
      framework_description_1: 'Identify latency hotspots across legacy integration boundaries.',
      framework_step_2: 'DETERMINISTIC COMPILATION',
      framework_description_2: 'Validate payloads through JSON schema and eliminate runtime drift.',
      framework_step_3: 'ZERO-COST DEPLOYMENT',
      framework_description_3: 'Run native headless Rust renderers for instant media production.',
      category_badge_text: 'FRAMEWORK',
    },
  },
  {
    id: 'm03_short_hi',
    name: 'Master 03 - Case C: Short Hindi',
    payload: {
      template_id: 'master_03_framework',
      framework_headline: 'सफलता का त्रि-स्तरीय ढांचा',
      framework_summary: 'नियमितता और स्पष्टता ही वास्तविक गति लाती है।',
      framework_step_1: 'निरीक्षण',
      framework_description_1: 'सिस्टम की कमियों को पहचानें।',
      framework_step_2: 'सरलीकरण',
      framework_description_2: 'प्रक्रिया को स्पष्ट बनाएं।',
      framework_step_3: 'विस्तार',
      framework_description_3: 'सुरक्षित रूप से स्केल करें।',
      category_badge_text: 'फ्रेमवर्क',
    },
  },
  {
    id: 'm03_long_hi',
    name: 'Master 03 - Case D: Long Hindi',
    payload: {
      template_id: 'master_03_framework',
      framework_headline: 'डिजिटल परिवर्तन और सिस्टम स्केलिंग की संपूर्ण कार्यप्रणाली',
      framework_summary: 'मजबूत बुनियादी सिद्धांत हमेशा दीर्घकालिक सफलता सुनिश्चित करते हैं।',
      framework_step_1: 'सटीक डायग्नोस्टिक्स',
      framework_description_1: 'व्यावसायिक प्रक्रियाओं की गहराई से जांच और बाधाओं का निवारण।',
      framework_step_2: 'मानकीकृत आर्किटेक्चर',
      framework_description_2: 'डेटा प्रवाह और वर्कफ़्लो को नियंत्रित और सुरक्षित बनाना।',
      framework_step_3: 'स्वचालित उत्पादन',
      framework_description_3: 'बिना अतिरिक्त लागत के बड़े पैमाने पर संचालन करना।',
      category_badge_text: 'फ्रेमवर्क',
    },
  },
  {
    id: 'm03_mixed_hi_en',
    name: 'Master 03 - Case E: Mixed Hindi + English',
    payload: {
      template_id: 'master_03_framework',
      framework_headline: 'DIGITAL SCALING का 3-STEP FRAMEWORK',
      framework_summary: 'ARCHITECTURE FIRST दृष्टिकोण ही वास्तविक STABILITY प्रदान करता है।',
      framework_step_1: 'SYSTEM AUDIT',
      framework_description_1: 'सभी API junctions की गहन जांच करें।',
      framework_step_2: 'AUTOMATION SETUP',
      framework_description_2: 'दैनिक कार्यों को स्वचालित रूप से चलाएं।',
      framework_step_3: 'CONTINUOUS MONITORING',
      framework_description_3: 'रियल-टाइम में परफॉरमेंस को ट्रैक करें।',
      category_badge_text: 'FRAMEWORK',
    },
  },

  // ==========================================
  // MASTER 07 — COMPARISON (Strictly 3 Rows)
  // ==========================================
  {
    id: 'm07_canonical',
    name: 'Master 07 - Canonical Render (Canva Reference Equivalence)',
    payload: {
      template_id: 'master_07_comparison',
      comparison_headline: 'MANUAL AD-HOC PROCESSES VS DETERMINISTIC PRODUCTION',
      client_project_type: 'ENTERPRISE SYSTEM COMPARISON',
      before_heading: 'BEFORE',
      after_heading: 'AFTER',
      before_point_1: 'Manual data entry across spreadsheets',
      after_point_1: 'Automated deterministic pipeline',
      before_point_2: 'High recurring API image costs',
      after_point_2: 'Zero-cost self-hosted visual engine',
      before_point_3: 'Unmonitored runtime workflow errors',
      after_point_3: 'Proactive diagnostics & schema checks',
      comparison_summary: 'DETERMINISTIC SYSTEMS ELIMINATE RECURRING OPERATIONAL OVERHEAD.',
      category_badge_text: 'COMPARISON',
    },
  },
  {
    id: 'm07_short_en',
    name: 'Master 07 - Case A: Short English',
    payload: {
      template_id: 'master_07_comparison',
      comparison_headline: 'STATIC VS DYNAMIC',
      before_point_1: 'Slow manual edits',
      after_point_1: 'Instant 300ms renders',
      before_point_2: 'Brittle templates',
      after_point_2: 'Strict schema control',
      before_point_3: 'High cloud bills',
      after_point_3: 'Zero recurring cost',
      comparison_summary: 'ENGINEERING EXCELLENCE DELIVERS REAL VALUE.',
      category_badge_text: 'COMPARISON',
    },
  },
  {
    id: 'm07_long_en',
    name: 'Master 07 - Case B: Long English',
    payload: {
      template_id: 'master_07_comparison',
      comparison_headline: 'LEGACY THIRD-PARTY SAAS ECOSYSTEM VS SELF-HOSTED AUTOMATION INFRASTRUCTURE',
      client_project_type: 'HEALTHCARE CLINIC OPERATIONS',
      before_point_1: 'Scattered patient records in silos',
      after_point_1: 'Unified HIPAA-compliant centralized hub',
      before_point_2: 'Monthly recurring subscription fee creep',
      after_point_2: 'Zero external API dependencies or fees',
      before_point_3: 'Frequent integration breaking changes',
      after_point_3: 'Hermetic static binary rendering stack',
      comparison_summary: 'TRANSFORMING VULNERABLE DEPENDENCIES INTO INDEPENDENT ASSETS.',
      category_badge_text: 'COMPARISON',
    },
  },
  {
    id: 'm07_short_hi',
    name: 'Master 07 - Case C: Short Hindi',
    payload: {
      template_id: 'master_07_comparison',
      comparison_headline: 'पुराना तरीका बनाम नया सिस्टम',
      client_project_type: 'सिस्टम तुलना',
      before_heading: 'पहले',
      after_heading: 'बाद में',
      before_point_1: 'धीमी और अस्पष्ट प्रक्रिया',
      after_point_1: 'स्वचालित और तेज गति',
      before_point_2: 'अनावश्यक मासिक खर्च',
      after_point_2: 'शून्य अतिरिक्त लागत',
      before_point_3: 'डेटा खोने का जोखिम',
      after_point_3: 'सुरक्षित और विश्वसनीय',
      comparison_summary: 'सटीक तकनीक से व्यवसाय को नई ऊंचाइयों पर ले जाएं।',
      category_badge_text: 'तुलना',
    },
  },
  {
    id: 'm07_long_hi',
    name: 'Master 07 - Case D: Long Hindi',
    payload: {
      template_id: 'master_07_comparison',
      comparison_headline: 'पारंपरिक मैनुअल संचालन बनाम एकीकृत डिजिटल आर्किटेक्चर',
      client_project_type: 'अस्पताल प्रबंधन प्रणाली',
      before_heading: 'पहले की स्थिति',
      after_heading: 'डिजीएक्सप्रो के बाद',
      before_point_1: 'मरीजों के रिकॉर्ड और अपॉइंटमेंट में देरी',
      after_point_1: 'स्वचालित बुकिंग और त्वरित परामर्श प्रक्रिया',
      before_point_2: 'कर्मचारियों पर अत्यधिक मैनुअल काम का बोझ',
      after_point_2: 'त्रुटिहीन और सहज डिजिटल वर्कफ़्लो प्रबंधन',
      before_point_3: 'महंगे बाहरी सॉफ़्टवेयर पर भारी निर्भरता',
      after_point_3: 'स्वतंत्र, सुरक्षित और लागत-कुशल समाधान',
      comparison_summary: 'आधुनिक तकनीक से हर चुनौती को सुअवसर में बदलें।',
      category_badge_text: 'तुलना',
    },
  },
  {
    id: 'm07_mixed_hi_en',
    name: 'Master 07 - Case E: Mixed Hindi + English',
    payload: {
      template_id: 'master_07_comparison',
      comparison_headline: 'MANUAL WORKFLOWS VS DIGIXPRO AUTOMATION',
      client_project_type: 'DIAGNOSTIC LAB UPGRADE',
      before_heading: 'BEFORE',
      after_heading: 'AFTER',
      before_point_1: 'Manual report dispatch में देरी',
      after_point_1: 'Instant WhatsApp & Email डिलीवरी',
      before_point_2: 'Unmonitored payment leaks',
      after_point_2: 'Automated invoice reconciliation',
      before_point_3: 'Customer churn और असंतोष',
      after_point_3: '5-Star patient satisfaction',
      comparison_summary: 'AUTOMATION SAVES VALUABLE TIME AND BOOSTS REVENUE.',
      category_badge_text: 'COMPARISON',
    },
  },
];

async function runBatch1Tests() {
  console.log('====================================================');
  console.log('BATCH 1 EXECUTION & VERIFICATION TEST SUITE');
  console.log('====================================================\n');

  let passedCount = 0;

  for (const test of batch1Tests) {
    console.log(`[TEST] Running ${test.name}...`);
    const result = await renderTemplateToPng(test.payload);

    const outPath = path.join(outputDir, `${test.id}.png`);
    fs.writeFileSync(outPath, result.png);

    console.log(`  -> QA Passed: ${result.qa.passed}`);
    console.log(`  -> Dimensions: ${result.qa.width}x${result.qa.height}`);
    console.log(`  -> Render Time: ${result.qa.telemetry.render_time_ms}ms`);
    console.log(`  -> PNG Buffer Size: ${result.qa.telemetry.png_size_bytes} bytes`);
    console.log(`  -> Background Source: ${result.qa.background_info.source_type} (${result.qa.background_info.background_id})`);
    console.log(`  -> Saved: ${outPath}`);

    if (result.qa.warnings.length > 0) {
      console.log(`  -> Warnings: ${result.qa.warnings.join(', ')}`);
    }

    if (!result.qa.passed) {
      console.error(`  -> Errors: ${result.qa.errors.join(', ')}`);
    } else {
      passedCount++;
    }
    console.log('----------------------------------------------------');
  }

  console.log(`\n====================================================`);
  console.log(`BATCH 1 RESULTS: ${passedCount} / ${batch1Tests.length} PASSED`);
  console.log(`====================================================\n`);
}

runBatch1Tests().catch(console.error);
