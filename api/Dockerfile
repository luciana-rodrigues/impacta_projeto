FROM python:3.9
WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . /app/
EXPOSE 80
CMD ["uvicorn", "app.main:app", "--host","0.0.0.0", "--port", "80", "--reload"]