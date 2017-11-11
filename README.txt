
Install ReactJS

On the terminal: npm install -g create-react-app

Follow the steps on the terminal to start the servers:

Back-end server
	1. cd nodelogin
	2. npm install
	3. npm start

Front-end server
	1. cd reactlogin
	2. npm install
	3. npm start

start Zookeeper

bin\windows\zookeeper-server-start.bat config\zookeeper.properties

start kafka
bin\windows\kafka-server-start.bat config\server.properties

create topics
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic list_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic signup_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic upload_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic share_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic star_topic