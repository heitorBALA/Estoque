package com.anm.estoque.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EstoqueController {

    @GetMapping("/")
    public String testeApi() {
        return "A API está funcionando!";
    }
}