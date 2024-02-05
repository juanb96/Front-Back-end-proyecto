package com.example.api.models;

import java.io.Serializable;
import java.math.BigDecimal;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "detalle_de_orden_de_compra")
public class DetalleDeOrdenDeCompra implements Serializable {
	
	
	private static final long serialVersionUID = 2154130945109759136L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_orden_compra")
    private Long idDetalleOrdenCompra;

	@ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "id_orden_compra", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
    private OrdenDeCompra ordenDeCompra;

	@ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "id_producto", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
    private Producto producto;

    @Column(name = "cantidad")
    private Integer cantidad;

    @Column(name = "precio_unitario")
    private BigDecimal precioUnitario;

	public DetalleDeOrdenDeCompra() {

	}

	public Long getIdDetalleOrdenCompra() {
		return idDetalleOrdenCompra;
	}

	public void setIdDetalleOrdenCompra(Long idDetalleOrdenCompra) {
		this.idDetalleOrdenCompra = idDetalleOrdenCompra;
	}

	public OrdenDeCompra getOrdenDeCompra() {
		return ordenDeCompra;
	}

	public void setOrdenDeCompra(OrdenDeCompra ordenDeCompra) {
		this.ordenDeCompra = ordenDeCompra;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

	public BigDecimal getPrecioUnitario() {
		return precioUnitario;
	}

	public void setPrecioUnitario(BigDecimal precioUnitario) {
		this.precioUnitario = precioUnitario;
	}

   
    
    
}