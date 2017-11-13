Dropboc lab# 2

Kafka:
Open CMD and navigate to the kafka folder and execute the following commands:

1. Start Zookeeper :
bin\windows\zookeeper-server-start.bat config/zookeeper.properties

2. Start Kafka :
bin\windows\kafka-server-start.bat config/server.properties

3. Create topics in cmd:
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic list_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic signup_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic upload_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic share_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic star_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic getstar_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic delstar_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic profile_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic folder_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic group_topic

4. Start MongoDB server :
mongod

Navigate to the project folder:
5. Back-end server:
	
1. cd nodelogin
2. npm install
3. npm start

6. Kafka Back-end server:
	
1. cd kafka-back-end
2. npm install
3. npm start

7. Front-end server:
	
1. cd reactlogin
2. npm install
3. npm start

Mocha tests:
8. Back-end tests:
1. cd nodelogin
2. npm test

9. Front-end tests:
1. cd reactlogin
2. npm test