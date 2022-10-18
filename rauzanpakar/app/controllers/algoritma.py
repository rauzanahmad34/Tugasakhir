from flask import redirect, render_template, url_for, jsonify, request, flash
from app.models.Algoritma import *
from app.models.Gejala import *
from app.models.Penyakit import *
from app.models.Rules import *
from app.models.HasilAnalisa import *
import os
import sys
import pandas as pd

def index():
    return render_template('pages/algoritma/index.html')

def create():
    gejala = Gejala.get().serialize()
    return render_template('pages/algoritma/create.html', gejala=gejala)

def analisa():
    # print()
    gejala = request.form.getlist('gejala')
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
    hasil.nama          = request.form['nama']
    hasil.kode_penyakit = n_code
    hasil.percentage    = Y
    hasil.save()
    print(hasil.serialize())
    return redirect(url_for('result_algo', id=hasil.serialize()['id']))
    return "Ok"

def result_algo(id):
    result = HasilAnalisa.find(id).serialize()
    penyakit = Penyakit.where('kode_penyakit', result['kode_penyakit']).first().serialize()

    persentasi = round(float(result['percentage'])*100, 2)
    return render_template('pages/algoritma/result.html', penyakit=penyakit, result=result, persentasi=persentasi)

def backup6():
    data_rules = Rules.whereIn(gejala)
    print(data_rules)

    X1 = 0.25
    X2 = 0.15
    for dr in data_rules:
        # Lapisan 1 (Menentukan nilai Mx1 dan Mx2 dengan cara melihat nilai tertinggi dan teredah)
        print('=============== LAPISAN 1 ===============')
        M_max = []
        M_min = []
        for n in data_rules[dr]:
            bobot   = n[1]
            calc_Mx = round(X1/bobot, 4)
            calc_Mn = round(X2/bobot, 4)
            M_max.append(calc_Mx)
            M_min.append(calc_Mn)
            
        Max_n = max(M_max)
        Min_n = min(M_min)
        print('Max Value', Max_n)
        print('Min Value', Min_n)

        W1 = Max_n
        W2 = Min_n

        Wt1 = round(W1/(W1+W2), 4)
        Wt2 = round(W2/(W1+W2), 4)
        print('Wt1', Wt1)
        print('Wt2', Wt2)

        W1f1_q = [(Max_n*1)]
        W1f2_q = [(Min_n*1)]
        for max_n in M_max:
            W1f1_q.append((max_n*1))

        for min_n in M_min:
            W1f2_q.append((min_n*1))
            
        print(W1f1_q)
        print(W1f2_q)

        W1f1 = round(Wt1*(sum(W1f1_q)), 5)
        W1f2 = round(Wt2*(sum(W1f2_q)), 5)
        print('W1f1', W1f1)
        print('W1f2', W1f2)

        # Langkah selanjutnya mencari nilai wiFi dengan cara :
        Wifi = W1f1+W1f2
        print('Maka nilai wifi =', Wifi)
        # Langkah selanjutnya mencari nilai wti dengan cara  : 
        Wti = Wt1+Wt2
        print('Maka nilai Wti =', Wti)

        # Langkah selanjutnya mencari nilai outputdengan cara :
        Y = Wifi/Wti
        print('Maka nilai Y = ', Y)

def backup5():
    data_rules = Rules.whereIn(gejala)
    print(data_rules)
    X = 0.25

    # Lapisan 1 (Nilai Crips)
    print('========================== NILAI CRISP ==========================')
    data_gejala    = Gejala.whereIn(gejala)
    df_data_gejala = pd.DataFrame(data_gejala, columns=['Kode Gejala', 'Bobot'])
    print(df_data_gejala)

    # Lapisan 2 (Nilai Fuzzy)
    print('========================== NILAI FUZZY ==========================')
    fuzzy_list_test = []
    for n in data_rules:
        bobot = [r[1] for r in data_rules[n]]
        _tmp = round(X/sum(bobot),3)
        fuzzy_list_test.append(_tmp)
    print(fuzzy_list_test)

    fuzzy_list = []
    for index, row in df_data_gejala.iterrows():
        tmp_fuzzy = round(X/row['Bobot'],3)
        fuzzy_list.append(tmp_fuzzy) # Append nilai Fuzzy ke variable baru
    print(fuzzy_list)

    # Masukan nilai fuzzy ke dataframe Gejala agar bisa terlihat
    df_data_gejala['Fuzzy'] = fuzzy_list
    min_value = min(fuzzy_list)
    print('Min Value', min_value)
    print(df_data_gejala)

    # Lapisan 3 (kombinasi dari semua nilai fuzzy aktivasi e-x= Min (x1, x2,x3, x4,......x8)) 
    print('========================== KOMBINASI e-x ==========================')
    l_ex = []
    for x in fuzzy_list_test:
        e_x = round(x*sum(fuzzy_list),3)
        l_ex.append(e_x)
        print(e_x)


    # Lapisan 4 (keluaran sistem neuro fuzzy)
    print('========================== KELUARAN SISTEM NEURO FUZZY ==========================')
    l_y = []
    for b in l_ex:
        y = 1/(1+b)
        l_y.append(y)
        print('Y', y)

    # Lapisan 5 (nilai keluaran dari faktor kepastian aturan CF)
    print('========================== Nilai Keluaran CF ==========================')
    for c in range(len(l_y)):
        y1 = (l_ex[c]/l_y[c])*100
        print('Persentase y1', y1)

def backup4():
    data_rules = Rules.whereIn(gejala)
    j = 1

    # Lapisan 1 :
    #   Pada perhitungan layer 1 terhadap nilai X
    #   yang diperoleh dari masing-masing penyakit dilakukan dengan cara perkalian terhadap bobot
    #   tingkat kepastian
    print('=============== LAPISAN 1 ===============')
    print(data_rules)
    M_max     = {}
    M_max_arr = []
    for n in data_rules:
        _max     = len(data_rules[n])/j
        M_max[n] = _max
        M_max_arr.append(_max)

    # Lapisan 2 : 
    #   Pada perhitungan layer 2 terhadap nilai X
    #   yang sudah dihitung dengan bobot tingkat kepas
    print('=============== LAPISAN 2 ===============')
    Max_data = M_max
    print(Max_data)

    # Lapisan 3 : 
    #   Pada perhitungan layer 3 terhadap nilai X
    #   yang sudah diperoleh nilai MAX masing-masing
    #   penyakit dibagi dengan total nilai MAX semua
    #   penyakit.
    print('=============== LAPISAN 3 ===============')
    layer_3 = {}
    for md in Max_data:
        _tmp = round(Max_data[md]/(sum(M_max_arr)), 4)
        layer_3[md] = _tmp
    print(layer_3)

    # Lapisan 4 : 
    #   Pada perhitungan layer 4 terhadap nilai X
    #   yang sudah diperoleh jumlah dari perhitungan
    #   sebelumnya masing-masing penyakit.
    print('=============== LAPISAN 4 ===============')
    layer_4 = {}
    for le in layer_3:
        print(layer_3[le])
        print(Max_data[le])
        print('--')
        _tmp = layer_3[le]*(Max_data[le]*0.5)
        print(_tmp)

def backup3():
    X1 = 0.25
    X2 = 0.15

    # Lapisan 1 (Menentukan nilai Mx1 dan Mx2 dengan cara melihat nilai tertinggi dan teredah)
    print('=============== LAPISAN 1 ===============')
    M_max = []
    for n in data_rules:
        bobot = [r[1] for r in data_rules[n]]
        calc_Mn = round(X1/sum(bobot), 4)
        M_max.append(calc_Mn)
    Max_n = max(M_max)

    M_min = []
    for n in data_rules:
        bobot   = [r[1] for r in data_rules[n]]
        calc_Mn = round(X2/sum(bobot), 4)
        M_min.append(calc_Mn)

    Min_n = min(M_min)
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
    #       X1 = 0,25
    #       X2 = 0,15
    #       (X1,X2 = Nilai sementara) )

    # Langkah selanjutnya mencari nilai wiFi dengan cara :
    Wifi = W1f1+W1f2
    print('Maka nilai wifi =', Wifi)
    # Langkah selanjutnya mencari nilai wti dengan cara  : 
    Wti = Wt1+Wt2
    print('Maka nilai Wti =', Wti)

    # Langkah selanjutnya mencari nilai outputdengan cara :
    Y = Wifi/Wti
    print('Maka nilai Y = ', Y)

def backup2():
    X1 = 0.25
    X2 = 0.15
    # Lapisan 1 (Menentukan nilai Mx1 dan Mx2 dengan cara melihat nilai tertinggi dan teredah)
    print('=============== LAPISAN 1 ===============')
    data_gejala    = Gejala.whereIn(gejala)
    df_data_gejala = pd.DataFrame(data_gejala, columns=['Kode Gejala', 'Bobot'])

    M_max = []
    for index, row in df_data_gejala.iterrows():
        calc_Mn = round(X1/row['Bobot'], 4)
        M_max.append(calc_Mn)
    df_data_gejala['M_max'] = M_max
    Max_n = max(M_max)

    M_min = []
    for index, row in df_data_gejala.iterrows():
        calc_Mn = round(X2/row['Bobot'], 4)
        M_min.append(calc_Mn)

    Min_n = min(M_min)
    df_data_gejala['M_min'] = M_min
    print(df_data_gejala)
    
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
    #       X1 = 0,25
    #       X2 = 0,15
    #       (X1,X2 = Nilai sementara) )

    # Langkah selanjutnya mencari nilai wiFi dengan cara :
    Wifi = W1f1+W1f2
    print('Maka nilai wifi =', Wifi)
    # Langkah selanjutnya mencari nilai wti dengan cara  : 
    Wti = Wt1+Wt2
    print('Maka nilai Wti =', Wti)

    # Langkah selanjutnya mencari nilai outputdengan cara :
    Y = Wifi/Wti
    print('Maka nilai Y = ', Y)

def backup():
    # Set nilai X (Nilai sementara) Ini silahkan di ganti bebas
    X = 0.25

    # Lapisan 1 (Nilai Crips)
    print('========================== NILAI CRISP ==========================')
    data_gejala = Gejala.whereIn(gejala)
    df_data_gejala = pd.DataFrame(data_gejala, columns=['Kode Gejala', 'Bobot'])
    print(df_data_gejala)

    # Lapisan 2 (Nilai Fuzzy)
    print('========================== NILAI FUZZY ==========================')
    fuzzy_list = []
    for index, row in df_data_gejala.iterrows():
        tmp_fuzzy = round(X/row['Bobot'],3)
        fuzzy_list.append(tmp_fuzzy) # Append nilai Fuzzy ke variable baru

    # Masukan nilai fuzzy ke dataframe Gejala agar bisa terlihat
    df_data_gejala['Fuzzy'] = fuzzy_list
    min_value = min(fuzzy_list)
    print('Min Value', min_value)
    print(df_data_gejala)

    # Lapisan 3 (kombinasi dari semua nilai fuzzy aktivasi e-x= Min (x1, x2,x3, x4,......x8)) 
    print('========================== KOMBINASI e-x ==========================')
    e_x = round(min_value*sum(fuzzy_list),3)
    print(e_x)


    # Lapisan 4 (keluaran sistem neuro fuzzy)
    print('========================== KELUARAN SISTEM NEURO FUZZY ==========================')
    y = 1/(1+e_x)
    print('Y', y)

    # Lapisan 5 (nilai keluaran dari faktor kepastian aturan CF)
    print('========================== Nilai Keluaran CF ==========================')
    y1 = (e_x/y)*100
    print('Persentase y1', y1)


