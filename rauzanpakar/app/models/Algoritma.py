from app.config.db import db
from orator import Model, SoftDeletes

Model.set_connection_resolver(db)

class Algoritma(SoftDeletes,Model):
    __table__   = 'algoritma' 
    __guarded__ = ['id']
    __dates__ = ['deleted_at']