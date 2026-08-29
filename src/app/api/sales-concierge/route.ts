import { NextRequest, NextResponse } from "next/server";
import { LocalSemanticRouter } from "@/sales-concierge/semantic-router/router";
import { GuidedTourEngine } from "@/sales-concierge/tour-matrix";

const routerInstance = new LocalSemanticRouter({
  similarityThreshold: 0.75,
  marginThreshold: 0.10
});

const tourEngine = new GuidedTourEngine();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, session_id, lead_id, current_page } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid request: 'message' string is required." },
        { status: 400 }
      );
    }

    const validSessionId = session_id && typeof session_id === "string" && session_id.trim().length > 0
      ? session_id
      : `session-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    // 1. Execute Local Semantic Router with Page Context
    const routingResult = routerInstance.route(message, validSessionId, lead_id, current_page);
    const session = routerInstance.getSession(validSessionId);

    // 2. Execute Guided Tour Engine with Session Context
    const tourStep = tourEngine.resolveTourStep(routingResult, session);

    // 3. Format Natural Consultative Response
    let markdownText = `${tourStep.headline_message}\n\n`;

    if (tourStep.targeted_question) {
      markdownText += `${tourStep.targeted_question}`;
    }

    return NextResponse.json({
      success: true,
      text: markdownText.trim(),
      session_id: validSessionId,
      routing_result: {
        candidate_intent: routingResult.candidate_intent,
        candidate_family: routingResult.candidate_family,
        confidence_status: routingResult.confidence_status,
        high_risk: routingResult.high_risk,
        tier0_match: routingResult.tier0_match,
        current_page: routingResult.current_page
      },
      tour_step: tourStep
    });
  } catch (error: any) {
    console.error("DigiXPro Concierge API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error in DigiXPro Concierge pipeline.",
        text: "I am having trouble processing that request right now. You can explore our core services at [/how-we-work](/how-we-work) or request a complimentary website diagnostic audit at [/audit](/audit)."
      },
      { status: 500 }
    );
  }
}
