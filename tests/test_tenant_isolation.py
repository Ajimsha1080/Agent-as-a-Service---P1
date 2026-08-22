import pytest
import asyncio
from services.rag.vector_store import PostgresPgVectorStore
from services.agent_runtime.tools import HospitalityToolRegistry

@pytest.mark.asyncio
async def test_organization_vector_isolation():
    """Proves Organization A cannot retrieve Organization B vector documents."""
    store = PostgresPgVectorStore()

    # Add Org A Document
    await store.add_documents(
        documents=[{"id": "doc_org_a", "content": "Organization A Confidential Financial Policy"}],
        organization_id="org_A",
        property_id="prop_A1"
    )

    # Add Org B Document
    await store.add_documents(
        documents=[{"id": "doc_org_b", "content": "Organization B Secret VIP Guest Protocol"}],
        organization_id="org_B",
        property_id="prop_B1"
    )

    # Query as Org A
    results_org_a = await store.similarity_search(
        query="Confidential VIP Policy",
        organization_id="org_A",
        property_id="prop_A1"
    )

    # Verify Org A gets ONLY Org A data
    assert len(results_org_a) == 1
    assert results_org_a[0]["id"] == "doc_org_a"
    assert "Organization B" not in results_org_a[0]["content"]

@pytest.mark.asyncio
async def test_tool_authorization_enforcement():
    """Proves an agent cannot call a tool unless explicitly enabled in its config."""
    registry = HospitalityToolRegistry()

    # Attempt to call 'create_booking' when only 'get_facility_status' is enabled
    enabled_tools = ["get_facility_status"]

    result = await registry.execute_tool(
        tool_name="create_booking",
        tool_args={"customer_name": "Test Guest"},
        organization_id="org_A",
        property_id="prop_A1",
        enabled_tools=enabled_tools
    )

    # Verify tool execution is blocked with authorization error
    assert result["success"] is False
    assert "is not enabled for this agent" in result["error"]
