package org.enspy.snappy.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/tests")
public class TestController {


    @PostMapping
    public void postTest(){

    }
}
