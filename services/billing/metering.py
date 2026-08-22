import uuid
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional, Tuple

class UsageMeteringService:
    PLAN_LIMITS = {
        "STARTER": {"max_agents": 2, "max_properties": 1, "max_conversations": 5000, "voice_enabled": False},
        "PROFESSIONAL": {"max_agents": 5, "max_properties": 2, "max_conversations": 20000, "voice_enabled": True},
        "BUSINESS": {"max_agents": 15, "max_properties": 5, "max_conversations": 100000, "voice_enabled": True},
        "ENTERPRISE": {"max_agents": 999, "max_properties": 999, "max_conversations": 9999999, "voice_enabled": True}
    }

    MODEL_PRICING = {
        "gpt-4o": {"input_per_1k": 0.005, "output_per_1k": 0.015},
        "gpt-4o-mini": {"input_per_1k": 0.00015, "output_per_1k": 0.0006},
        "claude-3-5-sonnet": {"input_per_1k": 0.003, "output_per_1k": 0.015},
        "gemini-1.5-flash": {"input_per_1k": 0.0001, "output_per_1k": 0.0004}
    }

    def __init__(self, db_session=None):
        self.db_session = db_session
        self._events_log = []

    def record_usage_event(
        self,
        organization_id: str,
        property_id: str,
        agent_id: str,
        event_type: str,
        provider: str = "openai",
        quantity: int = 1,
        unit: str = "tokens",
        conversation_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """Logs billable usage event and calculates cost."""
        unit_cost = 0.000002 if unit == "tokens" else (0.02 if unit == "minutes" else 0.001)
        estimated_cost = round(quantity * unit_cost, 6)

        event = {
            "id": f"evt_{uuid.uuid4().hex[:10]}",
            "organization_id": organization_id,
            "property_id": property_id,
            "agent_id": agent_id,
            "conversation_id": conversation_id,
            "event_type": event_type,
            "provider": provider,
            "quantity": quantity,
            "unit": unit,
            "estimated_cost": estimated_cost,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        self._events_log.append(event)
        return event

    def check_entitlement(self, plan_name: str, current_agents_count: int, resource_type: str = "agent_creation") -> Tuple[bool, str]:
        """Enforces SaaS plan limits and entitlement boundaries."""
        plan = self.PLAN_LIMITS.get(plan_name.upper(), self.PLAN_LIMITS["STARTER"])
        if resource_type == "agent_creation":
            if current_agents_count >= plan["max_agents"]:
                return False, f"Plan limit reached: '{plan_name}' allows maximum {plan['max_agents']} agents. Please upgrade to Business or Enterprise."
        return True, "Entitlement check passed."

    def get_organization_usage_summary(self, organization_id: str) -> Dict[str, Any]:
        org_events = [e for e in self._events_log if e["organization_id"] == organization_id]
        total_tokens = sum(e["quantity"] for e in org_events if e["unit"] == "tokens")
        total_voice_mins = sum(e["quantity"] for e in org_events if e["unit"] == "minutes")
        total_cost = sum(e["estimated_cost"] for e in org_events)

        return {
            "organization_id": organization_id,
            "total_events_logged": len(org_events),
            "total_tokens_consumed": total_tokens,
            "total_voice_minutes": total_voice_mins,
            "estimated_total_cost_usd": round(total_cost, 4),
            "period": datetime.now(timezone.utc).strftime("%B %Y")
        }
