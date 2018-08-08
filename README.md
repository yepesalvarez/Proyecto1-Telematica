# Proyecto1-Telematica
Proyecto académico de la universidad EAFIT. Asignatura Tópicos Especiales en Telemática. Sistema de registro de rutas GPS

# Ver Proyecto en DCA Eafit
basta con ingresar a 
``` https://lyepesa.dis.eafit.edu.co/ ```

# Montar proyecto en servidor Centos
Instalar Docker y docker compose
```
source: https://docs.docker.com/install/linux/docker-ce/centos/

$ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
$ sudo yum install docker-ce
$ sudo systemctl start docker
$ sudo systemctl enable docker

instalar docker-compose: https://docs.docker.com/compose/install/

$ sudo curl -L https://github.com/docker/compose/releases/download/1.20.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

$ sudo chmod +x /usr/local/bin/docker-compose
```
Instalar Git 
```
$ sudo yum install git
```
Clonar el repositorio en una carpeta del sistema
```
git clone https://github.com/yepesalvarez/Proyecto1-Telematica.git
```
Dentro de la carpeta elegida situarse en la carpeta del proyecto en
```
Proyecto1-Telematica/Gps-Api/
```
Realizar el montaje de la imagen de docker que contiene las dependencia a los programas necesarios mediante docker compose
```
 $ /usr/local/bin/docker-compose build
 ```
 Subir el proyecto con docker compose
 ```
 $ /usr/local/bin/docker-compose build up
 ```
