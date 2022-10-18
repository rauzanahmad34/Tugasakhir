from app.config.db import db
from orator import Model, SoftDeletes

Model.set_connection_resolver(db)

class Rules(SoftDeletes,Model):
    __table__   = 'rules' 
    __guarded__ = ['id']
    __dates__ = ['deleted_at']
    
    def store(request):
        input_data = Rules()
        input_data.gejala_id   = request['gejala_id']
        input_data.penyakit_id = request['penyakit_id']
        input_data.save()
        return True

    def whereIn(gejala):
        data = Rules.join('gejala AS g', 'g.id', '=', 'rules.gejala_id')\
            .join('penyakit AS p', 'p.id', '=', 'rules.penyakit_id')\
            .select('rules.*', 'p.kode_penyakit', 'p.nama_penyakit', 'g.kode_gejala', 'g.nama_gejala', 'g.nilai')\
            .where_raw('gejala_id IN ('+", ".join(gejala)+')').get().serialize()

        return_data = {}
        for d in data:
            if d['kode_penyakit'] not in return_data:
                # return_data.append(d['kode_penyakit'])
                return_data[d['kode_penyakit']] = [[d['kode_gejala'], d['nilai']]]
            else:
                return_data[d['kode_penyakit']].append([d['kode_gejala'], d['nilai']])
        # print(return_data)

        return return_data