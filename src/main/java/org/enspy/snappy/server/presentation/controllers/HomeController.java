package org.enspy.snappy.server.presentation.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/")
public class HomeController {

    @GetMapping
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Hello World");
    }

    @PostMapping()
    public ResponseEntity<?> test(@RequestBody Object body, @RequestParam(required = true) int mode) {
        log.warn(body);
        log.warn(mode);
        log.warn("Hello World");
        return ResponseEntity.ok(body);
    }
}
