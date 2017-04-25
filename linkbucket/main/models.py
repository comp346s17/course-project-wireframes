from __future__ import unicode_literals

from django.db import models

# Create your models here.

#Model for a single bucket
class Bucket(models.Model):
	title = models.TextField()
	creator = models.ForeignKey('auth.user')
	links = models.OneToManyField('Link')


#Model for single link
class Link(models.Model):
	title = models.TextField()
	bucket = models.OneToManyField('Bucket')
	link_ref = models.TextField()


