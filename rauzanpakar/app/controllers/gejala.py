from flask import redirect, render_template, url_for, jsonify, flash
from app.models.Gejala import *
import os, sys
import pandas as pd

def index():
    data = Gejala.get().serialize()
    return render_template('pages/gejala/index.html', data=data)

def create():
	return render_template('pages/gejala/create.html')


def store(request):
    try:
        post = request.form
        data = {
            "kode_gejala" : post['kode_gejala'],
            "nama_gejala" : post['nama_gejala'],
            "nilai" : post['nilai'],
        }
        Gejala.store(data)
        flash('Data berhasil di simpan.!', 'success')
        return redirect(url_for('gejala_index'))
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return 'Something went wrong ' + str(e)

def edit(id):
	try:
		data = Gejala.find_or_fail(id).serialize()
		return render_template('/pages/gejala/edit.html', data=data)
	except Exception as e:
		return 'Something went wrong ' + str(e)

def update(request, id):
    try:
        post = request.form
        data = Gejala.find(id)
        data.kode_gejala = post['kode_gejala']
        data.nama_gejala = post['nama_gejala']
        data.nilai = post['nilai']
        data.save()
        flash('Data berhasil di update.!', 'success')
        return redirect(url_for('gejala_index'))
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return 'Something went wrong ' + str(e)

def delete(id):
	try:
		delete = Gejala.find(id).delete()
		flash('Data berhasil di update.!', 'success')
		return redirect(url_for("gejala_index"))
	except Exception as e:
		return 'Something went wrong ' + str(e)
