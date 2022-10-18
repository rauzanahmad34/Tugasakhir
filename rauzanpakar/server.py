from flask import Flask, render_template, request
from app.config.middleware import checkLogin
from app.controllers import admin, misc, penyakit, algoritma, gejala, rules, api, berita
import os

app = Flask(__name__)

# # API
# ** Auth & Profile
@app.route('/api/register', methods=['POST'])
def f_register():
    return api.register(request)

@app.route('/api/login', methods=['POST'])
def f_login():
    return api.login(request)

# ** Gejala
@app.route('/api/get-list-gejala')
def f_listgejala():
    return api.ListGejala()

# ** Analisa
@app.route("/api/add-analisa", methods=['POST'])
def addAnalisa():
    return api.addAnalisa(request)

@app.route('/api/get-list-hasil')
def f_listOrder():
    return api.ListOreder(request)
# ** Berita
@app.route('/api/get-list-berita')
def f_listBerita():
    return api.ListBerita(request)
# # end============================================================================

# dashboard
@app.route("/")
@checkLogin
def index():
    return misc.index()

# users
@app.route("/users")
@checkLogin
def user_index():
    return admin.index() 

@app.route("/users/create")
@checkLogin
def user_create():
    return admin.create() 

@app.route("/users/<int:id>/edit")
@checkLogin
def user_edit(id):
    return admin.edit(id)

@app.route("/users/store", methods=['POST'])
@checkLogin
def user_store():
    return admin.store(request.form)

@app.route("/users/<int:id>/update", methods=['POST'])
@checkLogin
def users_update(id):
    return admin.update(request, id)

@app.route("/users/<int:id>/delete")
@checkLogin
def user_delete(id):
    return admin.delete(id)
# # end============================================================================

# # penyakit
@app.route('/penyakit')
@checkLogin
def penyakit_index():
    return penyakit.index()
@app.route("/penyakit/create")
@checkLogin
def penyakit_create():
    return penyakit.create()
@app.route("/penyakit/store", methods=['POST'])
@checkLogin
def penyakit_store():
    return penyakit.store(request)
@app.route("/penyakit/<int:id>/update", methods=['POST'])
@checkLogin
def penyakit_update(id):
    return penyakit.update(request, id)
@app.route("/penyakit/<int:id>/edit")
@checkLogin
def penyakit_edit(id):
    return penyakit.edit(id)

@app.route("/penyakit/<int:id>/delete")
@checkLogin
def penyakit_delete(id):
    return penyakit.delete(id)
# # end==============================================================================

# # gejala
@app.route('/gejala')
@checkLogin
def gejala_index():
    return gejala.index()
@app.route("/gejala/create")
@checkLogin
def gejala_create():
    return gejala.create()
@app.route("/gejala/store", methods=['POST'])
@checkLogin
def gejala_store():
    return gejala.store(request)
@app.route("/gejala/<int:id>/update", methods=['POST'])
@checkLogin
def gejala_update(id):
    return gejala.update(request, id)
@app.route("/gejala/<int:id>/edit")
@checkLogin
def gejala_edit(id):
    return gejala.edit(id)

@app.route("/gejala/<int:id>/delete")
@checkLogin
def gejala_delete(id):
    return gejala.delete(id)
# # end==============================================================================

# # rules
@app.route('/rules')
@checkLogin
def rules_index():
    return rules.index()
@app.route("/rules/create")
@checkLogin
def rules_create():
    return rules.create()
@app.route("/rules/store", methods=['POST'])
@checkLogin
def rules_store():
    return rules.store(request)
@app.route("/rules/<int:id>/update", methods=['POST'])
@checkLogin
def rules_update(id):
    return rules.update(request, id)
@app.route("/rules/<int:id>/edit")
@checkLogin
def rules_edit(id):
    return rules.edit(id)

@app.route("/rules/<int:id>/delete")
@checkLogin
def rules_delete(id):
    return rules.delete(id)
# # end==============================================================================

# # algoritma
@app.route('/algoritma')
@checkLogin
def algoritma_index():
    return algoritma.index()

@app.route("/algoritma/create")
@checkLogin
def algoritma_create():
    return algoritma.create()

@app.route("/algoritma/analisa", methods=['POST'])
@checkLogin
def algoritma_store():
    return algoritma.analisa()

@app.route("/algoritma/result/<int:id>")
@checkLogin
def result_algo(id):
    return algoritma.result_algo(id)
# # end==============================================================================


# # berita
@app.route('/berita')
@checkLogin
def berita_index():
    return berita.index()
@app.route("/berita/create")
@checkLogin
def berita_create():
    return berita.create()
@app.route("/berita/store", methods=['POST'])
@checkLogin
def berita_store():
    return berita.store(request)
@app.route("/berita/<int:id>/update", methods=['POST'])
@checkLogin
def berita_update(id):
    return berita.update(request, id)
@app.route("/berita/<int:id>/edit")
@checkLogin
def berita_edit(id):
    return berita.edit(id)

@app.route("/berita/<int:id>/delete")
@checkLogin
def berita_delete(id):
    return berita.delete(id)
# # end==============================================================================

# login misc
@app.route("/login")
def login():
    return misc.login()

@app.route("/doLogin", methods=['POST'])
def doLogin():
    return misc.doLogin(request.form)

@app.route("/logout")
def logout():
    return misc.logout()

app.secret_key = '3RDLwwtFttGSxkaDHyFTmvGytBJ2MxWT8ynWm2y79G8jm9ugYxFFDPdHcBBnHp6E'
app.config['SESSION_TYPE'] = 'filesystem'

@app.context_processor
def inject_stage_and_region():
    return dict(APP_NAME=os.environ.get("APP_NAME"),
        APP_AUTHOR=os.environ.get("APP_AUTHOR"),
        APP_TITLE=os.environ.get("APP_TITLE"),
        APP_LOGO=os.environ.get("APP_LOGO"))

if __name__ == "__main__":
    # app.run()
    app.run(host='0.0.0.0', port=5599)