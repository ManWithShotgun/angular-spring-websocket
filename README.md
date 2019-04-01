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