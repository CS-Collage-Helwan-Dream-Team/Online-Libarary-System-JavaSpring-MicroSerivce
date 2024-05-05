server:
port: 8080
spring:
datasource:
url: jdbc:mysql://localhost:3306/subscription
username: root
password:
driver-class-name: com.mysql.cj.jdbc.Driver
jpa:
hibernate:
ddl-auto: update
show-sql: true
properties:
hibernate:
dialect: org.hibernate.dialect.MySQL8Dialect
format_sql: true
