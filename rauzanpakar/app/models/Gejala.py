from app.config.db import db
from orator import Model, SoftDeletes

Model.set_connection_resolver(db)

class Gejala(SoftDeletes,Model):
    __table__   = 'gejala' 
    __guarded__ = ['id']
    __dates__ = ['deleted_at']
    
    def store(request):
        input_data = Gejala()
        input_data.kode_gejala = request['kode_gejala']
        input_data.nama_gejala = request['nama_gejala']
        input_data.nilai       = request['nilai']
        input_data.save()
        return True

    def whereIn(array = []):
        data        = Gejala.where_raw('id IN ('+", ".join(array)+')').get().serialize()
        data_return = []
        for d in data:
            data_return.append([d['kode_gejala'], d['nilai']])
        return data_return