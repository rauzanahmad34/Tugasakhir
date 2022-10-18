from flask import render_template, redirect, url_for, flash, request
from app.config.helper import returnAPI
from app.models.Berita import *
from app.models.Gejala import *
from app.models.Rules import *
from app.models.HasilAnalisa import *
from app.models.Penyakit import *
from app.models.User import *

import bcrypt
import sys,os
msg_error          = 'Something went wrong, please try again later'

def register(request):
    try:
        post       = request.form
        checkEmail = User.where('email', '=', post['email']).first()
        if checkEmail is None:
            password = bcrypt.hashpw(post['password'].encode('utf8'), bcrypt.gensalt()) ## encode password menggunakan bcrypt
            data     = {
                'name' 			: post['name'],
                'phone' 		: post['phone'],
                'email' 		: post['email'],
                'password' 		: password
            }
            User.store(data)
            return returnAPI(200, 'Register berhasil.!')
        else:
            return returnAPI(201, 'Email sudah terdaftar.!')
    except Exception as e:
        error_detail = [str(e)]
        return returnAPI(500, msg_error,error_detail)

def login(request):
    try:
        post = request.form
        checkEmail = User.where('email', '=', post['email']).first()
        if checkEmail is not None:
            checkEmail = checkEmail.serialize()
            if bcrypt.checkpw(post['password'].encode('utf8'), checkEmail['password'].encode('utf8')):
                return returnAPI(200, 'Login berhasil.!', checkEmail)
            else:
                return returnAPI(202, 'Password yang anda masukan salah.!')
        else:
            return returnAPI(201, 'Email yang anda masukan tidak terdaftar.!')
    except Exception as e:
        error_detail = [str(e)]
        return returnAPI(500, msg_error,error_detail)

def ListGejala():
    try:
        data = Gejala.select('id','kode_gejala', 'nama_gejala', 'nilai').get().serialize()
        return returnAPI(200, 'Success', data)
    except Exception as e:
        error_detail = [str(e)]
        return returnAPI(500, msg_error,error_detail)

def addAnalisa(request):
    try:
        post = request.form
        gejala = post.getlist('gejala')
        print(gejala)
        if len(gejala) < 1:
            flash('Silahkan pilih minimal satu gejala.!', 'danger')
            return redirect(url_for('algoritma_create'))
        # Set nilai X (Nilai sementara) Ini silahkan di ganti bebas
        data_rules = Rules.whereIn(gejala)
        X1 = 0.25
        X2 = 0.15

        # Lapisan 1 (Menentukan nilai Mx1 dan Mx2 dengan cara melihat nilai tertinggi dan teredah)
        print('=============== LAPISAN 1 ===============')
        print(data_rules)
        sum_d = {}
        M_max = []
        for n in data_rules:
            bobot = [r[1] for r in data_rules[n]]
            sum_b = sum(bobot)
            sum_d[n] = sum_b
            print('----------')
            print(bobot)
            print(sum_b)
            print('----------')
            calc_Mn = round(X1/sum_b, 4)
            M_max.append(calc_Mn)
        Max_n = max(M_max)

        M_min = []
        for n in data_rules:
            bobot   = [r[1] for r in data_rules[n]]
            calc_Mn = round(X2/sum(bobot), 4)
            M_min.append(calc_Mn)

        Min_n = min(M_min)

        print('Max', M_max)
        print('Min', M_min)

        print('Max Value', Max_n)
        print('Min Value', Min_n)

        # Lapis 2 (Perhitungan pada lapisan kedua dapat kita ambil dari perhitungan pada lapisan kesatu dengan cara melihat nilai tertinggi dan terendah sehingga menghasilkan w1 dan w2)
        print('=============== LAPISAN 2 ===============')
        W1 = Max_n
        W2 = Min_n
        print(W1, W2)

        # Lapisan 3 (Lapisan ketiga mencari nilai Wt1 dan wt2 dengan cara :
        #       Wt1 = w1 / (w1+w2)
        #       Wt2 = w2 / (w1+w2)
        #       Nilai w1 dan w2 diambil dari lapisan ke dua)
        print('=============== LAPISAN 3 ===============')
        Wt1 = round(W1/(W1+W2), 4)
        Wt2 = round(W2/(W1+W2), 4)
        print('Wt1', Wt1)
        print('Wt2', Wt2)

        # Lapisan 4 (Perhitungan pada lapisan keempat mencari nilai w1f1
        #       W1f1 = wt1  ( p1*xi + q1*xi + r1*xi + s1*xi + t1*xi + u1*xi)
        #       Nilai wt1 diambil dari lapisan ke tiga, p1 prioritas tertinggi, (q1,r1,s1,t1,u1 nilai awal)
        #       W1f2= wt2 ( p2*xi + q2*xi + r2*xi + s2*xi + t2*xi + u2*xi)
        #       Nilai wt2 diambil dari lapisan ke tiga, p2 prioritas terendah, (q2,r2,s2,t2,u2 nilai awal))
        print('=============== LAPISAN 4 ===============')
        W1f1_q = [(Max_n*1)]
        W1f2_q = [(Min_n*1)]
        for max_n in M_max:
            W1f1_q.append((max_n*1))
        print(W1f1_q)

        for min_n in M_min:
            W1f2_q.append((min_n*1))
        print(W1f2_q)

        W1f1 = round(Wt1*(sum(W1f1_q)), 5)
        W1f2 = round(Wt2*(sum(W1f2_q)), 5)
        print('W1f1', W1f1)
        print('W1f2', W1f2)

        # Lapisan 5 (Langkah selanjutnya mencari nilai wifi dengan cara :
        #       Wifi = w1f1 + w2f2
        #       Nilai w1f1 dan w2f2diambil dari lapisan ke empat
        #       Langkah selanjutnya mencari nilai wti :
        #       Wti = wt1+wt2
        #       Nilai wt1 dan wt2 diambil dari lapisan ketiga
        #       Dan terakhir mencari nilai output:
        #       Out = wifi / wti
        #       Ketereangan :
        #          X1 = 0,25
        #          X2 = 0,15
        #          (X1,X2 = Nilai sementara))

        # Langkah selanjutnya mencari nilai wiFi dengan cara :
        Wifi = W1f1+W1f2
        print('Maka nilai wifi =', Wifi)
        # Langkah selanjutnya mencari nilai wti dengan cara  : 
        Wti = Wt1+Wt2
        print('Maka nilai Wti =', Wti)

        # Langkah selanjutnya mencari nilai outputdengan cara :
        Y = Wifi/Wti
        print('Maka nilai Y = ', Y)

        n_code = max(sum_d, key=sum_d.get)

        hasil = HasilAnalisa()
        hasil.user_id       = post['user_id']
        hasil.nama          = post['nama']
        hasil.kode_penyakit = n_code
        hasil.percentage    = Y
        hasil.save()

        penyakit = Penyakit.where('kode_penyakit', hasil.serialize()['kode_penyakit']).first().serialize()
        print(penyakit)
        persentasi = round(float(hasil.serialize()['percentage'])*100, 2)

        hasil_analisa = {
            'Jenis Penyakit' : penyakit['nama_penyakit'],
            'Persentasi' : persentasi,
            'Solusi'    : penyakit['solusi']
        }
        return returnAPI(200,'Success', hasil_analisa)
    except Exception as e:
        error_detail = [str(e)]
        return returnAPI(500, msg_error,error_detail)

def ListOreder(request):
    try:
        args = request.args
        data = HasilAnalisa.where('user_id', args['user_id']).order_by('created_at', 'desc').get().serialize()
        for x in range(len(data)):
            penyakit = Penyakit.with_trashed().where('kode_penyakit', data[x]['kode_penyakit']).first()
            if penyakit != None:
                penyakit = penyakit.serialize()
                data[x]['nama_penyakit'] = penyakit['nama_penyakit']
                data[x]['solusi']        = penyakit['solusi']
                data[x]['percentage']    = round(float(data[x]['percentage'])*100,2)
                data[x]['penyebab']      = penyakit['penyebab']
                print(data)
        return returnAPI(200, 'Success', data)
    except Exception as e:
        # exc_type, exc_obj, exc_tb = sys.exc_info()
        # fname        = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        # error_detail = [str(exc_type)+' '+str(fname)+' '+str(exc_tb.tb_lineno)]
        # return returnAPI(500, msg_error,error_detail)

        error_detail = [str(e)]
        return returnAPI(500, msg_error,error_detail)



def ListBerita(request):
    try:
        data = Berita.order_by('created_at', 'DESC').get().serialize()
        return returnAPI(200, 'Success', data)
    except Exception as e:
        error_detail = [str(e)]
        return returnAPI(500, msg_error,error_detail)