#use the official Ngix image
FROM nginx:alpine

#set the working directory to /app
#copy PWA files to the Ngix web directory
COPY . /usr/share/nginx/html

#expose port 80
EXPOSE 80   
#docker build -t my-pwa .
#docker run -it --rm -p 8080:80 my-pwa
