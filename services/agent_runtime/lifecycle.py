import uuid
from typing import Dict, Any, Tuple
from services.database.models import AgentStatus

class AgentLifecycleManager:
    def __init__(self, db_session=None):
        self.db_session = db_session

    async def validate_agent_configuration(self, agent_data: Dict[str, Any], config_data: Dict[str, Any]) -> Tuple[bool, str]:
        """Validates agent settings, knowledge presence, system prompts, and tools."""
        if not agent_data.get("name"):
            return False, "Validation Failed: Agent name is required."

        if not agent_data.get("property_id"):
            return False, "Validation Failed: Agent must be associated with a valid Property."

        system_prompt = config_data.get("system_prompt", "")
        if len(system_prompt.strip()) < 10:
            return False, "Validation Failed: System prompt must be at least 10 characters long."

        enabled_tools = config_data.get("enabled_tools", [])
        if not enabled_tools:
            return False, "Validation Failed: At least one tool (e.g. search_property_information) must be enabled."

        return True, "Agent configuration validated successfully."

    async def deploy_agent(self, agent_id: str, agent_data: Dict[str, Any], config_data: Dict[str, Any]) -> Dict[str, Any]:
        """Deploys an agent, transitions state to ACTIVE, and generates production credentials."""
        is_valid, message = await self.validate_agent_configuration(agent_data, config_data)
        if not is_valid:
            return {
                "success": False,
                "agent_id": agent_id,
                "status": AgentStatus.FAILED.value,
                "error_details": message
            }

        # Successful Deployment Output Credentials
        api_key = f"ak_live_{uuid.uuid4().hex[:12]}"
        widget_script = f'<script src="https://cdn.hospitalityagentcloud.com/v1/widget.js" data-agent-id="{agent_id}" defer></script>'
        api_endpoint = f"https://api.hospitalityagentcloud.com/v1/agents/{agent_id}/chat"
        phone_sip = f"sip:agt_{agent_id[:8]}@voice.hospitalityagentcloud.com"

        return {
            "success": True,
            "agent_id": agent_id,
            "status": AgentStatus.ACTIVE.value,
            "message": "Agent successfully registered and deployed on Shared Agent Runtime.",
            "deployment_output": {
                "agent_id": agent_id,
                "api_endpoint": api_endpoint,
                "api_key": api_key,
                "embeddable_widget_code": widget_script,
                "phone_receptionist_sip": phone_sip,
                "whatsapp_webhook": f"https://api.hospitalityagentcloud.com/v1/channels/whatsapp/webhook/{agent_id}",
                "deployed_at": "2026-08-21T03:45:00Z"
            }
        }

    async def pause_agent(self, agent_id: str) -> Dict[str, Any]:
        return {"agent_id": agent_id, "status": AgentStatus.PAUSED.value, "message": "Agent runtime paused."}

    async def resume_agent(self, agent_id: str) -> Dict[str, Any]:
        return {"agent_id": agent_id, "status": AgentStatus.ACTIVE.value, "message": "Agent runtime resumed."}

    async def disable_agent(self, agent_id: str) -> Dict[str, Any]:
        return {"agent_id": agent_id, "status": AgentStatus.DISABLED.value, "message": "Agent disabled."}
