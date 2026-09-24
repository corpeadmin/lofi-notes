from django.db import migrations


def seed_welcome_note(apps, schema_editor):
    Note = apps.get_model("api", "Note")
    if not Note.objects.filter(title="Welcome to Lofi Notes").exists():
        Note.objects.create(
            title="Welcome to Lofi Notes",
            content=(
                "Grab a tea, put on some lo-fi beats, and write something down. "
                "Your notes are saved automatically to SQLite."
            ),
        )


def remove_welcome_note(apps, schema_editor):
    Note = apps.get_model("api", "Note")
    Note.objects.filter(title="Welcome to Lofi Notes").delete()


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_welcome_note, remove_welcome_note),
    ]