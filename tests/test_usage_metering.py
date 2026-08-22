import pytest
from services.billing.metering import UsageMeteringService

def test_billing_metering_and_entitlements():
    meter = UsageMeteringService()

    # 1. Record Usage Events
    meter.record_usage_event("org_azure", "prop_1", "agt_1", "chat_message", quantity=1000, unit="tokens")
    meter.record_usage_event("org_azure", "prop_1", "agt_1", "voice_session", quantity=10, unit="minutes")

    summary = meter.get_organization_usage_summary("org_azure")
    assert summary["total_events_logged"] == 2
    assert summary["total_tokens_consumed"] == 1000
    assert summary["total_voice_minutes"] == 10
    assert summary["estimated_total_cost_usd"] > 0

    # 2. Check Plan Entitlements
    allowed, msg = meter.check_entitlement("STARTER", current_agents_count=1)
    assert allowed is True

    blocked, msg_blocked = meter.check_entitlement("STARTER", current_agents_count=2)
    assert blocked is False
    assert "Plan limit reached" in msg_blocked
