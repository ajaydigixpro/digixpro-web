import fs from 'fs';
import path from 'path';
import { renderTemplateToPng } from '../renderer/png-renderer';
import { Master01Payload } from '../renderer/types';

const outputDir = path.resolve('C:/Users/shukl/.gemini/antigravity/brain/8336251b-55e8-4bd0-8e24-71a22b3f4a5e/scratch/rendered_tests');
fs.mkdirSync(outputDir, { recursive: true });

async function runTextMatrixTests() {
  console.log('====================================================');
  console.log('PHASE 14 — MASTER 01 TEXT TEST MATRIX EXECUTION');
  console.log('====================================================\n');

  const testCases: { id: string; name: string; payload: Master01Payload }[] = [
    {
      id: 'case_a_short_en',
      name: 'Case A: Very Short English Headline',
      payload: {
        template_id: 'master_01_insight',
        insight_headline: 'FOCUS DRIVES CLARITY',
        supporting_text: 'SIMPLIFYING THE SYSTEM IS THE FIRST STEP TO SCALING.',
      },
    },
    {
      id: 'case_b_long_en',
      name: 'Case B: Long English Headline',
      payload: {
        template_id: 'master_01_insight',
        insight_headline: 'WHY AUTOMATION FAILS WITHOUT SYSTEM DIAGNOSTICS AND ROOT LATENCY ISOLATION',
        supporting_text: 'ACCELERATING INEFFICIENCY ONLY CREATES COSTLY FRICTION SEAMS ACROSS APIS.',
      },
    },
    {
      id: 'case_c_short_hi',
      name: 'Case C: Short Hindi Headline',
      payload: {
        template_id: 'master_01_insight',
        insight_headline: 'प्रक्रिया की स्पष्टता ही वास्तविक गति है',
        supporting_text: 'बिना निदान के स्वचालन केवल अक्षमता को बढ़ाता है।',
      },
    },
    {
      id: 'case_d_long_hi',
      name: 'Case D: Long Hindi Headline',
      payload: {
        template_id: 'master_01_insight',
        insight_headline: 'सिस्टम डायग्नोस्टिक्स के बिना ऑटोमेशन हमेशा विफल होता है और लागत बढ़ाता है',
        supporting_text: 'प्रक्रिया की मूल बाधा को पहचाने बिना कोड लिखना केवल त्रुटियों को तेज करता है।',
      },
    },
    {
      id: 'case_e_mixed_hi_en',
      name: 'Case E: Hindi + English Mixed Headline',
      payload: {
        template_id: 'master_01_insight',
        insight_headline: 'AUTOMATION तभी काम करता है जब SYSTEM ARCHITECTURE सही हो',
        supporting_text: 'DIAGNOSTIC TRACE के बिना WORKFLOW कभी SCALABLE नहीं बनता।',
      },
    },
    {
      id: 'case_f_short_support',
      name: 'Case F: Short Supporting Text',
      payload: {
        template_id: 'master_01_insight',
        insight_headline: 'ARCHITECTURE FIRST, CODE SECOND',
        supporting_text: 'DESIGN THE FOUNDATION.',
      },
    },
    {
      id: 'case_g_max_support',
      name: 'Case G: Maximum Expected Supporting Text',
      payload: {
        template_id: 'master_01_insight',
        insight_headline: 'TRUE BOTTLENECKS LIVE AT INTEGRATION SEAMS',
        supporting_text:
          'EVERY WORKFLOW DELAY ARISES AT UNMONITORED API JUNCTIONS RATHER THAN INSIDE TRANSACTION PROCESSORS. ISOLATING ROOT LATENCY GUARANTEES IMMEDIATE THROUGHPUT ACCELERATION.',
      },
    },
  ];

  for (const tc of testCases) {
    console.log(`[TEST] Running ${tc.name}...`);
    const result = await renderTemplateToPng(tc.payload);

    const outPngPath = path.join(outputDir, `${tc.id}.png`);
    const outSvgPath = path.join(outputDir, `${tc.id}.svg`);

    fs.writeFileSync(outPngPath, result.png);
    fs.writeFileSync(outSvgPath, result.svg, 'utf8');

    console.log(`  -> Passed: ${result.qa.passed}`);
    console.log(`  -> Dimensions: ${result.qa.width}x${result.qa.height}`);
    console.log(`  -> Time: ${result.qa.telemetry.render_time_ms}ms`);
    console.log(`  -> PNG Size: ${result.qa.telemetry.png_size_bytes} bytes`);
    console.log(`  -> Saved: ${outPngPath}`);
    if (result.qa.errors.length > 0) {
      console.error(`  -> Errors:`, result.qa.errors);
    }
    console.log('----------------------------------------------------');
  }

  console.log('\nAll 7 Text Matrix test cases executed successfully!');
}

runTextMatrixTests().catch(console.error);
