1. backend `pom.xml`

The plugin will move files from `np-app` to `static` folder of spring executable jar
```xml
<plugin>
    <artifactId>maven-resources-plugin</artifactId>
    <executions>
        <execution>
            <id>copy-resources</id>
            <phase>validate</phase>
            <goals><goal>copy-resources</goal></goals>
            <configuration>
                <outputDirectory>${project.build.directory}/classes/static/</outputDirectory >
                <resources>
                    <resource>
                        <directory>${project.basedir}/tutorial-web/src/main/web/dist/np-app/</directory >
                    </resource>
                </resources>
            </configuration>
        </execution>
    </executions>
</plugin>
```

mvn spring-boot:run

---
# # Run as Jar

1. (optional) build `tutorial-web`
2. `mvn clean package`
3. `cd target` and `java -jar <*.jar>`

# # Run Dev

Run backend:
`mvn spring-boot:run` or run App.class

Run frontend:
**use proxy to backend port**
1. `npm run build` or `ng build --prod --build-optimizer=false`
2. `npm start` or `ng serve --proxy-config proxy.conf.json`

---
# # Spring Boot with WebSockets

[View tutorial on Medium](https://medium.com/oril/spring-boot-websockets-angular-5-f2f4b1c14cee)

---
# # Angular

0. npm install -g @angular/cli

1. Cannot find module '@angular-devkit/core'
solve [link](https://stackoverflow.com/questions/48394003/cannot-find-module-angular-devkit-core/48394014#48394014)

2. sockjs_client_1.default is not a constructor
solve [link](https://github.com/angular/angular-cli/issues/9243)

3. `ng build` failure
```shell
ERROR in ./node_modules/stompjs/lib/stomp-node.js
Module not found: Error: Can't resolve 'net' in 'D:\MyPrograms\Java\_spring\angular-spring-websocket\tutorial-web\src\main\web\node_modules\stompjs\lib'
``` 
Solution: `npm i net -S`
