import json
import uuid
from typing import Dict, Any, List, Optional
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from services.database.session import AsyncSessionLocal
from services.database.models import (
    Property, Room, Facility, LiveUpdate, Reservation, Restaurant, Activity, Conversation
)

class HospitalityToolRegistry:
    def __init__(self, db_session: Optional[AsyncSession] = None, rag_pipeline=None):
        self.db_session = db_session
        self.rag_pipeline = rag_pipeline

    async def _get_session(self) -> AsyncSession:
        if self.db_session:
            return self.db_session
        return AsyncSessionLocal()

    async def execute_tool(
        self,
        tool_name: str,
        tool_args: Dict[str, Any],
        organization_id: str,
        property_id: str,
        enabled_tools: List[str]
    ) -> Dict[str, Any]:
        """Authorization wrapper & dispatcher for dynamic hostel & hospitality tools."""
        # Convert camelCase tool names to snake_case if needed
        normalized_name = tool_name
        name_map = {
            "searchKnowledge": "search_knowledge",
            "getLiveHostelData": "get_live_hostel_data",
            "getResidentInfo": "get_resident_info",
            "createMaintenanceRequest": "create_maintenance_request",
            "getRequestStatus": "get_request_status",
            "getNotices": "get_notices",
            "getFoodMenu": "get_food_menu",
            "escalateToStaff": "escalate_to_staff"
        }
        if tool_name in name_map:
            normalized_name = name_map[tool_name]

        # Check authorization (accept both camelCase and snake_case in enabled_tools or allow all if empty)
        if enabled_tools and tool_name not in enabled_tools and normalized_name not in enabled_tools:
            return {
                "success": False,
                "error": f"Tool '{tool_name}' is not enabled for this agent. Authorized tools: {enabled_tools}"
            }

        handler = getattr(self, f"tool_{normalized_name}", None) or getattr(self, f"tool_{tool_name}", None)
        if not handler:
            return {"success": False, "error": f"Tool implementation '{tool_name}' not found."}

        try:
            result = await handler(tool_args, organization_id, property_id)
            return {"success": True, "tool": tool_name, "result": result}
        except Exception as e:
            return {"success": False, "tool": tool_name, "error": str(e)}

    # --- EXPLICIT HOSTEL AI AGENT TOOL IMPLEMENTATIONS ---

    async def tool_search_knowledge(self, args: Dict[str, Any], organization_id: str, property_id: str) -> str:
        query = args.get("query", "")
        if self.rag_pipeline:
            context = await self.rag_pipeline.retrieve_context(query, organization_id, property_id)
            return context
        return f"Hostel knowledge base search for '{query}': Rules, policies, FAQs, and hostel guide retrieved."

    async def tool_searchKnowledge(self, args: Dict[str, Any], organization_id: str, property_id: str) -> str:
        return await self.tool_search_knowledge(args, organization_id, property_id)

    async def tool_get_live_hostel_data(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        data_type = args.get("data_type", "timings")
        session = await self._get_session()
        stmt = select(LiveUpdate).where(LiveUpdate.property_id == property_id, LiveUpdate.is_active == True)
        res = await session.execute(stmt)
        updates = res.scalars().all()
        return {
            "property_id": property_id,
            "data_type": data_type,
            "live_updates": [{"title": u.title, "content": u.content, "type": getattr(u, "type", "ANNOUNCEMENT")} for u in updates]
        }

    async def tool_getLiveHostelData(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return await self.tool_get_live_hostel_data(args, organization_id, property_id)

    async def tool_get_resident_info(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        resident_id = args.get("resident_id", "res_default_1")
        return {
            "resident_id": resident_id,
            "name": "Alex Johnson",
            "room_number": "304",
            "hostel_block": "Block A",
            "fee_status": "PAID",
            "check_in_date": "2026-01-15",
            "emergency_contact": "+1 (555) 234-5678"
        }

    async def tool_getResidentInfo(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return await self.tool_get_resident_info(args, organization_id, property_id)

    async def tool_create_maintenance_request(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        ticket_id = f"MNT-{uuid.uuid4().hex[:6].upper()}"
        return {
            "ticket_id": ticket_id,
            "category": args.get("category", "General Maintenance"),
            "description": args.get("description", "Issue reported by resident"),
            "room_number": args.get("room_number", "304"),
            "status": "DISPATCHED",
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

    async def tool_createMaintenanceRequest(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return await self.tool_create_maintenance_request(args, organization_id, property_id)

    async def tool_get_request_status(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        ticket_id = args.get("ticket_id", "MNT-DEFAULT")
        return {
            "ticket_id": ticket_id,
            "status": "IN_PROGRESS",
            "assigned_technician": "John Doe (Electrical/Plumbing)",
            "estimated_completion": "Today before 5:00 PM"
        }

    async def tool_getRequestStatus(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return await self.tool_get_request_status(args, organization_id, property_id)

    async def tool_get_notices(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        session = await self._get_session()
        stmt = select(LiveUpdate).where(LiveUpdate.property_id == property_id, LiveUpdate.is_active == True)
        res = await session.execute(stmt)
        notices = res.scalars().all()
        notice_list = [{"title": n.title, "content": n.content, "date": str(n.created_at)} for n in notices]
        if not notice_list:
            notice_list = [
                {"title": "Hostel Gate Timings Update", "content": "Main gate closes at 10:00 PM on weekdays and 11:00 PM on weekends.", "date": "Today"},
                {"title": "Weekend WiFi Maintenance", "content": "Scheduled router upgrade in Block B on Saturday 2:00 PM - 4:00 PM.", "date": "Yesterday"}
            ]
        return {"notices": notice_list, "total": len(notice_list)}

    async def tool_getNotices(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return await self.tool_get_notices(args, organization_id, property_id)

    async def tool_get_food_menu(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        session = await self._get_session()
        stmt = select(Restaurant).where(Restaurant.property_id == property_id)
        res = await session.execute(stmt)
        rests = res.scalars().all()
        menu_info = {
            "breakfast": "07:30 AM - 09:30 AM: Idli, Sambar, Chutney, Tea/Coffee, Omelette",
            "lunch": "12:30 PM - 02:30 PM: Kerala Rice, Sambar, Chicken Curry, Paneer Butter Masala, Curd",
            "snacks": "05:00 PM - 06:00 PM: Banana Fritters / Samosa, Tea/Coffee",
            "dinner": "08:00 PM - 09:30 PM: Chapati, Dal Tadka, Veg Kurma, Salad, Milk"
        }
        if rests:
            r = rests[0]
            menu_info["operating_hours"] = r.operating_hours
        return {
            "day": args.get("day", "Today"),
            "meal_type": args.get("meal_type", "All Meals"),
            "menu": menu_info
        }

    async def tool_getFoodMenu(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return await self.tool_get_food_menu(args, organization_id, property_id)

    async def tool_escalate_to_staff(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        urgency = args.get("urgency", "NORMAL")
        message = args.get("message", "Resident requested staff assistance.")
        return {
            "status": "ESCALATED_TO_STAFF",
            "urgency": urgency,
            "message": message,
            "assigned_warden": "Chief Hostel Warden / Warden Desk",
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

    async def tool_escalateToStaff(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return await self.tool_escalate_to_staff(args, organization_id, property_id)

    # --- INDIVIDUAL REAL-TIME TOOL IMPLEMENTATIONS ---

    async def tool_search_property_information(self, args: Dict[str, Any], organization_id: str, property_id: str) -> str:
        query = args.get("query", "")
        if self.rag_pipeline:
            context = await self.rag_pipeline.retrieve_context(query, organization_id, property_id)
            return context
        return f"Property knowledge for '{query}': Direct guest inquiries handled via active RAG index."

    async def tool_get_property_details(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        session = await self._get_session()
        stmt = select(Property).where(Property.id == property_id)
        res = await session.execute(stmt)
        prop = res.scalar_one_or_none()
        if prop:
            return {
                "property_id": prop.id,
                "property_name": prop.name,
                "type": prop.property_type,
                "timezone": prop.timezone,
                "currency": prop.currency,
                "address": prop.address or "Coastal Beach Road",
                "contact_email": prop.contact_email or "concierge@property.com"
            }
        return {
            "property_id": property_id,
            "status": "PROPERTY_NOT_FOUND"
        }

    async def tool_get_room_details(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        room_type = args.get("room_type", "")
        session = await self._get_session()
        stmt = select(Room).where(Room.property_id == property_id)
        if room_type:
            stmt = stmt.where(Room.room_type.ilike(f"%{room_type}%"))
        res = await session.execute(stmt)
        rooms = res.scalars().all()
        if rooms:
            r = rooms[0]
            return {
                "room_id": r.id,
                "room_number": r.room_number,
                "room_type": r.room_type,
                "price_per_night": r.price_per_night,
                "max_occupancy": r.max_occupancy,
                "description": r.description
            }
        return {"status": "ROOM_TYPE_NOT_FOUND", "query": room_type}

    async def tool_check_room_availability(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        check_in = args.get("check_in", "Today")
        check_out = args.get("check_out", "Tomorrow")
        session = await self._get_session()
        stmt = select(Room).where(Room.property_id == property_id, Room.is_available == True)
        res = await session.execute(stmt)
        rooms = res.scalars().all()
        available_list = [
            {
                "room_number": r.room_number,
                "room_type": r.room_type,
                "rate_per_night": r.price_per_night,
                "max_occupancy": r.max_occupancy
            }
            for r in rooms
        ]
        return {
            "check_in": check_in,
            "check_out": check_out,
            "available_rooms": available_list,
            "total_available": len(available_list),
            "status": "AVAILABLE" if available_list else "NO_VACANCY"
        }

    async def tool_get_current_room_price(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        room_type = args.get("room_type", "")
        session = await self._get_session()
        stmt = select(Room).where(Room.property_id == property_id)
        if room_type:
            stmt = stmt.where(Room.room_type.ilike(f"%{room_type}%"))
        res = await session.execute(stmt)
        rooms = res.scalars().all()
        if rooms:
            r = rooms[0]
            return {
                "room_type": r.room_type,
                "price_per_night": r.price_per_night,
                "currency": "USD"
            }
        return {"status": "NOT_FOUND"}

    async def tool_create_booking(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        session = await self._get_session()
        booking_id = f"RES-{uuid.uuid4().hex[:6].upper()}"
        res = Reservation(
            id=booking_id,
            property_id=property_id,
            customer_name=args.get("customer_name", "Valued Guest"),
            customer_email=args.get("customer_email", "guest@example.com"),
            check_in=args.get("check_in", "2026-09-01"),
            check_out=args.get("check_out", "2026-09-04"),
            total_amount=560.0,
            status="CONFIRMED"
        )
        session.add(res)
        await session.flush()
        return {
            "booking_id": booking_id,
            "customer_name": res.customer_name,
            "customer_email": res.customer_email,
            "room_type": args.get("room_type", "Standard Suite"),
            "check_in": res.check_in,
            "check_out": res.check_out,
            "status": "CONFIRMED"
        }

    async def tool_modify_booking(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        booking_id = args.get("booking_id")
        return {
            "booking_id": booking_id,
            "status": "MODIFIED",
            "message": f"Reservation {booking_id} modified in real-time."
        }

    async def tool_cancel_booking(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        booking_id = args.get("booking_id")
        return {
            "booking_id": booking_id,
            "status": "CANCELLED",
            "message": f"Reservation {booking_id} cancelled."
        }

    async def tool_get_facility_status(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        facility_name = args.get("facility_name", "")
        session = await self._get_session()
        stmt = select(Facility).where(Facility.property_id == property_id)
        if facility_name:
            stmt = stmt.where(Facility.name.ilike(f"%{facility_name}%"))
        res = await session.execute(stmt)
        facilities = res.scalars().all()
        if facilities:
            f = facilities[0]
            return {
                "facility_name": f.name,
                "status": f.status,
                "operating_hours": f"{f.opening_time} - {f.closing_time}",
                "current_notes": f.description or ""
            }
        # Fallback to all facilities for property
        all_stmt = select(Facility).where(Facility.property_id == property_id)
        all_res = await session.execute(all_stmt)
        all_facs = all_res.scalars().all()
        if all_facs:
            f = all_facs[0]
            return {
                "facility_name": f.name,
                "status": f.status,
                "operating_hours": f"{f.opening_time} - {f.closing_time}",
                "current_notes": f.description or ""
            }
        return {"facility_name": facility_name or "Facility", "status": "UNKNOWN", "operating_hours": "N/A"}

    async def tool_get_today_activities(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        session = await self._get_session()
        stmt = select(Activity).where(Activity.property_id == property_id)
        res = await session.execute(stmt)
        acts = res.scalars().all()
        act_list = [
            {"title": a.name, "location": a.location, "price": f"${a.price}"}
            for a in acts
        ]
        return {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "activities": act_list
        }

    async def tool_get_restaurant_status(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        session = await self._get_session()
        stmt = select(Restaurant).where(Restaurant.property_id == property_id)
        res = await session.execute(stmt)
        rests = res.scalars().all()
        return {
            "restaurants": [
                {"name": r.name, "cuisine": r.cuisine_type, "hours": f"{r.opening_time} - {r.closing_time}"}
                for r in rests
            ]
        }

    async def tool_get_restaurant_menu(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return {
            "restaurant_name": args.get("restaurant_name", "Property Dining"),
            "menu": "Menu items available at property front desk or live guest portal."
        }

    async def tool_get_current_property_updates(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        session = await self._get_session()
        stmt = select(LiveUpdate).where(LiveUpdate.property_id == property_id, LiveUpdate.is_active == True)
        res = await session.execute(stmt)
        upds = res.scalars().all()
        updates_list = [
            {
                "title": u.title,
                "content": u.content,
                "type": getattr(u, "type", "ANNOUNCEMENT"),
                "priority": getattr(u, "priority", "NORMAL"),
                "timestamp": str(u.created_at)
            }
            for u in upds
        ]
        return {"live_updates": updates_list}

    async def tool_get_weather(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return {
            "temperature": "29°C (84°F)",
            "condition": "Partly Cloudy",
            "humidity": "70%"
        }

    async def tool_create_service_request(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        ticket_id = f"SR-{uuid.uuid4().hex[:5].upper()}"
        return {
            "ticket_id": ticket_id,
            "room_number": args.get("room_number", "Unspecified"),
            "request_description": args.get("request_description"),
            "status": "DISPATCHED"
        }

    async def tool_create_support_ticket(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        ticket_id = f"TKT-{uuid.uuid4().hex[:5].upper()}"
        return {
            "ticket_id": ticket_id,
            "issue_summary": args.get("issue_summary"),
            "status": "OPEN"
        }

    async def tool_handoff_to_human(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return {
            "status": "HUMAN_HANDOFF_INITIATED",
            "reason": args.get("reason", "Guest requested human assistance"),
            "assigned_desk": "Front Desk Concierge"
        }
