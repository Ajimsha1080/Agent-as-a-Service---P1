import uuid
from typing import Dict, Any, List, Optional
from services.agent_runtime.lifecycle import AgentLifecycleManager

class HospitalityAgentSDK:
    """Internal Agent-as-a-Service SDK abstraction layer."""
    def __init__(self, db_session=None):
        self.lifecycle_manager = AgentLifecycleManager(db_session=db_session)
        self._agents_db = {}
        self._usage_db = {}

    def createAgent(self, organization_id: str, property_id: str, name: str, agent_type: str = "CONCIERGE") -> Dict[str, Any]:
        agent_id = f"agt_{uuid.uuid4().hex[:10]}"
        agent = {
            "id": agent_id,
            "organization_id": organization_id,
            "property_id": property_id,
            "name": name,
            "agent_type": agent_type,
            "status": "DRAFT",
            "config": {
                "system_prompt": f"You are an expert hospitality {agent_type} agent.",
                "enabled_tools": ["search_property_information", "get_facility_status", "check_room_availability"],
                "enabled_channels": ["web_widget"],
                "model_name": "gpt-4o-mini"
            },
            "documents": []
        }
        self._agents_db[agent_id] = agent
        return agent

    def configureAgent(self, agent_id: str, system_prompt: Optional[str] = None, tone: Optional[str] = None, model_name: Optional[str] = None) -> Dict[str, Any]:
        agent = self._agents_db.get(agent_id)
        if not agent:
            raise ValueError(f"Agent {agent_id} not found.")
        if system_prompt:
            agent["config"]["system_prompt"] = system_prompt
        if tone:
            agent["config"]["tone"] = tone
        if model_name:
            agent["config"]["model_name"] = model_name
        agent["status"] = "CONFIGURING"
        return agent

    async def validateAgent(self, agent_id: str) -> Tuple[bool, str]:
        agent = self._agents_db.get(agent_id)
        if not agent:
            return False, "Agent not found"
        return await self.lifecycle_manager.validate_agent_configuration(agent, agent["config"])

    async def deployAgent(self, agent_id: str) -> Dict[str, Any]:
        agent = self._agents_db.get(agent_id)
        if not agent:
            raise ValueError(f"Agent {agent_id} not found.")
        res = await self.lifecycle_manager.deploy_agent(agent_id, agent, agent["config"])
        if res["success"]:
            agent["status"] = "ACTIVE"
        else:
            agent["status"] = "FAILED"
        return res

    async def pauseAgent(self, agent_id: str) -> Dict[str, Any]:
        agent = self._agents_db.get(agent_id)
        if agent:
            agent["status"] = "PAUSED"
        return await self.lifecycle_manager.pause_agent(agent_id)

    async def resumeAgent(self, agent_id: str) -> Dict[str, Any]:
        agent = self._agents_db.get(agent_id)
        if agent:
            agent["status"] = "ACTIVE"
        return await self.lifecycle_manager.resume_agent(agent_id)

    async def disableAgent(self, agent_id: str) -> Dict[str, Any]:
        agent = self._agents_db.get(agent_id)
        if agent:
            agent["status"] = "DISABLED"
        return await self.lifecycle_manager.disable_agent(agent_id)

    def registerTool(self, agent_id: str, tool_name: str) -> Dict[str, Any]:
        agent = self._agents_db.get(agent_id)
        if not agent:
            raise ValueError(f"Agent {agent_id} not found.")
        if tool_name not in agent["config"]["enabled_tools"]:
            agent["config"]["enabled_tools"].append(tool_name)
        return agent

    def registerKnowledgeBase(self, agent_id: str, document_title: str, content: str) -> Dict[str, Any]:
        agent = self._agents_db.get(agent_id)
        if not agent:
            raise ValueError(f"Agent {agent_id} not found.")
        doc = {"id": f"doc_{uuid.uuid4().hex[:6]}", "title": document_title, "content_len": len(content)}
        agent["documents"].append(doc)
        return doc

    def enableChannel(self, agent_id: str, channel_name: str) -> Dict[str, Any]:
        agent = self._agents_db.get(agent_id)
        if not agent:
            raise ValueError(f"Agent {agent_id} not found.")
        if channel_name not in agent["config"]["enabled_channels"]:
            agent["config"]["enabled_channels"].append(channel_name)
        return agent

    def getAgentUsage(self, agent_id: str) -> Dict[str, Any]:
        return {
            "agent_id": agent_id,
            "conversations_total": 1248,
            "tokens_consumed": 482000,
            "voice_minutes": 142,
            "estimated_cost_usd": 38.45
        }

    def getAgentAnalytics(self, agent_id: str) -> Dict[str, Any]:
        return {
            "agent_id": agent_id,
            "ai_resolution_rate": "92.4%",
            "human_escalation_rate": "7.6%",
            "average_response_time_ms": 410,
            "csat_score": 4.85,
            "top_requested_services": ["Pool Hours", "Room Availability", "Spa Booking", "Dinner Menu"]
        }
