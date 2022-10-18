from dataclasses import dataclass
from flask import render_template, redirect, url_for, flash
from app.models.User import *
import bcrypt

def index():
    data = User.get().serialize()
    return render_template('pages/user/index.html', users=data)

def create():
	return render_template('pages/user/create.html')

def store(data):
	if data['password'] == data['password1']:
		password = bcrypt.hashpw(data['password'].encode('utf8'), bcrypt.gensalt()) ## encode password menggunakan bcrypt
		user = {
			"username" : data['username'],
			"name"     : data['nama'],
			"password" : password
		}
		User.store(user)
		flash(u'Admin Berhasil Di tambahkan', 'success')
		return redirect(url_for("user_index"))
	else:
		flash(u'Password Tidak Sesuai', 'danger')
		return redirect(url_for("user_index"))

def edit(id):
	data = User.find_or_fail(id).serialize()
	# print(data)
	user = User.find(id)
	return render_template('/pages/user/edit.html', data=data, user=user)

def update(request, id):
	try:
		post = request.form
		user = User.find(id)
		user.username = post['username']
		user.name     = post['nama']
		if post['password'] != "":
			password = bcrypt.hashpw(post['password'].encode('utf8'), bcrypt.gensalt())
			user.password = password
		user.save()
		flash('Data berhasil di update.!', 'success')
		return redirect(url_for('user_index'))
	except Exception as e:
		return 'Something went wrong ' + str(e)

def delete(id):
	try:
		delete = User.find(id).delete()
		flash('Data berhasil di update.!', 'success')
		return redirect(url_for("user_index"))
	except Exception as e:
		return 'Something went wrong ' + str(e)