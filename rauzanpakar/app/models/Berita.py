from app.config.db import db
from orator import Model, SoftDeletes

Model.set_connection_resolver(db)

class Berita(SoftDeletes,Model):
    __table__   = 'berita' 
    __guarded__ = ['id']
    __dates__ = ['deleted_at']
    
    def store(request):
        input_data = Berita()
        input_data.judul = request['judul']
        input_data.isi   = request['isi']
        input_data.save()
        return True