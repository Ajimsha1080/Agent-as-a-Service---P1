import pytest
import pytest_asyncio
from services.agent_runtime.tools import HospitalityToolRegistry

@pytest.mark.asyncio
async def test_active_notice_retrieval_and_filtering():
    """Verify that tool_get_notices retrieves active notices and excludes expired/inactive items."""
    registry = HospitalityToolRegistry()
    
    res = await registry.execute_tool(
        tool_name="get_notices",
        tool_args={},
        organization_id="org_azure_group",
        property_id="prop_azure_palm_resort",
        enabled_tools=[]
    )
    assert res["success"] is True
    notices_data = res["result"]
    assert "active_notices" in notices_data
    assert len(notices_data["active_notices"]) > 0
    for n in notices_data["active_notices"]:
        assert n["status"] == "ACTIVE"
        assert "updated_at" in n

@pytest.mark.asyncio
async def test_live_food_menu_realtime_retrieval():
    """Verify that tool_get_food_menu retrieves live mess menu and timings."""
    registry = HospitalityToolRegistry()
    
    res = await registry.execute_tool(
        tool_name="get_food_menu",
        tool_args={"meal_type": "Dinner"},
        organization_id="org_azure_group",
        property_id="prop_azure_palm_resort",
        enabled_tools=[]
    )
    assert res["success"] is True
    menu_result = res["result"]
    assert "menu" in menu_result
    assert "dinner" in menu_result["menu"]

@pytest.mark.asyncio
async def test_live_facility_status_retrieval():
    """Verify that facility status queries return operational hours and live notes."""
    registry = HospitalityToolRegistry()
    
    res = await registry.execute_tool(
        tool_name="get_facility_status",
        tool_args={"facility_name": "Gym"},
        organization_id="org_azure_group",
        property_id="prop_azure_palm_resort",
        enabled_tools=[]
    )
    assert res["success"] is True
    fac_result = res["result"]
    assert "status" in fac_result
    assert "operating_hours" in fac_result
