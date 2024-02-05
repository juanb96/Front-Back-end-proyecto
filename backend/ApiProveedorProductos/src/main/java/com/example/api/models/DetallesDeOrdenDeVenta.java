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
@Table(name = "DETALLES_DE_ORDEN_DE_VENTA")
public class DetallesDeOrdenDeVenta implements Serializable{

	private static final long serialVersionUID = -116981913247470251L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_orden_venta")
    private Long idDetalleOrdenVenta;

	@ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "id_orden_venta", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private OrdenesDeVenta ordenVenta;

	@ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "id_producto", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Producto producto;

    @Column(name = "cantidad")
    private Integer cantidad;

    @Column(name = "precio_unitario", precision = 10, scale = 2)
    private BigDecimal precioUnitario;

	public DetallesDeOrdenDeVenta() {
	
	}

	public Long getIdDetalleOrdenVenta() {
		return idDetalleOrdenVenta;
	}

	public void setIdDetalleOrdenVenta(Long idDetalleOrdenVenta) {
		this.idDetalleOrdenVenta = idDetalleOrdenVenta;
	}

	public OrdenesDeVenta getOrdenVenta() {
		return ordenVenta;
	}

	public void setOrdenVenta(OrdenesDeVenta ordenVenta) {
		this.ordenVenta = ordenVenta;
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