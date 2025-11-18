package com.anm.service;

import com.anm.estoque.model.ProdutoModelo;
import com.anm.estoque.model.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstoqueServico {

    @Autowired
    private ProdutoRepository pr;

    public Iterable<ProdutoModelo> listar(){
        return pr.findAll();
    }

}