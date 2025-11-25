package com.anm.estoque.controller;

import com.anm.estoque.dto.ProdutoDTO;
import com.anm.estoque.model.ProdutoModelo;
import com.anm.estoque.service.EstoqueServico;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
@RequiredArgsConstructor
public class EstoqueController {

    private final EstoqueServico estoqueServico;

    @GetMapping("/")
    public ResponseEntity<String> testeApi() {
        return ResponseEntity.ok("A API está funcionando!");
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ProdutoDTO>> listar() {
        List<ProdutoDTO> produtos = StreamSupport.stream(estoqueServico.listar().spliterator(), false)
                .map(this::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<ProdutoDTO> buscarPorId(@PathVariable Long id) {
        return estoqueServico.buscarPorId(id)
                .map(this::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ProdutoDTO> cadastrar(@RequestBody @Valid ProdutoDTO dto) {
        ProdutoModelo modelo = toModel(dto);
        ProdutoModelo salvo = estoqueServico.cadastrarAlterar(modelo);
        return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(salvo));
    }

    @PutMapping("/alterar")
    public ResponseEntity<ProdutoDTO> alterar(@RequestBody @Valid ProdutoDTO dto) {
        ProdutoModelo modelo = toModel(dto);
        ProdutoModelo salvo = estoqueServico.cadastrarAlterar(modelo);
        return ResponseEntity.ok(toDTO(salvo));
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        estoqueServico.remover(id);
        return ResponseEntity.noContent().build();
    }

    private ProdutoDTO toDTO(ProdutoModelo modelo) {
        return new ProdutoDTO(
                modelo.getId(),
                modelo.getNome(),
                modelo.getPreco(),
                modelo.getModelo(),
                modelo.getDescricao()
        );
    }

    private ProdutoModelo toModel(ProdutoDTO dto) {
        ProdutoModelo modelo = new ProdutoModelo();
        modelo.setId(dto.id());
        modelo.setNome(dto.nome());
        modelo.setPreco(dto.preco());
        modelo.setModelo(dto.modelo());
        modelo.setDescricao(dto.descricao());
        return modelo;
    }
}
