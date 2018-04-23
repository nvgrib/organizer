from rest_framework import serializers

from .models import User, Tag, Entry, Diary, Comment, Note, Notebook


class UserListSerializer(serializers.HyperlinkedModelSerializer):
	url = serializers.HyperlinkedIdentityField(view_name='user-detail')

	class Meta:
		model = User
		fields = ('url', 'id', 'username')


class UserDetailSerializer(serializers.HyperlinkedModelSerializer):
	url = serializers.HyperlinkedIdentityField(view_name='user-detail')
	diaries = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )

	class Meta:
		model = User
		fields = (
            'url', 'id', 'username', 
            'email', 'first_name', 'last_name', 'birthday', 'city', 'information', 
            'diaries'
        )


class DiaryDetailSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    entries = serializers.PrimaryKeyRelatedField(read_only=True, many=True) 

    class Meta:
        model = Diary
        fields = (
            'url', 'id', 'created', 'changed', 'user', 
            'title', 'miniature', 'common', 'entries'
        )
        read_only_fields = ('id', 'created', 'changed')


class EntryDetailSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    diary = serializers.PrimaryKeyRelatedField(queryset=Diary.objects.all())

    class Meta:
        model = Entry
        fields = (
            'url', 'id',
            'diary', 'title', 'miniature', 'text', 'user', 
            'created', 'changed', 'common', 'published', 'tags',
        )
        read_only_fields = ('id', 'created', 'changed', 'tags')
        

class TagDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ('url', 'id', 'name', 'entries')


class TagListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ('url', 'id', 'name')


class CommentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comment
		fields = ('id', 'author', 'entry', 'text', 'created')


class NoteSerializer(serializers.ModelSerializer):
	class Meta:
		model = Note
		fields = ('id', 'notebook', 'text', 'created')


class NotebookSerializer(serializers.ModelSerializer):
	class Meta:
		model = Notebook
		fields = ('id', 'title', 'created')