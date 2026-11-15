from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    dependencies = [("app1", "0019_initial")]
    operations = [
        migrations.AlterField(
            model_name="cartitem", name="dog",
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name="cart", to="app1.dogs"),
        ),
        migrations.AddField(model_name="cartitem", name="bunny", field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to="app1.bunnies")),
        migrations.AddField(model_name="cartitem", name="cat", field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to="app1.cats")),
        migrations.AddField(model_name="cartitem", name="hamster", field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to="app1.hamster")),
    ]
