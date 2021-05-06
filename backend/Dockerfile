FROM python:3.7.10-stretch

WORKDIR /app

ADD . /app

RUN pip install -r requirements.txt

RUN export FLASK_APP=run.py

ENTRYPOINT ["python"]

CMD ["run.py"]
# CMD ["export" "FLASK_APP=run.py"]

# CMD ["python3" "run.py"]

# CMD ["uwsgi", "production.ini"]