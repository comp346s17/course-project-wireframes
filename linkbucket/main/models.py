from __future__ import unicode_literals
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