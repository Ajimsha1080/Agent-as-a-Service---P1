import json
import uuid
from typing import Dict, Any, List, Optional
from datetime import datetime

class HospitalityToolRegistry:
    def __init__(self, db_session=None, rag_pipeline=None):
        self.db_session = db_session
        self.rag_pipeline = rag_pipeline

    async def execute_tool(
        self,
        tool_name: str,
        tool_args: Dict[str, Any],
        organization_id: str,
        property_id: str,
        enabled_tools: List[str]
    ) -> Dict[str, Any]:
        """Authorization wrapper & dispatcher for dynamic hospitality tools."""
        if tool_name not in enabled_tools:
            return {
                "success": False,
                "error": f"Tool '{tool_name}' is not enabled for this agent. Authorized tools: {enabled_tools}"
            }

        handler = getattr(self, f"tool_{tool_name}", None)
        if not handler:
            return {"success": False, "error": f"Tool implementation '{tool_name}' not found."}

        try:
            result = await handler(tool_args, organization_id, property_id)
            return {"success": True, "tool": tool_name, "result": result}
        except Exception as e:
            return {"success": False, "tool": tool_name, "error": str(e)}

    # --- INDIVIDUAL TOOL IMPLEMENTATIONS ---

    async def tool_search_property_information(self, args: Dict[str, Any], organization_id: str, property_id: str) -> str:
        query = args.get("query", "")
        if self.rag_pipeline:
            context = await self.rag_pipeline.retrieve_context(query, organization_id, property_id)
            return context
        return f"Property search results for '{query}': High-speed Wi-Fi throughout resort, check-in 3:00 PM, check-out 11:00 AM."

    async def tool_get_property_details(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return {
            "property_name": "Azure Palm Resort & Spa",
            "type": "Luxury Eco Resort",
            "location": "Coastal Kerala, India",
            "check_in_time": "15:00",
            "check_out_time": "11:00",
            "amenities": ["Private Beach Access", "Infinity Pool", "Ayurvedic Spa", "24/7 Butler Service", "Yoga Pavilion"]
        }

    async def tool_get_room_details(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        room_type = args.get("room_type", "Deluxe Ocean Suite")
        return {
            "room_type": room_type,
            "size": "650 sq ft",
            "bed_type": "King Size Bed",
            "max_occupancy": 3,
            "base_price": "$280 / night",
            "features": ["Ocean View Balcony", "Jacuzzi", "Mini Bar", "Espresso Machine", "Rain Shower"]
        }

    async def tool_check_room_availability(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        check_in = args.get("check_in", "Today")
        check_out = args.get("check_out", "Tomorrow")
        room_type = args.get("room_type", "Any")
        return {
            "check_in": check_in,
            "check_out": check_out,
            "available_rooms": [
                {"room_type": "Deluxe Ocean Suite", "available_count": 4, "rate_per_night": 280.0, "currency": "USD"},
                {"room_type": "Garden Villa", "available_count": 2, "rate_per_night": 450.0, "currency": "USD"},
                {"room_type": "Beachfront Cottage", "available_count": 1, "rate_per_night": 320.0, "currency": "USD"}
            ],
            "status": "AVAILABLE"
        }

    async def tool_get_current_room_price(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        room_type = args.get("room_type", "Deluxe Ocean Suite")
        return {
            "room_type": room_type,
            "current_price": 280.0,
            "currency": "USD",
            "tax_inclusive": True,
            "special_offer": "15% off for stays over 3 nights"
        }

    async def tool_create_booking(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        booking_id = f"RES-{uuid.uuid4().hex[:6].upper()}"
        return {
            "booking_id": booking_id,
            "customer_name": args.get("customer_name", "Guest"),
            "customer_email": args.get("customer_email", "guest@example.com"),
            "room_type": args.get("room_type", "Deluxe Ocean Suite"),
            "check_in": args.get("check_in"),
            "check_out": args.get("check_out"),
            "total_amount": 560.0,
            "status": "CONFIRMED",
            "confirmation_code": booking_id,
            "instructions": "Confirmation sent to email. Pay upon arrival or via digital link."
        }

    async def tool_modify_booking(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        booking_id = args.get("booking_id", "RES-MOCK123")
        return {
            "booking_id": booking_id,
            "status": "MODIFIED",
            "new_check_in": args.get("check_in"),
            "new_check_out": args.get("check_out"),
            "message": f"Reservation {booking_id} updated successfully."
        }

    async def tool_cancel_booking(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        booking_id = args.get("booking_id", "RES-MOCK123")
        return {
            "booking_id": booking_id,
            "status": "CANCELLED",
            "refund_status": "FULL_REFUND_INITIATED",
            "message": f"Reservation {booking_id} has been cancelled without penalty."
        }

    async def tool_get_facility_status(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        facility_name = args.get("facility_name", "Swimming Pool").lower()
        if "pool" in facility_name:
            return {
                "facility_name": "Infinity Swimming Pool",
                "status": "Open",
                "operating_hours": "06:00 AM - 08:00 PM",
                "current_notes": "Water temperature 27°C. Towels available at poolside kiosk."
            }
        elif "spa" in facility_name:
            return {
                "facility_name": "Ayurvedic Spa & Wellness",
                "status": "Open",
                "operating_hours": "08:00 AM - 09:00 PM",
                "current_notes": "Slot reservations required. 2 PM slot available today."
            }
        elif "gym" in facility_name:
            return {
                "facility_name": "Fitness Center",
                "status": "Open 24/7",
                "current_notes": "Keycard access required after 10 PM."
            }
        return {
            "facility_name": args.get("facility_name", "Facility"),
            "status": "Open",
            "operating_hours": "07:00 AM - 09:00 PM"
        }

    async def tool_get_today_activities(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "activities": [
                {"title": "Sunrise Beach Yoga", "time": "06:30 AM - 07:30 AM", "location": "Yoga Deck", "price": "Free"},
                {"title": "Kayaking & Backwater Cruise", "time": "10:30 AM - 12:00 PM", "location": "Water Sports Center", "price": "$25/person"},
                {"title": "Sunset Cocktail & Acoustic Music", "time": "06:00 PM - 07:30 PM", "location": "Beachside Lounge", "price": "Complimentary drink for guests"}
            ]
        }

    async def tool_get_restaurant_status(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return {
            "restaurants": [
                {"name": "Spice Route Fine Dining", "status": "Open", "hours": "07:00 PM - 11:00 PM", "cuisine": "Kerala Seafood & Global"},
                {"name": "The Palm Cafe & Grill", "status": "Open", "hours": "07:00 AM - 10:00 PM", "cuisine": "Breakfast Buffet & Light Meals"}
            ]
        }

    async def tool_get_restaurant_menu(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return {
            "restaurant_name": args.get("restaurant_name", "Spice Route"),
            "categories": [
                {"category": "Starters", "items": ["Kerala Prawn Roast ($18)", "Crispy Lotus Stem ($12)", "Grilled Calamari ($16)"]},
                {"category": "Main Course", "items": ["Malabar Fish Curry with Appam ($26)", "Wild Mushroom Biryani ($22)", "Black Pepper Lobster ($38)"]},
                {"category": "Desserts", "items": ["Tender Coconut Payasam ($10)", "Mango Sorbet ($9)"]}
            ]
        }

    async def tool_get_current_property_updates(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        """Real-time live updates & announcements broadcast by staff."""
        return {
            "live_updates": [
                {
                    "title": "Evening Beach Bonfire",
                    "content": "Beach bonfire starts at 7:30 PM near the south pavilion with complimentary marshmallows.",
                    "type": "EVENT",
                    "priority": "HIGH",
                    "timestamp": datetime.now().strftime("%I:%M %p")
                },
                {
                    "title": "Spa Maintenance Scheduled",
                    "content": "Sauna area closed for routine maintenance from 2 PM to 4 PM today.",
                    "type": "MAINTENANCE",
                    "priority": "NORMAL",
                    "timestamp": datetime.now().strftime("%I:%M %p")
                }
            ]
        }

    async def tool_get_weather(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return {
            "temperature": "29°C (84°F)",
            "condition": "Partly Cloudy with Coastal Breeze",
            "humidity": "72%",
            "sunset": "06:42 PM"
        }

    async def tool_create_service_request(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return {
            "ticket_id": f"SR-{uuid.uuid4().hex[:5].upper()}",
            "room_number": args.get("room_number", "Unspecified"),
            "request_description": args.get("request_description"),
            "status": "DISPATCHED_TO_HOUSEKEEPING",
            "estimated_completion": "15 minutes"
        }

    async def tool_create_support_ticket(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return {
            "ticket_id": f"TKT-{uuid.uuid4().hex[:5].upper()}",
            "issue_summary": args.get("issue_summary"),
            "status": "OPEN",
            "priority": "HIGH",
            "message": "Support ticket created. Front desk team notified."
        }

    async def tool_handoff_to_human(self, args: Dict[str, Any], organization_id: str, property_id: str) -> Dict[str, Any]:
        return {
            "status": "HUMAN_HANDOFF_INITIATED",
            "reason": args.get("reason", "Customer requested human assistant"),
            "assigned_desk": "Front Desk Concierge",
            "message": "I am connecting you with a front desk representative right now. Please hold on for a moment."
        }
