from orator import DatabaseManager

# ---------- Local Connection
# config = {
#     'mysql': {
#         'driver'    : 'mysql',
#         'host'      : 'localhost',
#         'database'  : 'aplikasi_rauzan_pakar',
#         'user'      : 'root',
#         'password'  : '123123123',
#         'prefix'    : '',
#         'charset'   : 'utf8mb4'
#     }
# }

# ---------- Server Connection
config = {
    'mysql': {
        'driver'    : 'mysql',
        'host'      : 'newdemo.aplikasiskripsi.com',
        'database'  : 'aplikasi_rauzan_pakar',
        'user'      : 'aplikasi_rauzan_pakar',
        'password'  : 'aplikasi_rauzan_pakar',
        'prefix'    : '',
        'charset'   : 'utf8mb4'
    }
}

db = DatabaseManager(config)