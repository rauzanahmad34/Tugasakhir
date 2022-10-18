from app.config.db import db
from orator import Model, SoftDeletes


Model.set_connection_resolver(db)

class Admin(SoftDeletes,Model):
    __table__   = 'admin' 
    __guarded__ = ['id']
    __dates__ = ['deleted_at']

    def allData():
        users = Admin.get().all().serialize();
        return users

    def store(request):
        data = Admin()
        data.username = request['username']
        data.name     = request['name']
        data.password = request['password']
        data.save()
        return True

    def get_by_username(username):
        data = Admin.where('username', username).first()
        if data is not None:
            data = data.serialize()
        return data