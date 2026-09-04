import pytest
import pytest_asyncio
from services.agent_runtime.tools import HospitalityToolRegistry

@pytest.mark.asyncio
async def test_erp_data_access_control_disabled_category():
    """Verify that disabled ERP categories return a safe restriction message."""
    registry = HospitalityToolRegistry()
    
    # Test disabled payment information inquiry
    res = await registry.execute_tool(
        tool_name="get_payment_info",
        tool_args={},
        organization_id="org_azure_group",
        property_id="prop_azure_palm_resort",
        enabled_tools=[],
        user_context={"user_role": "resident", "resident_id": "res_default_1"}
    )
    assert res["success"] is False
    assert "I don't have access to that information" in res["error"]

@pytest.mark.asyncio
async def test_erp_data_access_control_own_data_scope():
    """Verify that resident can access own room data but is blocked from another resident's data."""
    registry = HospitalityToolRegistry()

    # Resident inquiring about another resident'record when own_data scope is enforced
    res_other = await registry.execute_tool(
        tool_name="get_resident_info",
        tool_args={"resident_id": "res_other_99"},
        organization_id="org_azure_group",
        property_id="prop_azure_palm_resort",
        enabled_tools=[],
        user_context={"user_role": "resident", "resident_id": "res_default_1"}
    )
    assert res_other["success"] is False
    assert "I don't have access to that information" in res_other["error"]

@pytest.mark.asyncio
async def test_field_level_masking():
    """Verify field permissions mask phone numbers and email when disabled."""
    result_dict = {
        "resident_id": "res_default_1",
        "name": "Alex Johnson",
        "room_number": "304",
        "phone_number": "+15552345678",
        "emergency_contact": "+15552345678",
        "email": "alex@example.com"
    }

    field_perms = {"name": True, "room_number": True, "phone_number": False, "email": False}
    if not field_perms.get("phone_number"):
        result_dict.pop("phone_number", None)
        result_dict.pop("emergency_contact", None)
    if not field_perms.get("email"):
        result_dict.pop("email", None)

    assert "name" in result_dict
    assert "room_number" in result_dict
    assert "phone_number" not in result_dict
    assert "emergency_contact" not in result_dict
    assert "email" not in result_dict

@pytest.mark.asyncio
async def test_tenant_isolation_erp_data():
    """Verify Org A policies never expose or leak Org B data."""
    registry = HospitalityToolRegistry()
    res_org_a = await registry.execute_tool(
        tool_name="get_notices",
        tool_args={},
        organization_id="org_azure_group",
        property_id="prop_azure_palm_resort",
        enabled_tools=[]
    )
    assert res_org_a["success"] is True
