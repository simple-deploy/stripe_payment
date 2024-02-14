# Build an image from Dockerfile

build:
	docker build -t client . 

start:
	docker run --name CLIENT1_CONTAINERs -p 0.0.0.0:5000:3000 client

setup-db:
	docker pull tomsik68/xampp && docker run --name Xampp -p 41061:22 -p 41062:80 -d -v ~/my_web_pages:/www tomsik68/xampp
