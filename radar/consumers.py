import asyncio

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .opensky import fetch_live_aircraft
from .services import save_flight_logs

class LiveAircraftConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        await self.accept()
        self.task = asyncio.create_task(self.send_live_data())

    async def send_live_data(self):
        while True:
            try:
                print("=== Fetching aircraft ===")

                aircraft = await sync_to_async(
                    fetch_live_aircraft
                )(10)
                await sync_to_async(save_flight_logs)(aircraft)
                print(f"Jumlah aircraft: {len(aircraft)}")
                print(aircraft)

                await self.send_json({
                    "type": "radar_update",
                    "aircraft": aircraft,
                })

            except Exception as e:
                print("ERROR:", e)

                await self.send_json({
                    "type": "error",
                    "message": str(e),
                })

            await asyncio.sleep(5)

    async def disconnect(self, close_code):
        if hasattr(self, "task"):
            self.task.cancel()

async def receive(self, text_data=None, bytes_data=None):
    if text_data == "get_aircraft":
        aircraft = await sync_to_async(
            fetch_live_aircraft
        )(10)
        await sync_to_async(save_flight_logs)(aircraft)
        await self.send_json(
            {
                "type": "radar_update",
                "aircraft": aircraft,
            }
        )
        
async def disconnect(self, close_code):
    if hasattr(self, "task") and not self.task.done():
        self.task.cancel()