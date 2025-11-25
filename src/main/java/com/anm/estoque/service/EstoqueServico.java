package com.anm.estoque.service;

import com.anm.estoque.model.ProdutoModelo;
import com.anm.estoque.model.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EstoqueServico {

    private final ProdutoRepository produtoRepository;

    public Iterable<ProdutoModelo> listar() {
        return produtoRepository.findAll();
    }

    public Optional<ProdutoModelo> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }
    
    public ProdutoModelo cadastrarAlterar(ProdutoModelo produto) {
        return produtoRepository.save(produto);
    }
    
    public void remover(Long id) {
        produtoRepository.deleteById(id);
    }
}
