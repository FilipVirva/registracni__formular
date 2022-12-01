from flask import Flask, render_template, request
import csv

app = Flask(__name__, static_url_path='/static', static_folder='static', template_folder='templates')
ucastnici = []

@app.route('/', methods = ['GET', 'POST'])
def index():

    temp = []

    with open("soubor.csv", "r") as file:
        r = csv.reader(file, delimiter=',')
        for user in r:
            temp.append(user)

    return render_template('index.html', ucastnici=temp), 200
@app.route('/registrace', methods=["GET","POST"])
def registrace_form():
    return render_template('registrace.html'), 200
@app.route('/api/register/<name>/<kamos>/<plavec>', methods = ['GET', 'POST'])

def registrace(name,kamos,plavec):
    error = validation(name,kamos,plavec)
    return error

def validation(nick,kamarad,je_plavec):
    if je_plavec == "1":
        ucastnici.append([nick, kamarad])

        with open("soubor.csv", "a",newline="", encoding="UTF-8") as file:
            writer = csv.writer(file)
            writer.writerows(ucastnici)
        
        ucastnici.clear()
        return "Úspěšně přidáno"
    else:
        return "Omlouváme se, ale z bezpečnostních důvodů je kurz pouze pro plavce", 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
