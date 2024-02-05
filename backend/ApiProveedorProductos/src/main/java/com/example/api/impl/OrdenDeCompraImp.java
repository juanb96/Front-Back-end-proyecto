package com.example.api.impl;

import java.util.List;

import com.example.api.models.OrdenDeCompra;

public interface OrdenDeCompraImp {

	public OrdenDeCompra crearOrdenDeCompra(OrdenDeCompra ordenDeCompra);
	public OrdenDeCompra editarOrdenDeCompra(OrdenDeCompra ordenDeCompra);
	public String eliminarOrdenDeCompra(long idOrdenDeCompra);
	public OrdenDeCompra traerOrdenDeCompra(OrdenDeCompra ordenDeCompra);
	public List<OrdenDeCompra>listarOrdenDeCompras();
}
