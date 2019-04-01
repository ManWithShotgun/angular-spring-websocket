package ru.ilia.app.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class HomeController {

    @RequestMapping("home")
    public String home() {
//        return "forward:/index.html";
        return "{\n" +
                "  \"qwe\": \"qqq\"\n" +
                "}";

    }

    @PostMapping("create")
    public String create(String s) {
        System.out.println("Post request " + s);
        return "{\n" +
                "  \"qwe\": \"" + s + "\"\n" +
                "}";
    }
}
