from app.config.db import db
from orator import Model, SoftDeletes

Model.set_connection_resolver(db)

class Penyakit(SoftDeletes,Model):
    __table__   = 'penyakit' 
    __guarded__ = ['id']
    __dates__ = ['deleted_at']
    
    def store(request):
        input_data = Penyakit()
        input_data.kode_penyakit = request['kode_penyakit']
        input_data.nama_penyakit = request['nama_penyakit']
        input_data.penyebab      = request['penyebab']
        input_data.solusi        = request['solusi']
        input_data.save()
        return True