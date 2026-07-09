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
                aircraft = await sync_to_async(
                    fetch_live_aircraft
                )(10)
                await sync_to_async(save_flight_logs)(aircraft)

                await self.send_json({
                    "type": "radar_update",
                    "aircraft": aircraft,
                })

            except asyncio.CancelledError:
                break
            except Exception as e:
                try:
                    await self.send_json({
                        "type": "error",
                        "message": str(e),
                    })
                except:
                    pass

            try:
                await asyncio.sleep(12)
            except asyncio.CancelledError:
                break

    async def disconnect(self, close_code):
        if hasattr(self, "task") and not self.task.done():
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