package org.enspy.snappy.server.presentation.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Log4j2
@RestController
@RequestMapping("/")
public class HomeController {

    @GetMapping
    public Mono<ResponseEntity<String>> home() {
        return Mono.just(ResponseEntity.ok("Hello World"));
    }

    @PostMapping()
    public Mono<ResponseEntity<?>> test(@RequestBody Object body, @RequestParam(required = true) int mode) {
        return Mono.just(ResponseEntity.ok(body));
    }
}