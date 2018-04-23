from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework.authtoken.models import Token


# id, username, password, email, first_name, last_name 
class User(AbstractUser):
    created = models.DateTimeField(auto_now_add=True)
    birthday = models.DateTimeField(blank=True, null=True)
    city = models.CharField(max_length=50, blank=True)
    information = models.CharField(
        max_length=255, 
        blank=True, 
        verbose_name='About me')

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Tag(models.Model):
    title = models.CharField(max_length=100  )
    user = models.ForeignKey(
        User, 
        related_name='tags', 
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('tag-detail', args=[self.title], )
    

class Entry(models.Model):
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    changed = models.DateTimeField(auto_now=True, null=True)

    user = models.ForeignKey(
    	User, 
    	related_name='entries', 
    	on_delete=models.CASCADE
    )
    diary = models.ForeignKey(
    	'Diary', 
    	related_name='entries', 
    	on_delete=models.CASCADE
    )
    
    title = models.CharField(max_length=100, blank=True, default='No title')
    miniature = models.ImageField(
    	max_length=100, 
    	blank=True, 
    	null=True, 
    	upload_to='api/entry/miniature/'
    )
    text = models.TextField(blank=True)
    tags = models.ManyToManyField(Tag, related_name='entries', blank=True)
    
    public_id = models.PositiveIntegerField(null=True, blank=True)
    common = models.BooleanField(default=False)
    published = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name_plural = 'entries'

    def __str__(self):
        return 'user: {}, diary_id: {}, id: {}'.format(
            self.user, self.diary.id, self.id)
    
    @property
    def tag_list(self):
        lst = [tag.name for tag in self.tags.all()]

        return ', '.join(lst) 


class Diary(models.Model):
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    changed = models.DateTimeField(auto_now=True, null=True)
    user = models.ForeignKey(
    	User, 
    	related_name='diaries', 
    	on_delete=models.CASCADE
    )
    title = models.CharField(max_length=100)
    miniature = models.ImageField(
        max_length=100, 
        upload_to='api/diary/miniature/',
        blank=True,
        null=True
    )
    common = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'diaries'

    def __str__(self):
        return 'user: {}, diary_id: {}'.format(
            self.user, self.id)


class Note(models.Model):
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    text = models.TextField()
    notebook = models.ForeignKey(
    	'Notebook', 
    	on_delete=models.CASCADE, 
    	related_name='notes'
    )


class Notebook(models.Model):
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    title = models.CharField(max_length=255, unique=True)


class Comment(models.Model):
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    text = models.TextField()
    author = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='comments'
    )
    entry = models.ForeignKey(
        Entry, 
        on_delete=models.CASCADE, 
        related_name='comments'
    )