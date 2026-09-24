from django.db import models


class Note(models.Model):
    """A single note, the heart of Lofi Notes."""

    title = models.CharField(max_length=200)
    content = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return self.title