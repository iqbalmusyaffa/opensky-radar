from django.db import models

# Create your models here.

# Pesawat yang diikuti (Follow)
class FollowedAircraft(models.Model):

    icao24 = models.CharField(
        max_length=10,
        unique=True
    )

    callsign = models.CharField(
        max_length=10,
        blank=True,
        null=True
    )

    origin_country = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    is_following = models.BooleanField(
        default=True
    )

    followed_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-followed_at"]

    def __str__(self):
        return self.callsign or self.icao24


# Riwayat koordinat pesawat
class FlightLog(models.Model):

    followed_aircraft = models.ForeignKey(
        FollowedAircraft,
        on_delete=models.CASCADE,
        related_name="logs"
    )

    latitude = models.FloatField()

    longitude = models.FloatField()

    altitude = models.FloatField()

    timestamp = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.followed_aircraft} - {self.timestamp}"