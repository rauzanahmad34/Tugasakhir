from app.config.db import db
from orator import Model, SoftDeletes


Model.set_connection_resolver(db)

class User(SoftDeletes,Model):
    __table__   = 'users' 
    __guarded__ = ['id']
    __dates__ = ['deleted_at']

    def store(req):
        data = User()
        data.name        = req['name']
        data.phone       = req['phone']
        data.email       = req['email']
        data.password    = req['password']
        data.save()
        return True