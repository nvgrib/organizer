from django.contrib import admin

from .models import User, Tag, Entry, Diary


@admin.register(User)
class TagAdmin(admin.ModelAdmin):
	pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
	pass


@admin.register(Entry)
class EntryAdmin(admin.ModelAdmin):
	pass


@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):
	pass
