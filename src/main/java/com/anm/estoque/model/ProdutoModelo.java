package com.anm.estoque.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="tb_produtos")
@Setter
@Getter
public class ProdutoModelo {
    @Id
    private Long id;
    
    private String nome;
    private Double preco;
    private String modelo;
    private String descricao;
    public void setQuantidade(int i) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setQuantidade'");
    }
    
}