# Generated by Django 5.1.5 on 2025-02-12 21:12

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("healix", "0002_appointment_patient_email_appointment_status_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="doctor",
            name="phd_certificate",
            field=models.FileField(
                blank=True, null=True, upload_to="doctor_certificates/"
            ),
        ),
    ]
