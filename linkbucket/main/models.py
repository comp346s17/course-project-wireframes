from __future__ import unicode_literals
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import User
from django.db import models

# Create your models here.

#Model for a single bucket
class Bucket(models.Model):
	title = models.TextField()
	description = models.TextField()
	creator = models.ForeignKey('auth.user')

	def to_json(self):
		return {
			'title': self.title,
			'desc': self.description,
			'creator': self.creator,
		}

#Model for single link
class Link(models.Model):
	title = models.TextField()
	buckets = models.ManyToManyField('Bucket')
	link_url = models.TextField()

	def to_json(self):
		return {
			'title':self.title,
			'buckets': self.buckets,
			'url': self.link_url,
		}

#Model for single User
class User(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)


#Models that are required for creating accounts
class Account(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)

    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    tagline = models.CharField(max_length=140, blank=True)

    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name