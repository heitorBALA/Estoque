package com.anm.estoque.model.repository;

import com.anm.estoque.model.ProdutoModelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<ProdutoModelo, Long> {
    // A interface JpaRepository já fornece métodos como findAll()
}
