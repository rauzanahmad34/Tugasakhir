from app.config.db import db
from orator import Model, SoftDeletes

Model.set_connection_resolver(db)

class HasilAnalisa(SoftDeletes,Model):
    __table__   = 'hasil_analisa' 
    __guarded__ = ['id']
    __dates__   = ['deleted_at']