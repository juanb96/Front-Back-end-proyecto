package com.example.api.impl;

import java.util.List;

import com.example.api.models.DetalleDeOrdenDeCompra;

public interface DetalleDeOrdenDeCompraImp {
	
	public DetalleDeOrdenDeCompra crearDetalleDeOrdenDeCompra(DetalleDeOrdenDeCompra detalleDeOrdenDeCompra);
	public DetalleDeOrdenDeCompra editarDetalleDeOrdenDeCompra(DetalleDeOrdenDeCompra detalleDeOrdenDeCompra);
	public String eliminarDetalleDeOrdenDeCompra(long idDetalleDeOrdenDeCompra);
	public DetalleDeOrdenDeCompra traerDetalleDeOrdenDeCompra(DetalleDeOrdenDeCompra detalleDeOrdenDeCompra);
	public List<DetalleDeOrdenDeCompra>listarDetalleDeOrdenDeCompras();

}
