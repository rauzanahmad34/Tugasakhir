from flask import redirect, render_template, url_for, jsonify, flash
from app.models.Penyakit import *
import os, sys
import pandas as pd

def index():
    data = Penyakit.get().serialize()
    return render_template('pages/penyakit/penyakit.html', data=data)

def create():
	return render_template('pages/penyakit/create.html')


def store(request):
    try:
        post = request.form
        data = {
            "kode_penyakit" : post['kode_penyakit'],
            "nama_penyakit" : post['nama_penyakit'],
            "penyebab" : post['penyebab'],
            "solusi" : post['solusi'],
        }
        Penyakit.store(data)
        flash('Data berhasil di simpan.!', 'success')
        return redirect(url_for('penyakit_index'))
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return 'Something went wrong ' + str(e)

def edit(id):
	try:
		data = Penyakit.find_or_fail(id).serialize()
		return render_template('/pages/penyakit/edit.html', data=data)
	except Exception as e:
		return 'Something went wrong ' + str(e)

def update(request, id):
    try:
        post = request.form
        data = Penyakit.find(id)
        data.kode_penyakit = post['kode_penyakit']
        data.nama_penyakit = post['nama_penyakit']
        data.penyebab = post['penyebab']
        data.solusi = post['solusi']
        data.save()
        flash('Data berhasil di update.!', 'success')
        return redirect(url_for('penyakit_index'))
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return 'Something went wrong ' + str(e)

def delete(id):
	try:
		delete = Penyakit.find(id).delete()
		flash('Data berhasil di update.!', 'success')
		return redirect(url_for("penyakit_index"))
	except Exception as e:
		return 'Something went wrong ' + str(e)
