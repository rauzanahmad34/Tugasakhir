from flask import redirect, render_template, url_for, jsonify, flash
from app.models.Gejala import *
from app.models.Penyakit import *
from app.models.Rules import *
import os, sys
import pandas as pd


def index():
    data = Rules.join('gejala AS g', 'g.id','=', 'rules.gejala_id')\
        .join('penyakit AS p', 'p.id', '=', 'rules.penyakit_id')\
        .select('rules.*', 'p.kode_penyakit', 'p.nama_penyakit', 'g.kode_gejala', 'g.nama_gejala')\
        .get().serialize()
    return render_template('pages/rules/index.html', data=data)

def create():
    gejala   = Gejala.get().serialize()
    penyakit = Penyakit.get().serialize()
    return render_template('pages/rules/create.html', gejala=gejala, penyakit=penyakit)

def store(request):
    try:
        post = request.form
        check_exist = Rules.where('gejala_id', post['gejala'])\
            .where('penyakit_id', post['penyakit'])\
            .first()

        if check_exist is not None:
            flash('Kombinasi gejala dan penyakit sudah ada.!', 'danger')
            return redirect(url_for('rules_index'))

        data = {
            "gejala_id" : post['gejala'],
            "penyakit_id" : post['penyakit'],
        }
        Rules.store(data)
        flash('Data berhasil di simpan.!', 'success')
        return redirect(url_for('rules_index'))
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return 'Something went wrong ' + str(e)

def edit(id):
    try:
        data     = Rules.find_or_fail(id).serialize()
        gejala   = Gejala.get().serialize()
        penyakit = Penyakit.get().serialize()
        return render_template('/pages/rules/edit.html', data=data, gejala=gejala, penyakit=penyakit)
    except Exception as e:
        return 'Something went wrong ' + str(e)

def update(request, id):
    try:
        post = request.form

        check_exist = Rules.where('gejala_id', post['gejala'])\
            .where('penyakit_id', post['penyakit'])\
            .where_raw('rules.id != '+str(id))\
            .first()

        if check_exist is not None:
            flash('Kombinasi gejala dan penyakit sudah ada.!', 'danger')
            return redirect(url_for('rules_index'))

        data = Rules.find(id)
        data.gejala_id = post['gejala']
        data.penyakit_id = post['penyakit']
        data.save()
        
        flash('Data berhasil di update.!', 'success')
        return redirect(url_for('rules_index'))
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return 'Something went wrong ' + str(e)

def delete(id):
	try:
		delete = Rules.find(id).delete()
		flash('Data berhasil di update.!', 'success')
		return redirect(url_for("rules_index"))
	except Exception as e:
		return 'Something went wrong ' + str(e)
