package com.example.api.models;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "PRODUCTO")
public class Producto implements Serializable{

	
	private static final long serialVersionUID = -8051859869844125844L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_producto")
    private Long idProducto;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "precio_unitario")
    private BigDecimal precioUnitario;

    @Column(name = "stock")
    private Integer stock;
    

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "id_categoria", referencedColumnName = "id_categoria")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Categoria categoria;
    
    
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Imagen> imagenes;

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProveedorProducto> proveedorProductos;
    
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comentario> comentarios;
    
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleVenta> detallesventas;
    
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetallesDeOrdenDeVenta> detallesOrdenVentas;
    
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleDeOrdenDeCompra> detalleDeOrdenDeCompra;
    
	public Producto() {
		
	}



	public Long getIdProducto() {
		return idProducto;
	}



	public void setIdProducto(Long idProducto) {
		this.idProducto = idProducto;
	}



	public String getNombre() {
		return nombre;
	}



	public void setNombre(String nombre) {
		this.nombre = nombre;
	}



	public String getDescripcion() {
		return descripcion;
	}



	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}



	public BigDecimal getPrecioUnitario() {
		return precioUnitario;
	}



	public void setPrecioUnitario(BigDecimal precio_unitario) {
		this.precioUnitario = precio_unitario;
	}



	public Integer getStock() {
		return stock;
	}



	public void setStock(Integer stock) {
		this.stock = stock;
	}



	public Categoria getCategoria() {
		return categoria;
	}



	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

    
}