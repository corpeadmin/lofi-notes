from rest_framework import permissions, viewsets

from .models import Note
from .serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    """Full CRUD for notes: list, create, retrieve, update, delete."""

    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.AllowAny]