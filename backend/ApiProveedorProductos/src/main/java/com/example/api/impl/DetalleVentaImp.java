package com.example.api.impl;

import java.util.List;

import com.example.api.models.DetalleVenta;

public interface DetalleVentaImp {

	public DetalleVenta crearDetalleVenta(DetalleVenta detalleVenta);
	public DetalleVenta editarDetalleVenta(DetalleVenta detalleVenta);
	public String eliminarDetalleVenta(long idDetalleVenta);
	public DetalleVenta traerDetalleVenta(DetalleVenta detalleVenta);
	public List<DetalleVenta>listarDetalleVenta();
}
