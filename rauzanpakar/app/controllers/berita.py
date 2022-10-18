from flask import redirect, render_template, url_for, jsonify, flash
from app.models.Berita import *
import os, sys
import pandas as pd

def index():
    data = Berita.get().serialize()
    return render_template('pages/berita/index.html', data=data)

def create():
	return render_template('pages/berita/create.html')


def store(request):
    try:
        post = request.form
        data = {
            "judul" : post['judul'],
            "isi"   : post['isi'],
        }
        Berita.store(data)
        flash('Data berhasil di simpan.!', 'success')
        return redirect(url_for('berita_index'))
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return 'Something went wrong ' + str(e)

def edit(id):
	try:
		data = Berita.find_or_fail(id).serialize()
		return render_template('/pages/berita/edit.html', data=data)
	except Exception as e:
		return 'Something went wrong ' + str(e)

def update(request, id):
    try:
        post = request.form
        data       = Berita.find(id)
        data.judul = post['judul']
        data.isi   = post['isi']
        data.save()
        flash('Data berhasil di update.!', 'success')
        return redirect(url_for('berita_index'))
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return 'Something went wrong ' + str(e)

def delete(id):
	try:
		delete = Berita.find(id).delete()
		flash('Data berhasil di update.!', 'success')
		return redirect(url_for("berita_index"))
	except Exception as e:
		return 'Something went wrong ' + str(e)
