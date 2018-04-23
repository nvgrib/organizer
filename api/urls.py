from django.urls import path

from . import views


urlpatterns = [
	path('', views.root, name='root'),
	
	path('account/', views.AccountDetail.as_view(), name='account-detail'),
	path('users/', views.UserList.as_view(), name='user-list'),
	path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),

	path('diaries/', views.DiaryList.as_view(), name='diary-list'),
	path('diaries/<int:pk>/', views.DiaryDetail.as_view(), name='diary-detail'),
	path('entries/', views.EntryList.as_view(), name='entry-list'),
	path('entries/<int:pk>/', views.EntryDetail.as_view(), name='entry-detail'),
	
	path('tags/', views.TagList.as_view(), name='tag-list'),
	path('tags/<int:pk>/', views.TagDetail.as_view(), name='tag-detail'),
]