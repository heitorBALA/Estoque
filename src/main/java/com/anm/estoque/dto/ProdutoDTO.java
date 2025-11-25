package com.anm.estoque.dto;

import java.math.BigDecimal;

public record ProdutoDTO(
    Long id,
    String nome,
    BigDecimal preco,
    String modelo,
    String descricao
) {}
