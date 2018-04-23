from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse

from .models import User, Tag, Entry, Diary
from .serializers import (
    UserListSerializer, 
    UserDetailSerializer,
    TagListSerializer,
    TagDetailSerializer,
    EntryDetailSerializer, 
    DiaryDetailSerializer
)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'diaries': reverse('diary-list', request=request, format=format),
        'tags': reverse('tag-list', request=request, format=format),
    })

class AccountDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer

    def get_object(self):
        filter = {
            'username': self.request.user.username
        }
        
        obj = get_object_or_404(self.queryset, **filter)
        return obj


class UserList(generics.ListAPIView):
	queryset = User.objects.all()
	serializer_class = UserListSerializer


class UserDetail(generics.RetrieveAPIView):
	queryset = User.objects.all()
	serializer_class = UserDetailSerializer


class DiaryList(generics.ListCreateAPIView):
    serializer_class = DiaryDetailSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Diary.objects.all()

    def get_queryset(self):
        queryset = Diary.objects.all()
        user = self.request.query_params.get('user', None)
        
        if user is not None:
            queryset = queryset.filter(user=user)
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DiaryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DiaryDetailSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        queryset = Diary.objects.all()
        user = self.request.query_params.get('user', None)
        
        if user is not None:
            queryset = queryset.filter(user=user)
        
        return queryset


class EntryList(generics.ListCreateAPIView):
    serializer_class = EntryDetailSerializer
    permission_classes = (IsAuthenticated, )
    queryset = Entry.objects.all()

    def get_queryset(self):
        queryset = Entry.objects.all()
        user = self.request.query_params.get('user', None)
        diary = self.request.query_params.get('diary', None)
        
        if user is not None:
            queryset = queryset.filter(user=user)
        if diary is not None:
            queryset = queryset.filter(diary=diary)
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class EntryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Entry.objects.all()
    serializer_class = EntryDetailSerializer


class TagList(generics.ListAPIView):
    serializer_class = TagListSerializer
    permission_classes = (IsAuthenticated, )


    def get_queryset(self):
        user = self.request.user
        return user.tags.all()


class TagDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TagDetailSerializer

    def get_queryset(self):
        return self.request.user.tags